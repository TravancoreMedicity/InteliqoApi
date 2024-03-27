const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetDepartmentalTrainingDetails, GetInductionTrainingDetails, GetInductionTrainingEMPDetails, GetDepartmentalTrainingEMPDetails, GetDeptEmp, GetInductEmp, GetAllInductEmpData, GetAllDeptEmpData, GetTrainers, GetInductTrainers, GetTrainerApprvlsData, TrainerVerification, GetTrainerApprvlsInductData, TrainerInductVerification, GetHodDeptApprvlsData, HodDeptVerification, GetHodInductApprvlsData, HODInductVerification, GetDeptTrainers, GetHODdetails, GetInductTrainersDetails, GetAllPdfInductEmpData } = require('./TrainingDetails.controller');

router.post('/getDepartmentalDetails', checkToken, GetDepartmentalTrainingDetails)
router.post('/getInductionDetails', checkToken, GetInductionTrainingDetails)
router.post('/getInductionEMPDetails', checkToken, GetInductionTrainingEMPDetails)
router.post('/getEMPDepartmentalDetails', checkToken, GetDepartmentalTrainingEMPDetails)
router.get('/getDeptEmp/:id', checkToken, GetDeptEmp)
router.get('/getInductEmp/:id', checkToken, GetInductEmp)
//get full Induction data of emp
router.get('/getInduct/:id', checkToken, GetAllInductEmpData)
router.get('/getDepartmental/:id', checkToken, GetAllDeptEmpData)
router.post('/getTrainers', checkToken, GetTrainers)
router.post('/getInductTrainers', checkToken, GetInductTrainers)
//Apprvls

router.get('/TrainerApprvl/:id', checkToken, GetTrainerApprvlsData)
router.patch('/updte_trainer_veriftn', checkToken, TrainerVerification)
router.get('/TrainerApprvlInduct/:id', checkToken, GetTrainerApprvlsInductData)
router.patch('/updte_trainer_Induct_veriftn', checkToken, TrainerInductVerification)
//hod
router.get('/hod_dept_Apprvl/:id', checkToken, GetHodDeptApprvlsData)
router.patch('/updte_hod_dept_veriftn', checkToken, HodDeptVerification)
router.get('/hod_Induct_Apprvl/:id', checkToken, GetHodInductApprvlsData)
router.patch('/updte_hod_Induct_veriftn', checkToken, HODInductVerification)
router.get('/getDepartmentalTrainers/:id', checkToken, GetDeptTrainers)
router.get('/GetHOD/:id', checkToken, GetHODdetails)
router.get('/getInductTrainersdetail/:id', checkToken, GetInductTrainersDetails)
router.get('/getInductiontrainings/:id', checkToken, GetAllPdfInductEmpData)

module.exports = router;
