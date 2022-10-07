const express = require('express');
const router = express.Router();


const employee = require("../controller/employeeController")



router.post("/addemployee", employee.addEmployeeController)
router.get("/getemployee", employee.getEmployeeController)
router.post("/updateemployee", employee.updateEmployeeController)
router.delete("/deleteemployee", employee.deleteEmployeeController)
router.post("/changeEmployeePassword", employee.changeEmployeePassword)


module.exports = router;
