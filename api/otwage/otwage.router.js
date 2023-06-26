const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { empmasterOtWage, empmasterOtWageone, empmasterOtWageedit, getOtWage,
    getOtWageByID, getdeptsecauthri, getOtWageByNo } = require('../otwage/otwage.controller')

router.patch("/", checkToken, empmasterOtWage);
router.patch("/onlyone/update", checkToken, empmasterOtWageone);
router.get("/", checkToken, getOtWage);
router.get("/:id", checkToken, getOtWageByID);
router.get("/deptsecauthori/:id", checkToken, getdeptsecauthri);
router.patch("/edit", checkToken, empmasterOtWageedit);
router.get("/byno/:id", checkToken, getOtWageByNo)


module.exports = router;