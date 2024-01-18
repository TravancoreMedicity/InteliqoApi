const { validateTraningCategory } = require('../../validation/validation_schema');
const { TrainingCategoryInsert, TrainingCategoryGet, TrainingCategoryUpdate, TrainingCategoryDelete, checkInsertVal, checkUpdateVal } = require('./TrainingCategory.service');
const { logger } = require('../../logger/logger')

module.exports = {

    TrainingCategoryInsert: (req, res) => {
        const body = req.body;
        const body_result = validateTraningCategory.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 0,
                message: body_result?.error?.details[0]?.message
            });
        }

        body.trning_typeslno = body_result.value.trning_typeslno;
        body.trin_cat_name = body_result.value.trin_cat_name;
        body.cat_status = body_result.value.cat_status;
        checkInsertVal(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
                TrainingCategoryInsert(body, (err, result) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "Training Category Added Successfully"
                        });
                    }
                })
            }
            else {
                return res.status(200).json({
                    success: 10,
                    message: "This Category is already exist"
                })
            }
        })
    },

    TrainingCategoryUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateTraningCategory.validate(body);
        if (body_result.error) {
            return res.status(200).JSON({
                success: 0,
                error: body_result?.details[0]?.error?.message
            });
        }
        body.trning_typeslno = body_result.value.trning_typeslno;
        body.trin_cat_name = body_result.value.trin_cat_name;
        body.cat_status = body_result.value.cat_status
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                TrainingCategoryUpdate(body, (err, results) => {
                    if (err) {
                        return res.status(200).JSON({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        return res.status(200).JSON({
                            success: 1,
                            message: "No Record Found"
                        });
                    }

                    return res.status(200).JSON({
                        success: 2,
                        message: "Data Updated successfully"
                    });
                });
            }
            else {
                return res.status(200).JSON({
                    success: 11,
                    message: "Entered Training Category already exist"
                });
            }
        });
    },

    TrainingCategoryGet: (req, res) => {

        TrainingCategoryGet((err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    TrainingCategoryUpdate: (req, res) => {
        const body = req.body;
        TrainingCategoryUpdate(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Records Found"
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully"
            })
        })
    },

    TrainingCategoryDelete: (req, res) => {
        const body = req.body;
        TrainingCategoryDelete(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Data Deleted Successfully"
            })
        })

    }

}
