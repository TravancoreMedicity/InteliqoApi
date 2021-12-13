const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createProfTax, updateProfTax, inactiveProfTax, getProfTaxData, getProfTaxDataByID } = require('../professionaltax/proftax.controller');

router.post("/", checkToken, createProfTax);
router.patch("/", checkToken, updateProfTax);
router.delete("/", checkToken, inactiveProfTax);
router.get("/", checkToken, getProfTaxData);
router.get("/:id", checkToken, getProfTaxDataByID);

module.exports = router;