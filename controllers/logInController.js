const loginService = require('../services/logInService');
const userService = require('../services/userService');

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await loginService.login(username, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  else{
        const x=await userService.getUserByUserName(username);
        req.session.username=username
        req.session.userType=x.userType
       return res.redirect('/')
     }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const registrationSuccessful = await loginService.register(username, email, password);
  
  if (!registrationSuccessful) {
    return res.status(409).json({ message: 'Username or Email already exists' });
  }
 else{
    req.session.username = username;
    return res.redirect('/');
 }
};
function isloggedin(req,res){
  console.log(req.session.username)
  console.log(req.session.userType)
  if(req.session.username)
  res.json({
        isloggedin:true,
        userType:req.session.userType
          })
  else
  res.json({isloggedin:false,
            userType:req.session.userType
          })
}
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}


module.exports = {
  loginUser,
  registerUser,
  isloggedin,
  logout,
};
