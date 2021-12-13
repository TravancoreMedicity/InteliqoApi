const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createbldgroup, updatebloodbank, inactivebloodgroup, getBloodGroupByID, getbldgroupData, getbloodgroupSelect } = require("../bloodgroup/bloodgroup.controller");

router.post("/", checkToken, createbldgroup);
router.patch("/", checkToken, updatebloodbank);
router.delete("/", checkToken, inactivebloodgroup);
router.get("/", checkToken, getbldgroupData);
router.get("/:id", checkToken, getBloodGroupByID);
router.get("/select", checkToken, getbloodgroupSelect);

module.exports = router;