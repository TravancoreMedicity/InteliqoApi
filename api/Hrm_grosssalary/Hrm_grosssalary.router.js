const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createGrossSalary } = require('../Hrm_grosssalary/Hrm_grosssalary.controller');

router.post("/", checkToken, createGrossSalary);

module.exports = router;