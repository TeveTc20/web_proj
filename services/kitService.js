const kit = require('../models/kitModel');
// Function to create a new product (kit)
const createkit = async (league, team_name,type, description,price, image,isAvailable) => {
  const product = new kit({
    league,
    team_name,
    type,
    description,
    price,
    image,
    isAvailable,
  });
  return await product.save();
};

// Function to get all products (kits)
const getKits = async () => {
  return await kit.find();
};

//Function to get a single product (kit) by ID
const getKitById = async (kit_id) => {
  return await kit.findById(kit_id);
};


const getKitByTeam = async (team_name) => {
    return await kit.find({ team_name: team_name });
};
const getKitByLeague = async (league) => {
  return await kit.find({ league: league });
};

// Function to update a product (kit) by ID
const updatekit = async (Id,team_name,type,description,price, image, isAvailable) => {
    const kit = await getKitById(Id);
    if (!kit) {
      return null;
    }
    kit.league=league  
    kit.team_name=team_name
    kit.type=type
    kit.description=description
    kit.price=price
    kit.image=image
    kit.isAvailable=isAvailable
      await kit.save();
      return kit;
};

// Function to delete a product (kit) by ID
const deleteKit = async (Id) => {
  return await kit.findByIdAndDelete(Id);
};

const updateSalesCount = async(Id,salesCount)=>{
    const kit = await getKitById(Id);
    if (!kit) {
      return null;
    }
    kit.salesCount=salesCount
}
const getTopSellingKits = async (limit) => {
    // Sort kits by salesCount in descending order and limit the result
    return await kit.find().sort({ salesCount: -1 }).limit(limit);
  };
// Function to search for products (kits) based on a search term
const search = async (query) => {
    try {
      console.log(query);
      const kits = await kit.find({ description: { $regex: query, $options: 'i' } }).exec();
      return kits;
    } catch (err) {
      return -1;
    }
  };

module.exports = {
  createkit,
  getKitById,
  getKitByTeam,
  getKitByLeague,
  getKits,
  updatekit,
  deleteKit,
  updateSalesCount,
  search,
  getTopSellingKits
};