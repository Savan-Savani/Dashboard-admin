const express = require('express');
const router = express.Router();

const billing = require('../controller/billController')

router.post("/addbilling", billing.addBillingController)
router.get("/getbilling", billing.getBillingController)
router.post("/deletebilling", billing.deleteBillingController)


module.exports = router;
