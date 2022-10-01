const { create, update, deleteByID, getData, getDataById, checkInsertVal, checkUpdateVal, getcommonleave } = require('../yearlyleaves/yearlyleave.service');
const { validateyearyleaves } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createYearlyLeave: (req, res) => {
        const body = req.body;
        const body_result = validateyearyleaves.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                create(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Data Created Successfully"
                    });

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Year Leave Count already inserted"
                })
            }
        })
    },
    updateYearlyLeave: (req, res) => {

        const body = req.body;
        const body_result = validateyearyleaves.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        // checkUpdateVal(body, (err, results) => {

        //     console.log(results)
        //     const value = JSON.parse(JSON.stringify(results))
        //     if (Object.keys(value).length === 0) {

        update(body, (err, results) => {

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
                message: "Data Updated Successfully"
            });

        });
        //     }
        //     else{
        //         return res.status(200).json({
        //             success: 7,
        //             message: "Leave Type Count already setted"
        //         })   
        //     }
        //  })
    },
    inactiveYearlyLeave: (req, res) => {

        const body = req.body;

        deleteByID(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Record Deleted Successfully"
            });
        });
    },
    getYearlyLeave: (req, res) => {

        getData((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successleave: 2,
                    messageleave: err
                });
            }

            else if (results.length == 0) {
                return res.status(200).json({
                    successleave: 0,
                    messageleave: "No Results Found"
                });
            }

            return res.status(200).json({
                successleave: 1,
                messageleave: results
            });
        });
    },
    getYearlyLeaveByID: (req, res) => {
        const id = req.params.id;
        getDataById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    getcommonleave: (req, res) => {
        getcommonleave((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successcommonleave: 2,
                    messagecommonleave: err
                });
            }

            else if (results.length == 0) {
                return res.status(200).json({
                    successcommonleave: 0,
                    messagecommonleave: "No Results Found"
                });
            }

            return res.status(200).json({
                successcommonleave: 1,
                messagecommonleave: results
            });
        });
    },


}