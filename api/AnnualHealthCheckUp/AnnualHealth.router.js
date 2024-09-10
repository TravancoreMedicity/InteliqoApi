const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

const { InsertHealthCheckUpData, GetHealthCheckUpData, GetHealthData, InsertAnnualHrd } = require('../AnnualHealthCheckUp/AnnualHealth.controller');

router.post('/AnnualHealthCheckUp', checkToken, InsertHealthCheckUpData);
router.post('/CheckupDataDoc', checkToken, GetHealthCheckUpData);
router.post('/CheckupData', checkToken, GetHealthData);
router.post('/AnnualHealthHrd', checkToken, InsertAnnualHrd);



module.exports = router;