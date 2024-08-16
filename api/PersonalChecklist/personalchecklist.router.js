const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

const { getData, getempdetails, getbiodetails, getinterviewmark, getPdfformat, GetPersonaldata, GetPersonalexpdata, UpdatePersonaldata, Getcredentialdata,
    InsertPersonaldata, getPdfformatjoin, updatetdata, getVaccination, InsertData, GetPersonaledudata, GetPersonalhighdata, InsertCredentialdata, InsertOrientationdata,
    getapplicationdata, Credentialinsertdata, Getcredentialveridataedu, Getcredentialregistration, GetTrainersData, GetTrainingData, GetcredentialTraining,
    getHODincharge, Getorientationdata, InsertCredentialDoc, GetcredentialdocTraining, GetcredentialdocCertificate, Getcredentialdocdetails, GetcredentialnursingData,
    GetcredentialprivilageData, InsertCredentialNursing, GetcredentialnursingTraining, GetcredentialnursingCertificate, Getcredentialnursingdetails, InsertCredentialPara,
    GetcredentialparaTraining, GetcredentialparaCertificate, Getcredentialparadetails, GetcredentialparaprivilageData, InsertCredentialOther, GetcredentialotherTraining,
    GetcredentialotherCertificate, Getcredentialotherdetails, GetcredentialotherprivilageData, GetHodapprovalData, GetHodapprovalNurseData, GetHodapprovalParaData,
    GetHodapprovalotheraData, GetMSapprovalData, GetMSapprovalNurseData, GetMSapprovalParaData, GetMSapprovalotheraData, GetCPapprovalData, GetCPapprovalNurseData,
    GetCPapprovalParaData, GetCPapprovalotheraData, GetMDapprovalData, GetMDapprovalNurseData, GetMDapprovalParaData, GetMDapprovalotheraData, InsertCredHod,
    InsertCredNurseHod, InsertCredParaHod, InsertCredOtherHod, InsertCredMS, InsertCredNurseMS, InsertCredParaMS, InsertCredOtherMS, InsertCredDocCP,
    InsertCredNurseCP, InsertCredParaCP, InsertCredOtherCP, InsertCredDocMD, InsertCredNurseMD, InsertCredParaMD, InsertCredOtherMD } = require('../PersonalChecklist/personalchecklist.controller');
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
router.post('/CredentialDoc', checkToken, InsertCredentialDoc);
router.post('/credentialdocTraining', checkToken, GetcredentialdocTraining);
router.post('/credentialdocCertificate', checkToken, GetcredentialdocCertificate);
router.post('/credentialdocdetails', checkToken, Getcredentialdocdetails);
router.post('/credentialprivilageData', checkToken, GetcredentialprivilageData);
router.post('/CredentialNursing', checkToken, InsertCredentialNursing);
router.post('/credentialnursingTraining', checkToken, GetcredentialnursingTraining);
router.post('/credentialnursingCertificate', checkToken, GetcredentialnursingCertificate);
router.post('/credentialnursingdetails', checkToken, Getcredentialnursingdetails);
router.post('/credentialnursingData', checkToken, GetcredentialnursingData);
router.post('/CredentialPara', checkToken, InsertCredentialPara);
router.post('/credentialparaTraining', checkToken, GetcredentialparaTraining);
router.post('/credentialparaCertificate', checkToken, GetcredentialparaCertificate);
router.post('/credentialparadetails', checkToken, Getcredentialparadetails);
router.post('/credentialparaprivilageData', checkToken, GetcredentialparaprivilageData);
router.post('/CredentialOther', checkToken, InsertCredentialOther);
router.post('/credentialotherTraining', checkToken, GetcredentialotherTraining);
router.post('/credentialotherCertificate', checkToken, GetcredentialotherCertificate);
router.post('/credentialotherdetails', checkToken, Getcredentialotherdetails);
router.post('/credentialotherprivilageData', checkToken, GetcredentialotherprivilageData);
// approval
router.post('/HodapprovalData', checkToken, GetHodapprovalData);
router.post('/HodapprovalNurseData', checkToken, GetHodapprovalNurseData);
router.post('/HodapprovalParaData', checkToken, GetHodapprovalParaData);
router.post('/HodapprovalotheraData', checkToken, GetHodapprovalotheraData);

router.post('/MSapprovalData', checkToken, GetMSapprovalData);
router.post('/MSapprovalNurseData', checkToken, GetMSapprovalNurseData);
router.post('/MSapprovalParaData', checkToken, GetMSapprovalParaData);
router.post('/MSapprovalotheraData', checkToken, GetMSapprovalotheraData);

router.post('/CPapprovalData', checkToken, GetCPapprovalData);
router.post('/CPapprovalNurseData', checkToken, GetCPapprovalNurseData);
router.post('/CPapprovalParaData', checkToken, GetCPapprovalParaData);
router.post('/CPapprovalotheraData', checkToken, GetCPapprovalotheraData);

router.post('/MDapprovalData', checkToken, GetMDapprovalData);
router.post('/MDapprovalNurseData', checkToken, GetMDapprovalNurseData);
router.post('/MDapprovalParaData', checkToken, GetMDapprovalParaData);
router.post('/MDapprovalotheraData', checkToken, GetMDapprovalotheraData);

// Hod Approval save data credential

router.post('/CredentialDocHodApproval', checkToken, InsertCredHod);
router.post('/CredentialnurseHodApproval', checkToken, InsertCredNurseHod);
router.post('/CredentialnurseParaApproval', checkToken, InsertCredParaHod);
router.post('/CredentialnurseOtherApproval', checkToken, InsertCredOtherHod);

router.post('/CredentialDocMSApproval', checkToken, InsertCredMS);
router.post('/CredentialNurseMSApproval', checkToken, InsertCredNurseMS);
router.post('/CredentialParaMSApproval', checkToken, InsertCredParaMS);
router.post('/CredentialOtherMSApproval', checkToken, InsertCredOtherMS);


router.post('/CredentialDocCPApproval', checkToken, InsertCredDocCP);
router.post('/CredentialNurseCPApproval', checkToken, InsertCredNurseCP);
router.post('/CredentialParaCPApproval', checkToken, InsertCredParaCP);
router.post('/CredentialOtherCPApproval', checkToken, InsertCredOtherCP);


router.post('/CredentialDocMDApproval', checkToken, InsertCredDocMD);
router.post('/CredentialNurseMDApproval', checkToken, InsertCredNurseMD);
router.post('/CredentialParaMdApproval', checkToken, InsertCredParaMD);
router.post('/CredentialOtherMDApproval', checkToken, InsertCredOtherMD);








module.exports = router;