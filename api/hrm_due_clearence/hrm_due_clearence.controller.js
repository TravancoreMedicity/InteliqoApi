const { createDueClearence, getDueClarennceListBySection, getDueDetailsByID,
    updateDueClearence, getDueClearenceHR, getDueClearenceApproveDetails } = require('../hrm_due_clearence/hrm_due_clearence.service');
const { validateDueClearence } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createDueClearence: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.emp_id, value.deptcode, value.deptname]
        })
        createDueClearence(a1, (err, results) => {
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
    },
    getDueClarennceListBySection: (req, res) => {
        const body = req.body;
        getDueClarennceListBySection(body, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getDueDetailsByID: (req, res) => {
        const id = req.params.id;
        getDueDetailsByID(id, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    updateDueClearence: (req, res) => {

        const body = req.body;
        const body_result = validateDueClearence.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }


        updateDueClearence(body, (err, results) => {

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
    getDueClearenceHR: (req, res) => {

        getDueClearenceHR((err, results) => {
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
    getDueClearenceApproveDetails: (req, res) => {
        const id = req.params.id;
        getDueClearenceApproveDetails(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
}