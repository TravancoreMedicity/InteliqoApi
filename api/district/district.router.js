const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createDistrict, updateDistrict, inacticeDistrict, getDistrictData, getDistrictDataById, getSelectDrop } = require('../district/district.controller');

router.post("/", checkToken, createDistrict);
router.patch("/", checkToken, updateDistrict);
router.delete("/", checkToken, inacticeDistrict);
router.get("/", checkToken, getDistrictData);
router.get("/select", checkToken, getSelectDrop);
router.get("/:id", checkToken, getDistrictDataById);


module.exports = router;