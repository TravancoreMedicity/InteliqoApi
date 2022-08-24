const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getdeptSection,
    getSectionTypeDetl
} = require('../DeptSectionReport/DeptSectionReport.controller')

router.post('/deptsection', getdeptSection);
router.post('/Sectiontype', getSectionTypeDetl);

module.exports = router;