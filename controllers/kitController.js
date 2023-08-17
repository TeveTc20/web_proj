const kitService = require('../services/kitService');

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
  const {category,eggSize,traySize}=req.body

  ProductService.filter(category,eggSize,traySize)
    .then(products => {
      res.json({products:products});
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving products' });
    });

}

module.exports = {
  createKit,
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