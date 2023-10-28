const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

const { getData } = require('../PersonalChecklist/personalchecklist.controller');
router.post('/get/all', checkToken, getData);

module.exports = router;