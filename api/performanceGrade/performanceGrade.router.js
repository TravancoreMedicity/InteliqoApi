const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const {
    createPerformanceGrade,
    getPerformanceGrade,
    getPerGradeByID,
    updatePerformanceGrade,
} = require('../performanceGrade/performanceGrade.controller');

router.post("/submit", checkToken, createPerformanceGrade)
router.get("/getperformancegrade", checkToken, getPerformanceGrade)
router.get("/dataById/:id", checkToken, getPerGradeByID)
router.patch("/update", checkToken, updatePerformanceGrade)






module.exports = router;