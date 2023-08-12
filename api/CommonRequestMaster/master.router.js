const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create, getData, updateRequest, deleteReqstName } = require("../CommonRequestMaster/master.controller")


router.post("/", checkToken, create);
router.get("/", checkToken, getData);
router.patch("/", checkToken, updateRequest);
router.delete("/delete/data/:id", checkToken, deleteReqstName)

module.exports = router;