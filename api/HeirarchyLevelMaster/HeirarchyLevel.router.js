const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create, getExceptDeptSection, getLevel2Dept, level2_create,
    getLevel2Data, getLevel3Data, getData } = require('../HeirarchyLevelMaster/HeirarchyLevel.controller');


router.post("/insert", checkToken, create);
router.get("/except", checkToken, getExceptDeptSection)
router.get("/indata", checkToken, getLevel2Dept)
router.post("/level2", checkToken, level2_create)
router.get("/data1", checkToken, getLevel2Data)
router.get("/data2", checkToken, getLevel3Data)

router.get("/data", checkToken, getData)

module.exports = router;