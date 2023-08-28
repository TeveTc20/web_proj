const User = require('../models/userModel');


const createUser = async (username, email, password, userType) => {

  if(await getUserByUserName(username) || await getUserByEmail(email)){
    return null;
  }
  
  const user = new User({
    username,
    email,
    password,
    userType,
  });
  return await user.save();
};
const getUserByUserName = async (username) => {
  return await User.findOne({ username });
};
const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};
const getUsers = async () => {
  return await User.find();
};
const updateUser = async (current_username, username, email, password, userType) => {

  const currentUser = await getUserByUserName(current_username);
  if (!currentUser) return null;

  // Check if the username is being changed and if the new username already exists.
  if (current_username !== username) {
      const existingUsername = await getUserByUserName(username);
      if (existingUsername) {
         return null;
      }
  }

  // Check if the email already exists.
  const existingEmailUser = await getUserByEmail(email);
  if (existingEmailUser && existingEmailUser._id !== currentUser._id) {
      return null
    }

currentUser.username=username
currentUser.password=password
currentUser.email=email
currentUser.userType=userType

    await currentUser.save();
    return currentUser;
};
const deleteUserByUserName = async (username) => {
    const user = await getUserByUserName(username);
    if (!user)
        return null;
    await user.deleteOne();
    return user;
};
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
  getUserByEmail,
};
