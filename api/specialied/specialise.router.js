const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createSpec, updateSpec, deleteSpec, getSpecData, getSpecDataById } = require('../specialied/specialise.controller');

router.post("/", checkToken, createSpec);
router.patch("/", checkToken, updateSpec);
router.delete("/", checkToken, deleteSpec);
router.get("/", checkToken, getSpecData);
router.get("/:id", checkToken, getSpecDataById);

module.exports = router;