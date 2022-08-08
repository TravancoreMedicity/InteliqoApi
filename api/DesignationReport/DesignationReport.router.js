const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getDesignation, getDesignationById, } = require('../DesignationReport/DesignationReport.controller');

router.get('/designation', getDesignation);
router.post('/designation/ById', checkToken, getDesignationById);


module.exports = router;