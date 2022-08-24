const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getEducation,
    getEducationById,
    getCourse,
    getCourseById,
    getSpecialization,
    getSpecializationById,
} = require('../QualificationReport/QualificationReport.controller');

router.get('/education', getEducation)
router.post('/education/ById', checkToken, getEducationById);
router.post('/education/course', checkToken, getCourse);
router.post('/course/ById', checkToken, getCourseById);
router.post('/course/specialization', checkToken, getSpecialization);
router.post('/specialization/ById', getSpecializationById);

module.exports = router;