const { createPerformanceGrade,
    getPerformanceGrade,
    getPerGradeByID,
    updatePerformanceGrade } = require('../performanceGrade/performanceGrade.service');
const { validationPerformanceGrade } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')

module.exports = {
    createPerformanceGrade: (req, res) => {
        const body = req.body;
        //validate performance grade
        const body_result = validationPerformanceGrade.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        // let body.dept_name = body_result
        //body.sect_name = body_result.value.sect_name;

        createPerformanceGrade(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Record Updated Successfully"
            });
        });
    },
    getPerformanceGrade: (req, res) => {

        getPerformanceGrade((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getPerGradeByID: (req, res) => {
        const id = req.params.id;
        getPerGradeByID(id, (err, results) => {
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
    updatePerformanceGrade: (req, res) => {

        const body = req.body;
        const body_result = validationPerformanceGrade.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        updatePerformanceGrade(body, (err, results) => {

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
    },
}