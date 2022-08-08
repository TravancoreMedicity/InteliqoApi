const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create, update, deleteByID, getData, getDataById, getDataByStatus } = require('../KRA/KRA.controller');

router.post("/", checkToken, create);
router.patch("/", checkToken, update);
router.delete("/", checkToken, deleteByID);
router.get("/", checkToken, getData);
router.get("/byStatus", checkToken, getDataByStatus);
router.get("/:id", checkToken, getDataById);

module.exports = router;