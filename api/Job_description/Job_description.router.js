const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createJobDesc, updateJobDesc, deleteJobDesc, getJobDesc, getJobDescById, getJobDescBySlno } = require('../Job_description/Job_description.controller');

router.post("/", checkToken, createJobDesc);
router.patch("/", checkToken, updateJobDesc);
router.delete("/", checkToken, deleteJobDesc);
router.get("/", checkToken, getJobDesc);
router.get("/select/:id", checkToken, getJobDescBySlno);
router.post("/jobdesc", checkToken, getJobDescById);

module.exports = router;