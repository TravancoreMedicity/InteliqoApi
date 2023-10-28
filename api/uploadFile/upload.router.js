const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { uploadfile, getEmployeeProfilePic, uploadfilemultiple, uploadchecklist, checklistfiles } = require("../uploadFile/upload.controller");

router.post("/upload", checkToken, uploadfile);
router.post("/", checkToken, getEmployeeProfilePic)
router.post("/uploadmultiple", checkToken, uploadfilemultiple);
router.post("/uploadchecklist", checkToken, uploadchecklist);
// for getting the file
router.post("/files", checkToken, checklistfiles);




module.exports = router;