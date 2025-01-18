const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    checkprocesstable, insertprocesstable, updateprocess, getproceedataByID,
    insertcasualleave, getholidaylist, insertHoliday, updatecasualleave,
    updateholiday, insertCommonleave, updatecommon, insertearnleave,
    updateearnleave, updateholidayupdateslno, updatecasualleaveupdateslno, creditCasualLeave, updateeanleaveupdate,
    allowableCasualLeave, allowableholiday, allowablefesitval, allowableearnleave, dataannualcalculation,
    allowableconleave, holidaylistyear, insertyearly, select_yearlyprocess, dataannualcalculationEmployee,
    creditPrivilegeLeave, getLeaveProccedData, inactiveLastYearProcessData, inactiveCasualLeave,
    inactiveEarnLeave, inactiveHoliday, inactiveCommonLeave, getEsiPfDetails, getleaveProcessData,
    inactiveSickLeave, inactiveEsiLeave, updateCommonUpdateSlno, getLeavecountbyDate,
    getYearlyLeaveCount, getYearlyCasualLeaveCount, getYearlySickLeaveCount, getYearlyEarnLeaveCount,
    updatePreviousLeave, insertPreviousearnLeave, insertPreviouscasualleave
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
router.get("/allowablcommon/allowableconleave/data/:id", checkToken, allowableconleave)
router.post("/dataannualcalculation", checkToken, dataannualcalculation)
router.post("/holidaylistyear", checkToken, holidaylistyear)
router.post("/insertyearly", checkToken, insertyearly)
router.post("/select_yearlyprocess", checkToken, select_yearlyprocess)
router.post("/dataannualcalculationemp", checkToken, dataannualcalculationEmployee)
router.post("/creditPrivilegeLeave", checkToken, creditPrivilegeLeave)
router.post("/getLeaveProccedData", checkToken, getLeaveProccedData)
router.post("/inactiveLastYearProcessData", checkToken, inactiveLastYearProcessData)
router.post("/inactiveCasualLeave", checkToken, inactiveCasualLeave)
router.post("/inactiveEarnLeave", checkToken, inactiveEarnLeave)
router.post("/inactiveHoliday", checkToken, inactiveHoliday)
router.post("/inactiveCommonLeave", checkToken, inactiveCommonLeave)

router.get("/esidetails/:id", checkToken, getEsiPfDetails)
router.get("/leaveproccess/data/:id", checkToken, getleaveProcessData)
router.patch("/inactive/sick", checkToken, inactiveSickLeave)
router.patch("/inactive/esi", checkToken, inactiveEsiLeave)
router.post("/updateCommonUpdateSlno", checkToken, updateCommonUpdateSlno)

router.post("/getLeavecountbyDate", checkToken, getLeavecountbyDate)
router.post("/getYearlyLeaveCount", checkToken, getYearlyLeaveCount)

router.post("/getYearlyCasualLeaveCount", checkToken, getYearlyCasualLeaveCount)
router.post("/getYearlySickLeaveCount", checkToken, getYearlySickLeaveCount)
router.post("/getYearlyEarnLeaveCount", checkToken, getYearlyEarnLeaveCount)

router.post("/updatePreviousLeave", checkToken, updatePreviousLeave)
router.post("/insertPreviousearnLeave", checkToken, insertPreviousearnLeave)
router.post("/insertPreviouscasualleave", checkToken, insertPreviouscasualleave)

module.exports = router;