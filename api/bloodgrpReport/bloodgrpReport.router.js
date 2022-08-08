const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getBloodgrp,
    getBloodgrpWiseReport
} = require('../bloodgrpReport/bloodgrpReport.controller')

//bloodgroup report
router.get('/bloodgroup', checkToken, getBloodgrp);
router.post('/bloodgroup/byid', checkToken, getBloodgrpWiseReport);

module.exports = router;