const router = require("express").Router();
// const multer = require("multer")
const { checkToken } = require("../../auth/token_validation");
const { uploadfile } = require("./upload.controller");
// const upload = multer()

router.post("/upload", checkToken, uploadfile);

module.exports = router;