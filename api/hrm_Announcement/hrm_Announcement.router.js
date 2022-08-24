const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { insertannouncement, getAnnouncement, getBirthdayEmployee } = require("../hrm_Announcement/hrm_Announcement.controller");

router.post("/", checkToken, insertannouncement);
router.get("/", checkToken, getAnnouncement);
/** employee name and details for birthday */
router.get("/birthday", checkToken, getBirthdayEmployee)

module.exports = router;
