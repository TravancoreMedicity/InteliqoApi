const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createQual, updateQual, getQualification, getQualifByID,
    getQualifBySlno, InsertMessage, DeleteByIdQual } = require('../hrm_emp_qual/qualification.controller');

router.post("/", checkToken, createQual);
router.post("/messageinsert", checkToken, InsertMessage);
router.patch("/", checkToken, updateQual);
router.get("/select/:id", checkToken, getQualifBySlno);
router.get("/:id", checkToken, getQualifByID);
router.get("/", checkToken, getQualification);
router.delete("/:id", checkToken, DeleteByIdQual);


module.exports = router;