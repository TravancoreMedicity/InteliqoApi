const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

const { getData,getEmpdetl,getEmpDataByEmno, vaccinationInsert,vaccinationentry,getannualvac,annualvaccinationbooster, vaccinationBoosterInsert,annualvaccinationInsert, getVaccination, SeconddoseInsert,hicinsertboosterdose, ThirddoseInsert,hicinsertseconddose,hicinsertthirddose, getDataVaccination, vaccinationInsertEntry, vaccinationInsertBooster,hicinsertfirstdose } = require('../Vaccination/Vaccination.controller');


router.get('/get/all',checkToken, getData);
router.post("/insert",checkToken, vaccinationInsert);
router.post("/insertbooster",checkToken, vaccinationBoosterInsert);
router.get('/getVaccination/:id',checkToken, getVaccination);
router.get('/getdataVaccination/:id',checkToken, getDataVaccination);
router.get('/getannual/:id',checkToken, getannualvac);
// vaccination entry page API


router.post("/insertFirstdose",checkToken, vaccinationInsertEntry);
router.post("/insertboosterdose",checkToken, vaccinationInsertBooster);
router.post("/insertSeconddose",checkToken, SeconddoseInsert);
router.post("/insertThirddose",checkToken, ThirddoseInsert);
// hic api
router.post("/Hicfirstdose",checkToken, hicinsertfirstdose);
router.post("/Hicseconddose",checkToken, hicinsertseconddose);
router.post("/Hicsthirddose", checkToken,hicinsertthirddose);
router.post("/Hicboosterdose",checkToken, hicinsertboosterdose);

// annual insertion
router.post("/annualFirstdose",checkToken, annualvaccinationInsert);
router.post("/annualbooster",checkToken, annualvaccinationbooster);
// for emid
router.post("/vaccinentry",checkToken, vaccinationentry);

// hic vaccinated list
router.post("/create", checkToken, getEmpdetl)
router.get("/getAll/:id", checkToken, getEmpDataByEmno)


module.exports = router;