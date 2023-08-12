const router = require('express').Router();

const { TrainingCategoryInsert, TrainingCategoryGet, TrainingCategoryUpdate, TrainingCategoryDelete } = require('./TrainingCategory.controller');


router.post('/insert', TrainingCategoryInsert);
router.get('/select', TrainingCategoryGet)
router.patch('/update', TrainingCategoryUpdate)
router.patch('/delete', TrainingCategoryDelete)


module.exports = router;