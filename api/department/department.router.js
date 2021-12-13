const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createDept, updateDept, deleteDept, getDept, getDeptById } = require('../department/department.controller');

router.post("/",checkToken,createDept);
router.patch("/",checkToken,updateDept);
router.delete("/",checkToken,deleteDept);
router.get("/",checkToken,getDept);
router.get("/:id",checkToken,getDeptById);

module.exports = router;