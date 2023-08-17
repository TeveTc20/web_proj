const userService = require('../services/logInService');

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await userService.login(username, password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  else{
        req.username=username
       return res.redirect('/')
     }
};

const registerUser = async (req, res) => {
  const { username, email, password, userType } = req.body;
  const registrationSuccessful = await userService.register(username, email, password, userType);
  
  if (!registrationSuccessful) {
    return res.status(409).json({ message: 'Username or Email already exists' });
  }
 else{
    req.session.username = username;
    return res.redirect('/');
 }
};

module.exports = {
  loginUser,
  registerUser,
};
