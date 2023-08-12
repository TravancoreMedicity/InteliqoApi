const router = require('express').Router();

const { TrainingUpdateGet } = require('./TrainingUpdate.controller');

router.get('/select/:id', TrainingUpdateGet)

module.exports = router;