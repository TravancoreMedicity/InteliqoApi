const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { uploadfile, getEmployeeProfilePic, uploadfilemultiple, selectUploads } = require("../uploadFile/upload.controller");

router.post("/upload", checkToken, uploadfile);
router.post("/", checkToken, getEmployeeProfilePic)
router.post("/uploadmultiple", checkToken, uploadfilemultiple);
router.post('/selectuploads', checkToken, selectUploads)


module.exports = router;