const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
require('dotenv').config()
const mongoose = require("mongoose")
const cors = require("cors")





const production = require("../controller/productionController")





router.post('/addProduction', production.addProductionController)
router.get('/getProduction', production.getProductionController)
router.post('/deleteProduction', production.deleteProductionController)
router.post('/updateProduction', production.updateProductionController)




module.exports = router;