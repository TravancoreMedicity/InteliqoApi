const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createYearlyHoliday, updateYearlyHoiliday, getSelectYearlyHoliday,
    getYearkyHoliday, getYearlyHolidayByID, inactiveYearlyHoliday, getDatabyYear,
    getHolidayByDate } = require('../yearlyholiday/yearlyhold.controller');

router.post("/", checkToken, createYearlyHoliday);
router.patch("/", checkToken, updateYearlyHoiliday);
router.delete("/", checkToken, inactiveYearlyHoliday);
router.get("/", checkToken, getYearkyHoliday);
router.get("/select", checkToken, getSelectYearlyHoliday);
router.get("/:id", checkToken, getYearlyHolidayByID);
router.get("/getholidaylist/getlist", checkToken, getDatabyYear);
router.post("/getholiday", checkToken, getHolidayByDate);


module.exports = router;