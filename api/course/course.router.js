const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createCourse, updateCource, inactiveCourse, getCourse, getCourseByID, getSelectCourse } = require('../course/course.controller');

router.post("/", checkToken, createCourse);
router.patch("/", checkToken, updateCource);
router.delete("/", checkToken, inactiveCourse);
router.get("/", checkToken, getCourse);
router.get("/select", checkToken, getSelectCourse);
router.get("/:id", checkToken, getCourseByID);

module.exports = router;