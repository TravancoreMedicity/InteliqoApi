const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    // getCatogery,
    getBloodgrp,
    getDistrictById,
    getDistrict,
    getRegion,
    getReligion,
    getBloodgrpWiseReport,
    // getCategorybyId,
    getReligionWiseReport,
    getRegionById,
    getDistRegion,
    getDistRegionById,
    experienceReport,
    DeptSectReport,
    getEmpNameByDeptSection,
    EmpNameReport,
    InstitutionReport,
    getDeptSectByID,
    RegistrationTypeReport,
    DeptRegistrationTypeReport,
    EmpRegistrationTypeReport,
    getRegistrTyp,
    RegistrationNumberWiseReport,
    ChellanWiseReport,
    // getDesignationExpGreater,
    // getdeptSection,
    // getSectionTypeDetl,
    // getDesignationExpLessthan,
    // getDesignationExpDetl,
    // getExpdetlnonTmch,
    // getExpdetlTmch,
    // getCurrentExp,
    // getCurrentTmchExp,
    // getCurrentPrevious,
    // getTotalExp,
    // getTmchLessExp,
    // getTmchGreaterExp,
    // getNonTmchLessExp,
    // getNonTmchGreaterExp,
    // getCurrentExpLess,
    // getCurrentExpGreater,
    // getCurrentPreviousLess,
    // getCurrentPreviousGreter,
    // getcurrentTmchLess,
    // getcurrentTmchGreater,
    // getTotalExpLess,
    // getTotalExpGreater




} = require('../Reports/Reports.controller');

//bloodgroup report
router.get('/bloodgroup', getBloodgrp);
router.post('/bloodgroup/byid', checkToken, getBloodgrpWiseReport);
//catogery wise report
// router.get('/category', getCatogery)
// router.post('/getcategory', checkToken, getCategorybyId);
//religion wise report
router.get('/religion', getReligion);
router.post('/religion/byid', checkToken, getReligionWiseReport);
//designation wise report
// router.get('/designation', getDesignation);
// router.post('/designation/ById', checkToken, getDesignationById);
//region wise report
router.get('/region', getRegion);
router.get('/region/byid/:id', getRegionById)
router.get('/district', getDistrict);
router.post('/district/byid', checkToken, getDistrictById);

//to get district wise region
router.post('/distregion', getDistRegion)
router.post('/distreg/byregion', checkToken, getDistRegionById);

//to get education wise
// router.get('/education', getEducation)
// router.post('/education/ById', checkToken, getEducationById);
// router.post('/education/course', checkToken, getCourse);
// router.post('/course/ById', checkToken, getCourseById);
// router.post('/course/specialization', checkToken, getSpecialization);
// router.post('/specialization/ById', getSpecializationById);


//expeience report
router.post('/expemployee', experienceReport);
router.post('/deptsect', DeptSectReport);
router.post('/empname', getEmpNameByDeptSection);
router.post('/sectempname', EmpNameReport);
router.post('/deptsectById', getDeptSectByID);

//Institution Report
router.post('/instiution', InstitutionReport);


//RegistrationType wise report
router.post('/registerationtype', RegistrationTypeReport)
router.post('/deptregistration', DeptRegistrationTypeReport)
router.post('/regTypeReport', EmpRegistrationTypeReport)
router.get('/getRegType', getRegistrTyp)
router.post('/reNoWise', RegistrationNumberWiseReport)
router.post('/challanwiserprt', ChellanWiseReport)
// designation experience wise report
// router.post('/designexpgreter', getDesignationExpGreater);

// department type wise report

// router.post('/deptsection', getdeptSection);
// router.post('/Sectiontype', getSectionTypeDetl);


// designation experience wise report(lessthan)

// router.post('/getexpless', getDesignationExpLessthan);
// router.post('/getdesigDetlexp', getDesignationExpDetl);
// router.post('/getnontmch', getExpdetlnonTmch);
// router.post('/gettmch', getExpdetlTmch);
// router.post('/getCurrent', getCurrentExp);
// router.post('/getcurrenttmch', getCurrentTmchExp);
// router.post('/getcrrntprvs', getCurrentPrevious);
// router.post('/gettotalexp', getTotalExp);
// router.post('/gettmchless', getTmchLessExp);
// router.post('/gettmchgreter', getTmchGreaterExp);
// router.post('/getnonTmchless', getNonTmchLessExp);
// router.post('/getnontmchgreter', getNonTmchGreaterExp);
// router.post('/currentexpless', getCurrentExpLess);
// router.post('/currentexpgreter', getCurrentExpGreater);
// router.post('/getcrrntprvsless', getCurrentPreviousLess);
// router.post('/currentpvrsgreter', getCurrentPreviousGreter)
// router.post('/currentTmchless', getcurrentTmchLess);
// router.post('/currenttmchgreter', getcurrentTmchGreater);
// router.post('/totalexpLess', getTotalExpLess);
// router.post('/gettotalexpgreater', getTotalExpGreater);




