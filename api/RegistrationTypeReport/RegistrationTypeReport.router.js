const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    RegistrationTypeReport,
    DeptRegistrationTypeReport,
    EmpRegistrationTypeReport,
    getRegistrTyp,
    RegistrationNumberWiseReport,
    ChellanWiseReport,
    RegNumberWithDate,
    getRegisterOnly,
    getChallanOnly,
    getChallanRegistrationCombined,
    challanNumberWithDate,
    getCombinedRegType,
    getCombinedWithdate,
} = require('../RegistrationTypeReport/RegistrationTypeReport.controller')

//Department wise RegistrationType report
router.post('/registerationtype', checkToken, RegistrationTypeReport)
router.post('/deptregistration', checkToken, DeptRegistrationTypeReport)



router.post('/regTypeReport', EmpRegistrationTypeReport)
router.get('/getRegType', getRegistrTyp)



//registration type with date
router.post('/regwithdate', RegNumberWithDate)
//challan number with date
router.post('/challanwithdate', challanNumberWithDate)

/** Registration number only report */
router.get('/registernumonly', getRegisterOnly)
/** Challan Number only report */
router.get('/challanonly', getChallanOnly)
/** Both Challan And Register */
router.get('/combined', getChallanRegistrationCombined)
/** register type with registration number  */
router.post('/reNoWise', RegistrationNumberWiseReport)
/** register tyep with challan number */
router.post('/challanwiserprt', ChellanWiseReport)
router.post('/regcombined', getCombinedRegType)
/** Both challan and registration number details with date, register type */
router.post('/combinedwithdate', getCombinedWithdate)


module.exports = router;