const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createDueClearenceDept, updateDueDepartment, getSelect,
    getDueClearenceDeptByID, GetDueClearenceDeptBydept } = require('../DueaClearenceDepartment/DueaClearenceDepartment.controller');

router.post("/", checkToken, createDueClearenceDept);
router.patch("/", checkToken, updateDueDepartment);
router.get("/select", checkToken, getSelect);
router.get("/:id", checkToken, getDueClearenceDeptByID);
router.post("/duedept", checkToken, GetDueClearenceDeptBydept);
module.exports = router;