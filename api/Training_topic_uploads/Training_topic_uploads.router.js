const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { uploadtrainingFiles, selectUploads } = require("./Training_topic_uploads.controller")


router.post("/uploadtrainingfiles", checkToken, uploadtrainingFiles);
router.post('/selectuploads', selectUploads)


module.exports = router;