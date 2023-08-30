const kitService = require('../services/kitService');
const kitModel = require('../models/kitModel')
const { postToFacebook } = require('../scripts/facebook');

const createKit = async (req,res) => {
  const newKit = await kitService.createkit(req.body.league,req.body.team_name,req.body.type,req.body.price,req.body.description,req.body.image);
  if(newKit){
    var message='Check out now our new :'+ newKit.description + ' kit!' ;
    await postToFacebook(message)
  return res.redirect('/admin')
  }
  else
   return res.redirect('/createKit?error=1')
}
const getKitsSearch = async (req, res) => {
  const payload = req.body.payload.trim();
  const terms = payload.split(/\s+/).map(term => `(?=.*${term})`).join('|');

  const searchLeagueResults = await kitModel.find({
      league: { $regex: new RegExp(terms, 'i') }
  })

  const searchDescriptionResults = await kitModel.find({
      description: { $regex: new RegExp(terms, 'i') }
  })

  const combinedResults = searchLeagueResults
      .map(item => ({
          ...item.toObject(),
          matchedField: 'combined',
          value: item.league + ' ' + item.description,
          id: item.id
      }))
      .filter((item, index, self) => {
          return index === self.findIndex(t => t.value.toLowerCase() === item.value.toLowerCase());
      });

  const transformedResults = [
      ...searchLeagueResults.map(item => ({
          ...item.toObject(),
          matchedField: 'league',
          value: item.league,
          id: item.id
      })),
      ...searchDescriptionResults.map(item => ({
          ...item.toObject(),
          matchedField: 'description',
          value: item.description,
          id: item.id
      }))
  ];

  const uniqueResults = Array.from(new Set(transformedResults.map(item => item.value.toLowerCase())))
      .map(value => transformedResults.find(item => item.value.toLowerCase() === value));

  res.send({ payload: [...combinedResults, ...uniqueResults] });
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
const getKitByDescription = async (req, res) => {
  const { description } = req.params;
  const kits = await kitService.getKitByDescription(description);
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
  const { existingName, newName,league,team_name,type,price,image} = req.body;

  const product = await kitService.updateKit(existingName, newName,league,team_name,type,price,image);

  if (!product) {
    return res.redirect('/updateKit?error=1');
  }

  return res.redirect('/admin');
};
const deleteKit = async (req,res) => {
  const product = await kitService.deleteKit(req.body.description);
  if(product)
    return res.redirect('/admin')
  else 
    return res.redirect('/deleteKit?error=1');
    
}
const searchKits = async (req, res) => {
  const { query } = req.params;
  const kits = await kitService.search(query);
  if (kits === -1) {
    return res.status(500).json({ message: 'Error occurred during kit search' });
  }
  res.json(kits);
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
const getSalesCountByLeague = async (req, res) => {
  try {
    const salesByLeague = await kitService.getSalesCountByLeague();
    res.json(salesByLeague);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
const getTopSellingKits = async (req, res) => {

  const topSellingkits = await kitService.getTopSellingKits();
  res.json(topSellingkits);
};
const updateSalesCount = async (req, res) => {
  const { id } = req.params;
  const { salesCount } = req.body;
  await kitService.updateSalesCount(id, salesCount);
  res.send();
};

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
  getKitByDescription,
  getSalesCountByLeague,
  updateSalesCount,
  
  
};