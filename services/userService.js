const User = require('../models/userModel');

// Function to create a new user
const createUser = async (username, email, password, userType) => {
  const user = new User({
    username,
    email,
    password,
    userType,
  });
  return await user.save();
};


// Function to get a user by username
const getUserByUserName = async (username) => {
  return await User.findOne({ username });
};

// Function to get all users
const getUsers = async () => {
  return await User.find();
};


const updateUser = async (current_username, username, email, password, userType) => {
    const user = await getUserByUserName(current_username);
    if (!user)
        return null;
    user.username=username
    user.password=password
    user.email=email
    user.userType=userType

    await user.save();
    return user;
};

// Function to delete a user by ID
const deleteUserByUserName = async (username) => {
    const user = await getUserByUserName(username);
    if (!user)
        return null;
    await user.deleteOne();
    return user;
};

// Function to create an admin user
const createAdmin = async (username, email, password) => {
  // Check if an admin with the same email already exists
  const existingAdmin = await User.findOne({ username, userType: 'admin' });

  if (existingAdmin) {
    return null
  }

  // If no existing admin, create a new admin and save it to the database
  const admin = new User({
    username,
    email,
    password,
    userType: 'admin',
  });

  return await admin.save();
};

module.exports = {
  createUser,
  getUserByUserName,
  getUsers,
  updateUser,
  deleteUserByUserName,
  createAdmin,
};
