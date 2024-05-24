const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

const { getData, getempdetails, getbiodetails, getinterviewmark, getPdfformat, GetPersonaldata, GetPersonalexpdata, UpdatePersonaldata, Getcredentialdata,
    InsertPersonaldata, getPdfformatjoin, updatetdata, getVaccination, InsertData, GetPersonaledudata, GetPersonalhighdata, InsertCredentialdata, InsertOrientationdata,
    getapplicationdata, Credentialinsertdata, Getcredentialveridataedu, Getcredentialregistration, GetTrainersData, GetTrainingData, GetcredentialTraining, getHODincharge, Getorientationdata } = require('../PersonalChecklist/personalchecklist.controller');
router.post('/get/all', checkToken, getData);
router.post('/empdetails', checkToken, getempdetails);
router.post('/biodetails', checkToken, getbiodetails);
router.post('/interviewmark', checkToken, getinterviewmark);
router.post('/pdfformat', checkToken, getPdfformat);
router.post('/pdfformatjoin', checkToken, getPdfformatjoin);
router.post('/getAll', checkToken, getVaccination);
router.post('/insertdata', checkToken, InsertData);
router.post('/applicationdata', checkToken, getapplicationdata);
router.post('/updatetdata', checkToken, updatetdata);
router.post('/PersonaldataInsert', checkToken, InsertPersonaldata);
router.post('/personaldata', checkToken, GetPersonaldata);
router.post('/personaldataedu', checkToken, GetPersonaledudata);
router.post('/personaldataexp', checkToken, GetPersonalexpdata);
router.post('/personaldatahigh', checkToken, GetPersonalhighdata);
router.post('/PersonaldataUpdate', checkToken, UpdatePersonaldata);
router.post('/CredentialdataInsert', checkToken, InsertCredentialdata);
router.post('/credentialdata', checkToken, Getcredentialdata);
router.post('/CredentialverificationInsert', checkToken, Credentialinsertdata);
router.post('/credentialveridataedu', checkToken, Getcredentialveridataedu);
router.post('/credentialregistration', checkToken, Getcredentialregistration);
router.post('/credentialTraining', checkToken, GetcredentialTraining);
router.post('/HODincharge', checkToken, getHODincharge);
router.post('/OrientationdataInsert', checkToken, InsertOrientationdata);
router.post('/orientationdata', checkToken, Getorientationdata);
router.post('/TrainingData', checkToken, GetTrainingData);
router.post('/getTrainers', checkToken, GetTrainersData);










module.exports = router;