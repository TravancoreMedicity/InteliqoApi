const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getNewJoineesBydate, getNewjoineesbyDept, punchMasterUpdate } = require("./OnObservationController");

router.post("/employee/list", checkToken, getNewJoineesBydate);
router.post("/deptlist", checkToken, getNewjoineesbyDept)
router.patch("/punchMasterUpdate", checkToken, punchMasterUpdate)

module.exports = router;