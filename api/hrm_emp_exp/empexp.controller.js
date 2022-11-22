const { create, update, getDataById, getSelectAllDataById, getDataByEmpno } = require('../hrm_emp_exp/empexp.service');
const { validateempexperience_ } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createExp: (req, res) => {
        const body = req.body;
        const body_result = validateempexperience_.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.em_id = body_result.value.em_id;

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
    updateExp: (req, res) => {

        const body = req.body;
        const body_result = validateempexperience_.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.em_id = body_result.value.em_id;

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
    getExpByID: (req, res) => {

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
                return res.status(200).json({
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
    getSelectAllExpByID: (req, res) => {

        const id = req.params.id;
        getSelectAllDataById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
        });

    },
    getDataByEmpno: (req, res) => {

        const id = req.params.id;
        getDataByEmpno(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
        });

    },
}