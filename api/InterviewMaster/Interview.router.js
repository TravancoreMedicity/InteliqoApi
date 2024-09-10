const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
const { createInterview, getInterview, updatedInterview } = require('../InterviewMaster/Interview.controller');


router.post("/insert", checkToken, createInterview);
router.get("/get", checkToken, getInterview);
router.post("/update", checkToken, updatedInterview);
module.exports = router;