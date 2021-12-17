const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { uploadfile, getEmployeeProfilePic } = require("../uploadFile/upload.controller");

router.post("/upload", checkToken, uploadfile);
router.post("/", checkToken, getEmployeeProfilePic)

module.exports = router;