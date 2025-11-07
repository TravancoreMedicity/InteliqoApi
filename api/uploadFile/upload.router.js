const router = require("express").Router();
const {
    checkToken
} = require("../../auth/token_validation");
const {
    uploadfile,
    getEmployeeProfilePic,
    uploadfilemultiple,
    selectUploads,
    getPersonalImage,
    getHospitalImage,
    getHospitalLogo,
    getManualRequest
} = require("../uploadFile/upload.controller");

router.post("/upload", checkToken, uploadfile);
router.post("/", checkToken, getEmployeeProfilePic)
router.post("/uploadmultiple", checkToken, uploadfilemultiple);
router.post('/selectuploads', checkToken, selectUploads)


router.get("/getProfileimage/:id", checkToken, getPersonalImage)
router.get("/getHospitalImage", checkToken, getHospitalImage)
router.get("/getLogo", checkToken, getHospitalLogo)
router.get("/getmanualReq/:id", checkToken, getManualRequest)

module.exports = router;