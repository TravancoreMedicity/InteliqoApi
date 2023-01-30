const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createAuthorization, inactiveAuthorization, getAuthorization, getHod, getIncharge,
    createCoAssign, getAuthorizationDetls } = require('../authorization/authorization.controller');

router.post("/", checkToken, createAuthorization);
router.delete("/:id", checkToken, inactiveAuthorization);
router.get("/", checkToken, getAuthorization);
router.get("/hod", checkToken, getHod);
router.get("/incharge", checkToken, getIncharge);
router.post("/coassign", checkToken, createCoAssign);

//get incharge or hod details
router.post("/details", checkToken, getAuthorizationDetls);


module.exports = router;