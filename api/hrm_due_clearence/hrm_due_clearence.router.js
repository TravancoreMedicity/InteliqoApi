const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createDueClearence, getDueClarennceListBySection, getDueDetailsByID,
    updateDueClearence, getDueClearenceHR, getDueClearenceApproveDetails } = require('../hrm_due_clearence/hrm_due_clearence.controller');

router.post("/", checkToken, createDueClearence);
router.post("/select", checkToken, getDueClarennceListBySection);
router.get("/", checkToken, getDueClearenceHR);
router.get("/:id", checkToken, getDueDetailsByID);
router.patch("/", checkToken, updateDueClearence);
router.get("/getdueDetl/:id", checkToken, getDueClearenceApproveDetails);

module.exports = router;
