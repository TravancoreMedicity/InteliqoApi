const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createSecial, updateSpecial, inactiveSpecial, getSpecial, getSpecialByID, getSelectSpecial } = require('../specialization/special.controller');

router.post("/", checkToken, createSecial);
router.patch("/", checkToken, updateSpecial);
router.delete("/", checkToken, inactiveSpecial);
router.get("/", checkToken, getSpecial);
router.get("/select", checkToken, getSelectSpecial);
router.get("/:id", checkToken, getSpecialByID);

module.exports = router;