const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getReligionWiseReport, getEmpWiseReport, getEmpWisePunchReport, getEmpWisePunchReportdep, getpunchReportmasterdep
} = require('../ReligionReport/ReligionReport.controller')

//religion report
router.post('/religion/byid', checkToken, getReligionWiseReport);
router.post('/punchReport', checkToken, getEmpWiseReport);
router.post('/punchReportmaster', checkToken, getEmpWisePunchReport);
router.post('/punchReportdep', checkToken, getEmpWisePunchReportdep);
router.post('/punchReportmasterdep', checkToken, getpunchReportmasterdep);
module.exports = router;