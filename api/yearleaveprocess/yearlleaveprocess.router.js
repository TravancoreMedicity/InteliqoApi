const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    checkprocesstable
} = require('../yearleaveprocess/yearleaveprocess.controller');

router.post("/", checkToken, checkprocesstable)


module.exports = router;