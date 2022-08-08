const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getDesignationExpGreater,
    getDesignationExpLessthan,
    getDesignationExpDetl,
    getExpdetlnonTmch,
    getExpdetlTmch,
    getCurrentExp,
    getCurrentTmchExp,
    getCurrentPrevious,
    getTotalExp,
    getTmchLessExp,
    getTmchGreaterExp,
    getNonTmchLessExp,
    getNonTmchGreaterExp,
    getCurrentExpLess,
    getCurrentExpGreater,
    getCurrentPreviousLess,
    getCurrentPreviousGreter,
    getcurrentTmchLess,
    getcurrentTmchGreater,
    getTotalExpLess,
    getTotalExpGreater
} = require("../DesignationExpReport/DesigexpReport.controller")

/**  designation wise experience report */
router.post('/designexpgreter', getDesignationExpGreater);
router.post('/getexpless', getDesignationExpLessthan);
router.post('/getdesigDetlexp', getDesignationExpDetl);
router.post('/getnontmch', getExpdetlnonTmch);
router.post('/gettmch', getExpdetlTmch);
router.post('/getCurrent', getCurrentExp);
router.post('/getcurrenttmch', getCurrentTmchExp);
router.post('/getcrrntprvs', getCurrentPrevious);
router.post('/gettotalexp', getTotalExp);
router.post('/gettmchless', getTmchLessExp);
router.post('/gettmchgreter', getTmchGreaterExp);
router.post('/getnonTmchless', getNonTmchLessExp);
router.post('/getnontmchgreter', getNonTmchGreaterExp);
router.post('/currentexpless', getCurrentExpLess);
router.post('/currentexpgreter', getCurrentExpGreater);
router.post('/getcrrntprvsless', getCurrentPreviousLess);
router.post('/currentpvrsgreter', getCurrentPreviousGreter)
router.post('/currentTmchless', getcurrentTmchLess);
router.post('/currenttmchgreter', getcurrentTmchGreater);
router.post('/totalexpLess', getTotalExpLess);
router.post('/gettotalexpgreater', getTotalExpGreater);

module.exports = router;