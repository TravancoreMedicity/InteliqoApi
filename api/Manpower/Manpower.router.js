const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

const { getDepartAndSectionEmpDetl, insertmanpowerplanning, getname, getdesignation, updatemanpowerplanning } = require('../Manpower/Manpower.controller');

router.post("/getEmpDet", checkToken, getDepartAndSectionEmpDetl)
router.post("/insertdata", checkToken, insertmanpowerplanning)
router.post('/getdesig', checkToken, getname);
router.post("/getdesgdet", checkToken, getdesignation)
// for update
router.post("/updatedata", checkToken, updatemanpowerplanning)

module.exports = router;