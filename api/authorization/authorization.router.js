const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createAuthorization, inactiveAuthorization, getAuthorization, getHod, getIncharge,
    createCoAssign } = require('../authorization/authorization.controller');

router.post("/", checkToken, createAuthorization);
router.delete("/:id", checkToken, inactiveAuthorization);
router.get("/", checkToken, getAuthorization);
router.get("/hod", checkToken, getHod);
router.get("/incharge", checkToken, getIncharge);
router.post("/coassign", checkToken, createCoAssign);


module.exports = router;