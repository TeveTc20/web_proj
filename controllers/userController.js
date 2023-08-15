const userService = require('../services/userService');
const userModel = require('../models/userModel')

const path = require('path');

const register = async(req,res)=>{
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    await userModel.insertMany([data])

    res.sendFile(path.join(__dirname, "../views/home/home.html"));
 
}

const login = async(req,res)=>{

    try{
        const check = await userModel.findOne({username: req.body.username})

        if(check.password==req.body.password){
            res.sendFile(path.join(__dirname, "../views/home/home.html"));
        }
        else{
            res.send('Wrong password')
        }
    }
    catch{
        res.send('Wrong details')
    }
}

const getUserByUserName = async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
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
  register,
  login,
  getUserByUserName,
  getUsers,
  updateUser,
  deleteUserByUserName,
  createAdmin,
};