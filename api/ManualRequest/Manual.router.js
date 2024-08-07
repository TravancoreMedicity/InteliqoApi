const router = require("express").Router();
const { uploadManualreqst } = require('./Manual.controller')

router.post("/uploadManualRequest", uploadManualreqst);

module.exports = router;