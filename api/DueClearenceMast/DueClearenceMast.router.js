const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create, update, deleteByID, getData, getDataById } = require('../DueClearenceMast/DueClearenceMast.controller');

router.post("/", checkToken, create);
router.patch("/", checkToken, update);
router.delete("/", checkToken, deleteByID);
router.get("/", checkToken, getData);
router.get("/:id", checkToken, getDataById);

module.exports = router;