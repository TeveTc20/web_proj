const BranchService = require('../services/branchService')

const createBranch = async (req,res) => {
  const newBranch = await BranchService.createBranch(req.body.name,req.body.address);
  if(newBranch)
  return res.redirect('/admin')
  else return  res.redirect('/admin/createBranch?error=1')
}



const getBranches = async (req,res) => {
  const branch = await BranchService.getBranches();
  
  if(!branch){
    return res.status(404).json({errors:['Branch not found']});
  }

  res.json(branch);
}

const getBranch = async (req,res) => {
  const branch = await BranchService.getBranch(req.body.name);
  if (!branch){
    return res.status(404).json({errors:['Branch not found']});
  }
  res.json(branch);
}

const updateBranch = async (req,res) => {
  const branch = await BranchService.updateBranch(req.body.existingName, req.body.newName ,req.body.address);
  if (!branch)
    return res.redirect('/admin/updateBranch?error=1');
  else return res.redirect('/admin')
    
};

const deleteBranch = async (req,res) => {
  const branch = await BranchService.deleteBranch(req.body.name);
  if(branch)
  return res.redirect('/admin')
  else return res.redirect('/admin/deleteBranch?error=1');
  }

module.exports = {
    createBranch,
    getBranch,
    getBranches,
    updateBranch,
    deleteBranch

}