const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    checkprocesstable, insertprocesstable, updateprocess, getproceedataByID,
    insertcasualleave, getholidaylist, insertHoliday, updatecasualleave,
    updateholiday, insertCommonleave, updatecommon, insertearnleave,
    updateearnleave, updateholidayupdateslno, updatecasualleaveupdateslno, creditCasualLeave, updateeanleaveupdate,
    allowableCasualLeave, allowableholiday, allowablefesitval, allowableearnleave, dataannualcalculation,
    allowableconleave, holidaylistyear, insertyearly, select_yearlyprocess
} = require('../yearleaveprocess/yearleaveprocess.controller');

router.post("/", checkToken, checkprocesstable)
router.post("/create", checkToken, insertprocesstable)
router.patch("/", checkToken, updateprocess)
router.get("/:id", checkToken, getproceedataByID)
router.get("/year/holiday", checkToken, getholidaylist)
router.post("/insert", checkToken, insertcasualleave)
router.post("/insertholiday", checkToken, insertHoliday)
router.post("/insertearnleave", checkToken, insertearnleave)
router.patch("/updatecasualleave", checkToken, updatecasualleave)
router.patch("/updateearnleave", checkToken, updateearnleave)
router.patch("/updateholiday", checkToken, updateholiday)
router.post("/insertCommonleave", checkToken, insertCommonleave)
router.post("/updateholidayupdateslno", checkToken, updateholidayupdateslno)
router.post("/updatecasualleaveupdateslno", checkToken, updatecasualleaveupdateslno)
router.post("/updateeanleaveupdate", checkToken, updateeanleaveupdate)
router.patch("/updatecommon", checkToken, updatecommon)
router.patch("/creditcasual", checkToken, creditCasualLeave)
router.get("/allwbleCL/:id", checkToken, allowableCasualLeave)
router.get("/allowableholiday/:id", checkToken, allowableholiday)
router.get("/allowableholiday/allowablefesitval/:id", checkToken, allowablefesitval)
router.get("/allowableholiday/allowableearnleave/data/:id", checkToken, allowableearnleave)
router.post("/allowablcommon/allowableconleave/data/", checkToken, allowableconleave)
router.post("/dataannualcalculation", checkToken, dataannualcalculation)
router.post("/holidaylistyear", checkToken, holidaylistyear)
router.post("/insertyearly", checkToken, insertyearly)
router.post("/select_yearlyprocess", checkToken, select_yearlyprocess)

module.exports = router;