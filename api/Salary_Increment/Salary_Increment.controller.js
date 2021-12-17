const { create, update, getDataBySlno, getSelectAllDataById, checkInsertVal, createSalary } = require('../Salary_Increment/Salary_Increment.service');
const { validatesalaryIncrement } = require('../../validation/validation_schema');

module.exports = {
    createIncre: (req, res) => {
        const body = req.body;
        const body_result = validatesalaryIncrement.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.relg_name = body_result.value.relg_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                create(body, (err, results) => {
                    if (err) {
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
                    message: "Salary Increment Already In Process"
                })
            }
        })
    },
    updateIncre: (req, res) => {

        const body = req.body;
        const body_result = validatesalaryIncrement.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.relg_name = body_result.value.relg_name;

        update(body, (err, results) => {

            if (err) {
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
    getDataBySlno: (req, res) => {

        const id = req.params.id;
        getDataBySlno(id, (err, results) => {
            if (err) {
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
    createSalary: (req, res) => {
        const body = req.body;
        createSalary(body, (err, results) => {
            if (err) {
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
    }


}