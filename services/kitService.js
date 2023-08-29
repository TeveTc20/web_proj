const kit = require('../models/kitModel');

const createkit = async (league,team_name,type,price,description,image) => {

  if(await getKitByDescription(description))
    return false
  const kits = new kit(
          {
         league:league,
         team_name:team_name,
         type:type,
         price:price+"$",
         description:description,
         image:image
          });
    return await kits.save()

};
const getKits = async () => {
  return await kit.find();
};
const getKitById = async (kit_id) => {
  return await kit.findById(kit_id);
};
const getKitByTeam = async (team_name) => {
    return await kit.find({ team_name: team_name });
};
const getKitByLeague = async (league) => {
  return await kit.find({ league: league });
};
const updateKit = async (existingName,newName,price,image) => {
  const product = await getKitByDescription(existingName);
    
  if (!product) {
    return null;
  }
    product.description = newName  
    product.price = price
    product.image = image
    await product.save();
    return product;
}
const deleteKit = async (description) => {
  const product = await getKitByDescription(description);
  if (!product)
      return null;
  await product.deleteOne();
  return product;
}
const search = async (query) => {
    try {
      
      const kits = await kit.find({ description: { $regex: query, $options: 'i' } }).exec();
      return kits;
    } catch (err) {
      return -1;
    }
};
const filter=async(league,team_name,type)=>{

    
    const query = {};
  
    if (league) {
      query.league = { $in: league };
    }
  
    if (team_name) {
      query.team_name = { $in: team_name };
    }
  
    if (type) {
      query.type = { $in: type };
    }
  
    return kit.find(query);
}
const getKitByDescription = async (description) => {
  return await kit.findOne({ description: description });
};
const getTopSellingKits = async () => {
  
  return await kit.find().sort({ salesCount: -1 }).limit(5);
};
const getSalesCountByLeague = async () => {
  return await kit.aggregate([
    {
      $group: {
        _id: "$league",  
        totalSales: { $sum: "$salesCount" }  
      }
    }
  ]);
}
const updateSalesCount = async(Id,salesCount)=>{
  const kit = await getKitById(Id);
  if (!kit) {
    return null;
  }
  kit.salesCount=kit.salesCount+salesCount
  await kit.save();
}

module.exports = {
  createkit,
  getKitById,
  getKitByTeam,
  getKitByLeague,
  getKits,
  updateKit,
  deleteKit,
  updateSalesCount,
  search,
  getTopSellingKits,
  filter,
  getKitByDescription,
  getSalesCountByLeague,
};