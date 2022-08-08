const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getReligionWiseReport
} = require('../ReligionReport/ReligionReport.controller')

//religion report
router.post('/religion/byid', checkToken, getReligionWiseReport);

module.exports = router;