const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingCategoryInsert, TrainingCategoryGet, TrainingCategoryUpdate, TrainingCategoryDelete } = require('./TrainingCategory.controller');


router.post('/insert', checkToken, TrainingCategoryInsert);
router.get('/select', checkToken, TrainingCategoryGet)
router.patch('/update', checkToken, TrainingCategoryUpdate)
router.patch('/delete', checkToken, TrainingCategoryDelete)


module.exports = router;