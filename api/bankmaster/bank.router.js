const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createBank, updateBank, deleteBank, getBankData, getBankDataById } = require('../bankmaster/bank.controller');

router.post("/", checkToken, createBank);
router.patch("/", checkToken, updateBank);
router.delete("/", checkToken, deleteBank);
router.get("/", checkToken, getBankData);
router.get("/:id", checkToken, getBankDataById);

module.exports = router;