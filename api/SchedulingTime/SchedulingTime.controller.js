const { validateSchedulingTime } = require('../../validation/validation_schema');
const { SchedulingTimeInsert, checkInsertVal, SchedulingTimeGet, SchedulingTimeUpdate, SchedulingTimeDelete } = require('./SchedulingTime.service');
const { logger } = require('../../logger/logger');

module.exports = {

    SchedulingTimeInsert: (req, res) => {
        const body = req.body;
        const body_result = validateSchedulingTime.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result?.error?.details[0]?.message
            });
        }
        // compare
        body.schedule_name = body_result.value.schedule_name;
        body.schedule_status = body_result.value.schedule_status;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                SchedulingTimeInsert(body, (err, results) => {
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
                            message: "Training Time Scheduled"
                        });
                    }

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Already Exist"
                })
            }
        })
    },
    //update
    SchedulingTimeUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateSchedulingTime.validate(body);
        if (body_result.error) {
            return res.status(200).JSON({
                success: 2,
                error: body_result?.error?.details[0]?.message
            });
        }
        body.schedule_name = body_result.value.schedule_name;
        body.schedule_status = body_result.value.schedule_status;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (object.keys(value).length === 0) {
                SchedulingTimeUpdate(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
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
                        message: "Training Time Added Successfully"
                    });

                });
            }
            else {
                return res.status(200).JSON({
                    success: 10,
                    message: "Training Time Already Exist"
                })
            }
        })
    },

    SchedulingTimeGet: (req, res) => {
        SchedulingTimeGet((err, results) => {
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

    SchedulingTimeUpdate: (req, res) => {
        const body = req.body;
        SchedulingTimeUpdate(body, (err, results) => {
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
    SchedulingTimeDelete: (req, res) => {
        const body = req.body;
        SchedulingTimeDelete(body, (err, results) => {
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
