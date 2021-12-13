const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createfine, updatefine, getFineByID, getFineBySlno } = require('../hrm_emp_fine/fine.controller');

router.post("/", checkToken, createfine);
router.patch("/", checkToken, updatefine);
router.get("/:id", checkToken, getFineByID);
router.get("/select/:id", checkToken, getFineBySlno);

module.exports = router;