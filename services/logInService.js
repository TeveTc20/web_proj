const userModel = require("../models/userModel");
const userService=require('./userService')

async function login(username, password) {
    const findUser = await userModel.findOne({ username: username, password });
    return findUser != null;
}
async function register(username,email,password,userType) {

    const existUser= await userService.getUserByUserName(username)
    if(existUser){
        return false;
    }
    await userService.createUser(username,email,password,userType)    
        return true
}


module.exports = { login, register }
