const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createProfTax, updateProfTax, InsertEmpProTax, inactiveProfTax, getempProfTaxData, getempMaster, getProfTaxData, getProfTaxDataByID } = require('../professionaltax/proftax.controller');

router.post("/", checkToken, createProfTax);
router.post("/insert", checkToken, InsertEmpProTax);
router.patch("/", checkToken, updateProfTax);
router.delete("/", checkToken, inactiveProfTax);
router.get("/", checkToken, getProfTaxData);
router.post("/display", checkToken, getempMaster)
router.get("/:id", checkToken, getProfTaxDataByID);
router.get("/protax/list", checkToken, getempProfTaxData);

module.exports = router;