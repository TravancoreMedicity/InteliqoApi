const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getCatogery,
    getCategorybyId,
    getDesignation,
    getDesignationById,
    getEducation,
    getEducationById,
    getCourse,
    getCourseById,
    getSpecialization,
    getSpecializationById,
    getDesignationExp,
    getdeptSection,
    getSectionTypeDetl,

} = require('../Reports/Reports.controller');

//catogery wise report
router.get('/category', getCatogery)
router.post('/getcategory', checkToken, getCategorybyId);

//designation wise report
router.get('/designation', getDesignation);
router.post('/designation/ById', checkToken, getDesignationById);

//to get education wise
router.get('/education', getEducation)
router.post('/education/ById', checkToken, getEducationById);
router.post('/education/course', checkToken, getCourse);
router.post('/course/ById', checkToken, getCourseById);
router.post('/course/specialization', checkToken, getSpecialization);
router.post('/specialization/ById', getSpecializationById);

// designation experience wise report
router.post('/designexp', getDesignationExp);

// department type wise report
router.post('/deptsection', getdeptSection);
router.post('/Sectiontype', getSectionTypeDetl);

module.exports = router;
