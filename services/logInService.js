const userModel = require("../models/userModel");
const userService=require('./userService')

async function login(username, password) {
    const findUser = await userModel.findOne({ username: username, password});
    return findUser != null;
}
async function register(username,email,password) {

    const existUser= await userService.getUserByUserName(username)
    if(existUser){
        return false;
    }
    return await userService.createUser(username,email,password)   
}

module.exports = 
{ login,
  register
}
