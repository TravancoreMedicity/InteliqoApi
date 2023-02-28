const { create, update, getSelect, getdepartmentshiftMasterByID, getDepartmentShiftbyshiftid, checkshiftforDept, getShiftTiming } = require('../Departmentshiftmaster/Departmentshiftmaster.service');
const { validatedepartmentshiftmaster } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    create: (req, res) => {

        const body = req.body;
        const body_result = validatedepartmentshiftmaster.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.dept_id = body_result.value.dept_id;
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
    },
    update: (req, res) => {

        const body = req.body;
        const body_result = validatedepartmentshiftmaster.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.dept_id = body_result.value.dept_id;

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
    },
    getSelect: (req, res) => {

        getSelect((err, results) => {
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
    getdepartmentshiftMasterByID: (req, res) => {
        const id = req.params.id;
        getdepartmentshiftMasterByID(id, (err, results) => {
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
    getDepartmentShiftbyshiftid: (req, res) => {
        const body = req.body;
        getDepartmentShiftbyshiftid(body, (err, results) => {
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
    checkshiftforDept: (req, res) => {
        const body = req.body;
        checkshiftforDept(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successs: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    successs: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                successs: 1,
                data: results
            });
        })
    },
    getShiftTiming: (req, res) => {
        const body = req.body;
        getShiftTiming(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    succ: 0,
                    msge: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    succ: 0,
                    msge: "No Record Found"
                });
            }

            return res.status(200).json({
                succ: 1,
                result: results
            });
        })
    },

}