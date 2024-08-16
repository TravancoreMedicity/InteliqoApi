const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getJobDescById, createJobDuties, updateDutiesEach, deleteduties, createSkill, getJobSkill, UpdateSkill, deleteSkillduties } = require('../JobAndSkillDesc/JobAndSkill.controller');

router.post("/getJobDesc", checkToken, getJobDescById);
router.post("/InsertJobDesc", checkToken, createJobDuties);
router.patch('/updatedutieseach', checkToken, updateDutiesEach)
router.delete("/deletedata/select/:id", checkToken, deleteduties);


router.post("/InsertSkill", checkToken, createSkill);
router.post("/getSkill", checkToken, getJobSkill);
router.post("/UpdateSkill", checkToken, UpdateSkill);
router.delete("/deleteskilldata/select/:id", checkToken, deleteSkillduties);


module.exports = router;