const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getNewJoineesBydate,
    getNewjoineesbyDept,
    punchMasterUpdate,
    getAllOnObservation,
    inactiveOnObservation } = require("./OnObservationController");

router.post("/employee/list", checkToken, getNewJoineesBydate);
router.post("/deptlist", checkToken, getNewjoineesbyDept)
router.patch("/punchMasterUpdate", checkToken, punchMasterUpdate)
router.get("/getall", checkToken, getAllOnObservation)
router.post("/inactiveOnObservation", checkToken, inactiveOnObservation)


module.exports = router;