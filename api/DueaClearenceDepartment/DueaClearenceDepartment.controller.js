const { createDueClearenceDept, updateDueDepartment, getSelect,
    getDueClearenceDeptByID, GetDueClearenceDeptBydept } = require('../DueaClearenceDepartment/DueaClearenceDepartment.service');
const { validatedepartmentdueclearencedept } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createDueClearenceDept: (req, res) => {

        const body = req.body;
        const body_result = validatedepartmentdueclearencedept.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.dept_id = body_result.value.dept_id;
        createDueClearenceDept(body, (err, results) => {
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
    updateDueDepartment: (req, res) => {

        const body = req.body;
        const body_result = validatedepartmentdueclearencedept.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.dept_id = body_result.value.dept_id;

        updateDueDepartment(body, (err, results) => {

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
    getDueClearenceDeptByID: (req, res) => {
        const id = req.params.id;
        getDueClearenceDeptByID(id, (err, results) => {
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
    GetDueClearenceDeptBydept: (req, res) => {
        const body = req.body;
        GetDueClearenceDeptBydept(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success1: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success1: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success1: 1,
                data1: results
            });
        })
    },

}