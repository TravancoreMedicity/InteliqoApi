const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingUpdateGet } = require('./TrainingUpdate.controller');

router.get('/select/:id', checkToken, TrainingUpdateGet)

module.exports = router;