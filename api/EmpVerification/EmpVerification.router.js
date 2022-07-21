const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { InsertVerification, getFirstlevelVerification,
    updateFirstlevelVerification, getSecondlevelVerification, updateSecondlevelVerification } = require('../EmpVerification/EmpVerification.controller');

router.post("/", checkToken, InsertVerification);
router.get("/", checkToken, getFirstlevelVerification);
router.patch("/", checkToken, updateFirstlevelVerification);
router.get("/secondlevelverify", checkToken, getSecondlevelVerification);
router.patch("/secondverification", checkToken, updateSecondlevelVerification);


module.exports = router;