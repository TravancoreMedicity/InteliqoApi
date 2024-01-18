const { getEmpNameByID, TrainerNameInsert, TrainerNameGet, TrainerNameUpdate, TrainerNameDelete, checkInsertVal, checkUpdateVal } = require('./TrainerName.service');
const { logger } = require('../../logger/logger');
const { validateTrainerName } = require('../../validation/validation_schema');

module.exports = {
    TrainerNameInsert: (req, res) => {
        const body = req.body;

        const body_result = validateTrainerName.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 0,
                message: body_result?.error?.details[0]?.message
            });
        }
        body.trainer_name = body_result.value.trainer_name;
        body.trainer_dept = body_result.value.trainer_dept;
        body.trainer_desig = body_result.value.trainer_desig;
        body.trainer_status = body_result.value.trainer_status;

        checkInsertVal(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {

                TrainerNameInsert(body, (err, result) => {
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
                            message: "Trainer Name Added Successfully"
                        });
                    }
                })
            }
            else {
                return res.status(200).json({
                    success: 10,
                    message: "This Trainer Name is already exist"
                })
            }
        })

    },
    TrainerNameUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateTrainerName.validate(body);
        if (body_result.error) {
            return res.status(200).JSON({
                success: 0,
                error: body_result?.details[0]?.error?.message
            });
        }
        body.trainer_name = body_result.value.trainer_name;
        body.trainer_dept = body_result.value.trainer_dept;
        body.trainer_desig = body_result.value.trainer_desig;
        body.trainer_status = body_result.value.trainer_status;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                TrainerNameUpdate(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (!results) {
                        return res.status(200).json({
                            success: 1,
                            message: "Record Not Found"
                        });
                    }

                    return res.status(200).json({
                        success: 2,
                        message: "Trainer Name Updated Successfully"
                    });

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Trainer Name Already Exist"
                })
            }
        })
    },
    getEmpNameByID: (req, res) => {
        const id = req.params.id;
        getEmpNameByID(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    TrainerNameGet: (req, res) => {

        TrainerNameGet((err, results) => {

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


    TrainerNameUpdate: (req, res) => {
        const body = req.body;
        TrainerNameUpdate(body, (err, results) => {
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

    TrainerNameDelete: (req, res) => {
        const body = req.body;
        TrainerNameDelete(body, (err, results) => {
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
