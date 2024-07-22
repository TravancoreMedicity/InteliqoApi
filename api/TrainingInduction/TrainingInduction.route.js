const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetDatewiseEmps, ScheduleInductionTrainings, InsertInductionEmps, GetTypeWiseTraining, GetIncutCalenderDatas, UpdateTrainers, UpdateDate, GetTraineers, GetInductionCanderDetails, GetIncutCalenderEmpDetails, GetIncutCalenderTrainers, GetInductDeptDatas, GetInductscheduledatas } = require('./TrainingInduction.controller');

router.post('/getEmps', checkToken, GetDatewiseEmps)
router.post('/ScheduleInduction', checkToken, ScheduleInductionTrainings)
router.post('/addInductnEmps', checkToken, InsertInductionEmps)
router.post('/gettrainings/:id', checkToken, GetTypeWiseTraining)
router.patch('/UpdateTrainers', checkToken, UpdateTrainers);
router.patch('/UpdateDate', checkToken, UpdateDate);
router.post('/getTraineers', checkToken, GetTraineers)
router.get('/selectCalenderdetails', checkToken, GetInductionCanderDetails)
router.post('/getcalEmpdetails', checkToken, GetIncutCalenderEmpDetails)
router.post('/getcalTrainers', checkToken, GetIncutCalenderTrainers)
router.post('/getInductionCalenderDatas', checkToken, GetIncutCalenderDatas)
router.post('/getInductDeptData', checkToken, GetInductDeptDatas)
router.get('/Inductscheduledatas', checkToken, GetInductscheduledatas)
module.exports = router;
