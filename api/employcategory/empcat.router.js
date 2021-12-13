const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createEmpCategory, updateEmpCategory, inactiveEmpCategory, getEmpCateSelect, getEmpCategoryByID, getempCategoryData } = require('../employcategory/empcat.controller');

router.post("/", checkToken, createEmpCategory);
router.patch("/", checkToken, updateEmpCategory);
router.delete("/", checkToken, inactiveEmpCategory);
router.get("/", checkToken, getempCategoryData);
router.get("/select", checkToken, getEmpCateSelect);
router.get("/:id", checkToken, getEmpCategoryByID);

module.exports = router;