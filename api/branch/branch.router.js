const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createBranch,updateBranch,deleteBranch,getBranch,getBranchById } = require('../branch/branch.controller');

router.post("/",checkToken,createBranch);
router.patch("/",checkToken,updateBranch);
router.delete("/",checkToken,deleteBranch);
router.get("/",checkToken,getBranch);
router.get("/:id",checkToken,getBranchById);

module.exports = router;