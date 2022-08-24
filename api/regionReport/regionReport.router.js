const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getDistrictById,
    getRegion,
    getRegionById,
    getDistRegion,
    getDistRegionById,
} = require('../regionReport/regionReport.controller')

//region wise report
router.get('/region', getRegion);
router.get('/region/byid/:id', getRegionById)

router.post('/district/byid', checkToken, getDistrictById);
//to get district wise region
router.post('/distregion', checkToken, getDistRegion)
router.post('/distreg/byregion', checkToken, getDistRegionById);

module.exports = router;