const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { insertannouncement, getAnnouncement } = require("../hrm_Announcement/hrm_Announcement.controller");

router.post("/", checkToken, insertannouncement);
router.get("/", checkToken, getAnnouncement);

module.exports = router;
