const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create, getData, getDataById, update } = require('../HighLevelMaster/HighLevel.controller');

router.post("/add", checkToken, create);
router.get("/list", checkToken, getData)
router.get("/data/:id", checkToken, getDataById)
router.patch("/", checkToken, update)


module.exports = router;