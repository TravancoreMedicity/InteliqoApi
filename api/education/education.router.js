const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createEducation, updateEducation, inactiveEducation, getEducation, getEducationByID, getSelectEducation } = require('../education/education.controller');

router.post("/", checkToken, createEducation);
router.patch("/", checkToken, updateEducation);
router.delete("/", checkToken, inactiveEducation);
router.get("/", checkToken, getEducation);
router.get("/select", checkToken, getSelectEducation);
router.get("/:id", checkToken, getEducationByID);

module.exports = router;