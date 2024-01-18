const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { uploadtrainingFiles, selectUploads } = require("../training_upload/training_upload.controller")


router.post("/uploadtrainingfiles", uploadtrainingFiles);
router.post('/selectuploads', selectUploads)


module.exports = router;