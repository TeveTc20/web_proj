const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { username, email, password, userType } = req.body;
  const newUser = await userService.createUser(username, email, password, userType);
  res.json(newUser);
};

const getUserByUserName = async (req, res) => {
  const username = req.session.username; // Directly get the username from req.session

  const user = await userService.getUserByUserName(username);
  if (!user) {
    return res.status(404).json({ errors: ['User was not found'] });
  }
  res.json(user);
};


const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
};

const updateUser = async (req, res) => {
  const { current_username } = req.params;
  const { username, email, password, userType } = req.body;
  if (!current_username || !username || !email || !password || !userType) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await userService.updateUser(current_username, username, email, password, userType);
  if (!user) {
    return res.status(404).json({ errors: ['User was not found'] });
  }
  res.json(user);
};

const deleteUserByUserName = async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  const user = await userService.deleteUserByUserName(username);
  if (!user) {
    return res.status(404).json({ errors: ['User was not found'] });
  }
  res.send();
};

const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  // Check if an admin with the same email already exists
  const existingAdmin = await userService.getUserByUserName(username);
  if (existingAdmin && existingAdmin.userType === 'admin') {
    return res.status(400).json({ message: 'Admin with the same username already exists' });
  }
  // If no existing admin, create a new admin and save it to the database
  const newAdmin = await userService.createAdmin(username, email, password);
  if (!newAdmin) {
    return res.status(500).json({ message: 'Failed to create admin' });
  }
  res.json(newAdmin);
};

module.exports = {
  createUser,
  getUserByUserName,
  getUsers,
  updateUser,
  deleteUserByUserName,
  createAdmin,
};
