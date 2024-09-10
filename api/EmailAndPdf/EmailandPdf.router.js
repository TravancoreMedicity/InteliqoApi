const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { insertofferletter, insertrejectemp, insertrejectstatus, insertSelectstatus, insertem_noUpdate } = require('../EmailAndPdf/EmailandPdf.controller');

router.post("/offerletter", checkToken, insertofferletter)
router.post("/rejectemp", checkToken, insertrejectemp)
router.post("/rejectstatus", checkToken, insertrejectstatus)
router.post("/Selectstatus", checkToken, insertSelectstatus)
router.post("/em_noUpdate", checkToken, insertem_noUpdate)

module.exports = router;