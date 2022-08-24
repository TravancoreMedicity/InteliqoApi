const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    InstitutionReport,
} = require('../institutionReport/institutionReport.controller')

//Institution Report
router.post('/instiution', checkToken, InstitutionReport);

module.exports = router;