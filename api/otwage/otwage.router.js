const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { empmasterOtWage, empmasterOtWageone, empmasterOtWageedit, getOtWage,
    getOtWageByID, getdeptsecauthri } = require('../otwage/otwage.controller')

router.patch("/", checkToken, empmasterOtWage);
router.patch("/onlyone", checkToken, empmasterOtWageone);
router.get("/", checkToken, getOtWage);
router.get("/:id", checkToken, getOtWageByID);
router.get("/deptsecauthori/:id", checkToken, getdeptsecauthri);
router.patch("/edit", checkToken, empmasterOtWageedit);


module.exports = router;