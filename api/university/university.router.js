const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createUniversity, updateUniversity, deleteUniversity, getUniversityData, getUniversityDataById } = require('../university/university.controller');

router.post("/", checkToken, createUniversity);
router.patch("/", checkToken, updateUniversity);
router.delete("/", checkToken, deleteUniversity);
router.get("/", checkToken, getUniversityData);
router.get("/:id", checkToken, getUniversityDataById);

module.exports = router;