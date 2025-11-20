const router = require("express").Router();
const {
    checkToken
} = require("../../auth/token_validation");
const {
    getCatogery,
    getCategorybyId,
    getDoctorCategory
} = require('./CategoryReport.controller');

router.get('/category', getCatogery)
router.post('/getcategory', checkToken, getCategorybyId);
router.post('/categorylist', checkToken, getDoctorCategory)

module.exports = router;