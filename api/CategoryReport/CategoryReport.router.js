const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getCatogery, getCategorybyId } = require('./CategoryReport.controller');

router.get('/category', getCatogery)
router.post('/getcategory', checkToken, getCategorybyId);

module.exports = router;