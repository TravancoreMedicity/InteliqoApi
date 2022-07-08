const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createBank, updateBank, deleteBank, getBankData, getBankDataById, getBankMaster } = require('../bankmaster/bank.controller');

router.post("/", checkToken, createBank);
router.patch("/", checkToken, updateBank);
router.delete("/", checkToken, deleteBank);
router.get("/", checkToken, getBankData);
router.get("/:id", checkToken, getBankDataById);
router.get("/getbank/bankmaster", checkToken, getBankMaster);

module.exports = router;