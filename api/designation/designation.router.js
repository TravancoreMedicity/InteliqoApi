const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createDesignation, updatedesignation, deleteDesignation, getDesignationData, getdesignationById } = require('../designation/designation.controller');

router.post("/", checkToken, createDesignation);
router.patch("/", checkToken, updatedesignation);
router.delete("/", checkToken, deleteDesignation);
router.get("/", checkToken, getDesignationData);
router.get("/:id", checkToken, getdesignationById);

module.exports = router;