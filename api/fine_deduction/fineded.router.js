const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createFineDed, getFineDed } = require('../fine_deduction/fineded.controller');

router.post("/", checkToken, createFineDed);
router.get("/", checkToken, getFineDed);

module.exports = router;