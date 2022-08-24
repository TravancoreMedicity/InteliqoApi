const router = require("express").Router();
const { Router } = require("express");
const { checkToken } = require("../../auth/token_validation");
const { createQual, updateQual, getQualification, getQualifByID,
    getQualifBySlno, InsertMessage, DeleteByIdQual, getDataByEmpno } = require('../hrm_emp_qual/qualification.controller');

router.post("/", checkToken, createQual);
router.post("/messageinsert", checkToken, InsertMessage);
router.patch("/", checkToken, updateQual);
router.get("/select/:id", checkToken, getQualifBySlno);
router.get("/:id", checkToken, getQualifByID);
router.get("/", checkToken, getQualification);
router.delete("/:id", checkToken, DeleteByIdQual);

router.get("/qualbyempno/:id", checkToken, getDataByEmpno)

module.exports = router;