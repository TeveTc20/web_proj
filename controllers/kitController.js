const kitService = require('../services/kitService');
const kitModel = require('../models/kitModel')

 //Get kit for search bar


 const getKitsSearch = async (req, res) => {
  // Inside your getKitsSearch function
const payload = req.body.payload.trim();
const terms = payload.split(/\s+/).map(term => `(?=.*${term})`).join('|');

const searchTeamName = await kitModel.find({
    league: { $regex: new RegExp(terms, 'i') }
}).limit(10).exec();

const searchDescription = await kitModel.find({
    description: { $regex: new RegExp(terms, 'i') }
}).limit(10).exec();


const uniqueValues = new Set();
const transformedResults = [];

function addToResults(item, field) {
    if (!uniqueValues.has(item[field])) {
        transformedResults.push({
            ...item.toObject(),
            matchedField: field,
            value: item[field],
            id: item.id
        });
        uniqueValues.add(item[field]);
    }
}

searchTeamName.forEach(item => addToResults(item, 'league'));
searchDescription.forEach(item => addToResults(item, 'description'));

res.send({ payload: transformedResults }); // Send the response once here

}

const createKit = async (req, res) => {
  const { team_name, price, description, size, image, isAvailable } = req.body;
  const newkit = await kitService.createProduct(team_name, price, description, size, image, isAvailable);
  res.json(newkit);
};

const getKitById = async (req, res) => {
  const { id } = req.params;
  const kit = await kitService.getKitById(id)
  if (!kit) {
    return res.status(404).json({ errors: ['kit was not found'] });
  }
  res.json(kit);
};

const getKitsByTeam = async (req, res) => {
  const { team_name } = req.params;
  const kits = await kitService.getKitByTeam(team_name);
  res.json(kits);
};

const getKitsByLeague = async (req, res) => {
  const { league } = req.params;
  const kits = await kitService.getKitByLeague(league)
  res.json(kits);
};

const getKits = async (req, res) => {
  const kits = await kitService.getKits();
  res.json(kits);
};

const updateKit = async (req, res) => {
  const { id } = req.params;
  const { league,team_name,type, description,price, image, isAvailable } = req.body;
  const kit = await kitService.updatekit(id,league, team_name, type, description, price, image, isAvailable);
  if (!kit) {
    return res.status(404).json({ errors: ['kit was not found'] });
  }
  res.json(kit);
};

const deleteKit = async (req, res) => {
  const { id } = req.params;
  const kit = await kitService.deletekit(id);
  if (!kit) {
    return res.status(404).json({ errors: ['kit was not found'] });
  }
  res.send();
};

const updateSalesCount = async (req, res) => {
  const { id } = req.params;
  const { salesCount } = req.body;
  await kitService.updateSalesCount(id, salesCount);
  res.send();
};

const searchKits = async (req, res) => {
  const { query } = req.params;
  const kits = await kitService.search(query);
  if (kits === -1) {
    return res.status(500).json({ message: 'Error occurred during kit search' });
  }
  res.json(kits);
};

const getTopSellingKits = async (req, res) => {
  const { limit } = req.params;
  const topSellingkits = await kitService.getTopSellingkits(parseInt(limit));
  res.json(topSellingkits);
};
const filter=async(req,res)=>{
  const {league,team_name,type}=req.body

  kitService.filter(league,team_name,type)
    .then(kits => {
      res.json({kits:kits});
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving products' });
    });

}

module.exports = {
  createKit,
  getKitsSearch,
  getKitById,
  getKitsByTeam,
  getKitsByLeague,
  getKits,
  updateKit,
  deleteKit,
  updateSalesCount,
  searchKits,
  getTopSellingKits,
  filter,
};