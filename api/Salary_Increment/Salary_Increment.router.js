const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createIncre, updateIncre, getDataBySlno, getSelectAllExpByID, createSalary,
    createNewArray } = require('../Salary_Increment/Salary_Increment.controller');

router.post("/", checkToken, createIncre);
router.post("/create", checkToken, createSalary);
router.patch("/", checkToken, updateIncre);
router.get("/select/:id", checkToken, getSelectAllExpByID);
router.get("/:id", checkToken, getDataBySlno);

router.post("/insert", checkToken, createNewArray)

module.exports = router;