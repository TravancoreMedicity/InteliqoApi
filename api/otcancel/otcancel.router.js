const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { inchargecancel } = require('../otcancel/otcancel.controller')


router.patch("/incharge/:id", checkToken, inchargecancel);



module.exports = router;