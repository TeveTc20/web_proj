const kit = require('../models/kitModel');
// Function to create a new product (kit)
// const createkit = async (league, team_name,type, description,price, image,isAvailable) => {
//   const product = new kit({
//     league,
//     team_name,
//     type,
//     description,
//     price,
//     image,
//     isAvailable,
//   });
//   return await product.save();
// };
const createkit = async (league,team_name,type,price,description,image) => {
  const productExist=await kit.findOne({description:description})
  if(productExist)
  return false
  const kits = new kit(
          {
         league:league,
         team_name:team_name,
         type:type,
         price:price,
         description:description,
         image:image
          });
          return await kits.save()

        }


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
// const updatekit = async (olddescription,description,team_name,type,price, image, isAvailable) => {
//     const kit = await getKitByDescription(olddescription);
//     if (!kit) {
//       return null;
//     }
//     kit.description=description
//     kit.league=league  
//     kit.team_name=team_name
//     kit.type=type
//     kit.price=price
//     kit.image=image
//     kit.isAvailable=isAvailable
//       await kit.save();
//       return kit;
// };
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

// Function to delete a product (kit) by ID
// const deleteKit = async (Id) => {
//   return await kit.findByIdAndDelete(Id);
// };
const deleteKit = async (description) => {
  const product = await getKitByDescription(description);
  if (!product)
      return null;
  await product.deleteOne();
  return product;
}

// const updateSalesCount = async(Id,salesCount)=>{
//     const kit = await getKitById(Id);
//     if (!kit) {
//       return null;
//     }
//     kit.salesCount=salesCount
//}
// const getTopSellingKits = async (limit) => {
//     // Sort kits by salesCount in descending order and limit the result
//     return await kit.find().sort({ salesCount: -1 }).limit(limit);
//   };
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
  // Retrieve the top 5 kits sorted by salesCount in descending order
  return await kit.find().sort({ salesCount: -1 }).limit(5);
};
const getSalesCountByLeague = async () => {
  return await kit.aggregate([
    {
      $group: {
        _id: "$league",  // Group by league
        totalSales: { $sum: "$salesCount" }  // Sum salesCount
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