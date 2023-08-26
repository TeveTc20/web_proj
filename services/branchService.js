const Branch = require('../models/branchModel')

const createBranch = async (name,address) => {
    
    if(await getBranch(name)){
        return null;
    }

    const branch = new Branch(
        {
         name:name,
         address:address,
        });

    return await branch.save()
}
const getBranch = async(existingName) =>{
    return await Branch.findOne({name:existingName})
}
const getBranches = async() =>{
   
    return await Branch.find({})
}
const updateBranch = async (existingName, newName, newAddress) => {
    const branch = await getBranch(existingName);
    
    if (!branch) {
      return null;
    }
    
    branch.name = newName;
    branch.address = newAddress;
    
    await branch.save();
    
    return branch;
};
const deleteBranch = async (name) => {
    const branch = await getBranch(name);
    if (!branch)
        return null;
    await branch.deleteOne();
    return branch;
}

module.exports = {
    createBranch,
    getBranch,
    getBranches,
    updateBranch,
    deleteBranch
}