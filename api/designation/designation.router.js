const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createDesignation, updatedesignation, deleteDesignation, getDesignationData, getdesignationById, getNoticePeriod } = require('../designation/designation.controller');

router.post("/", checkToken, createDesignation);
router.patch("/", checkToken, updatedesignation);
router.delete("/", checkToken, deleteDesignation);
router.get("/", checkToken, getDesignationData);
router.get("/:id", checkToken, getdesignationById);
router.get("/noticeperiod/:id", checkToken, getNoticePeriod);

module.exports = router;