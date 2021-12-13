const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createRegion, updateRegion, deleteRegion, getRegionData, getRegionDataById } = require('../region/region.controller');

router.post("/", checkToken, createRegion);
router.patch("/", checkToken, updateRegion);
router.delete("/", checkToken, deleteRegion);
router.get("/", checkToken, getRegionData);
router.get("/:id", checkToken, getRegionDataById);

module.exports = router;