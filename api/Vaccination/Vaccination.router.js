const router = require('express').Router();
const { getData, vaccinationInsert,vaccinationentry,getannualvac,annualvaccinationbooster, vaccinationBoosterInsert,annualvaccinationInsert, getVaccination, SeconddoseInsert,hicinsertboosterdose, ThirddoseInsert,hicinsertseconddose,hicinsertthirddose, getDataVaccination, vaccinationInsertEntry, vaccinationInsertBooster,hicinsertfirstdose } = require('../Vaccination/Vaccination.controller');


router.get('/get/all', getData);
router.post("/insert", vaccinationInsert);
router.post("/insertbooster", vaccinationBoosterInsert);
router.get('/getVaccination/:id', getVaccination);
router.get('/getdataVaccination/:id', getDataVaccination);
router.get('/getannual/:id', getannualvac);
// vaccination entry page API


router.post("/insertFirstdose", vaccinationInsertEntry);
router.post("/insertboosterdose", vaccinationInsertBooster);
router.post("/insertSeconddose", SeconddoseInsert);
router.post("/insertThirddose", ThirddoseInsert);
// hic api
router.post("/Hicfirstdose", hicinsertfirstdose);
router.post("/Hicseconddose", hicinsertseconddose);
router.post("/Hicsthirddose", hicinsertthirddose);
router.post("/Hicboosterdose", hicinsertboosterdose);

// annual insertion
router.post("/annualFirstdose", annualvaccinationInsert);
router.post("/annualbooster", annualvaccinationbooster);
// for emid
router.post("/vaccinentry", vaccinationentry);

module.exports = router;