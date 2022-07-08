const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createCarry, getCarry, updateCarry, getCarryById } = require('../carryforwardleaves/carryforward.controller');

router.post("/", checkToken, createCarry);
router.patch("/", checkToken, updateCarry);
router.get("/", checkToken, getCarry);
router.get("/:id", checkToken, getCarryById);

module.exports = router;