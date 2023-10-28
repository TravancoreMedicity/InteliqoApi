const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { uploadtrainingFiles, selectUploads } = require("../training_upload/training_upload.controller")


router.post("/uploadtrainingfiles", checkToken, uploadtrainingFiles);
router.post('/selectuploads', checkToken, selectUploads)


module.exports = router;