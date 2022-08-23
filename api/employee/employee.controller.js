const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { employeeinsert, employeeupdate, getemplpyee, employeeGetById, employeedelete, getEmployeeByUserName, getEmployeeID } = require('../employee/employee.service');
const { validateEmployee } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')

module.exports = {
    employeeinsert: (req, res) => {

        const body = req.body;

        //Validate requested body data
        const body_data = validateEmployee.validate(body);
        // if (body_data.error) {
        //     res.status(400).send(body_data.error.details[0].message);
        //     return;
        // }

        const salt = genSaltSync(10);
        let new_password = body.emp_password;
        console.log(salt);
        console.log(new_password);
        body.emp_password = hashSync(new_password, salt);

        employeeinsert(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: 1,
                message: results
            });
        })
    },
    employeeupdate: (req, res) => {

        const body = req.body;
        //Validate requested body data
        const body_data = validateEmployee.validate(body);
        if (body_data.error) {
            res.status(400).send(body_data.error.details[0].message);
            return;
        }

        const salt = genSaltSync(10);
        let new_password = body.emp_password;
        body.emp_password = hashSync(new_password, salt);

        employeeupdate(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to Update"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated Successfully"
            });
        });
    },
    getemplpyee: (req, res) => {

        getemplpyee((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }

            if (!results) {
                return res.status(400).json({
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
    employeeGetById: (req, res) => {
        const id = req.params.id;
        employeeGetById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
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
    employeedelete: (req, res) => {
        const body = req.body;
        employeedelete(body, (err, results) => {
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
    login: (req, res) => {
        const body = req.body;
        getEmployeeByUserName(body.emp_username, (err, results) => {
            if (err) {
                logger.errorLogger(err)
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid user Name  or password"
                });
            }
            const get_password = body.emp_password.toString();
            const result = compareSync(get_password, results.emp_password);
            if (result) {
                results.emp_password = undefined;
                const jsontoken = sign({ result: results }, "@dhj$&$(*)dndkm76$%#jdn(^$6GH%^#73*#*", {
                    expiresIn: "5h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    user: results.emp_username,
                    emp_no: results.emp_no,
                    emp_id: results.emp_id
                });
            } else {
                return res.json({
                    success: 0,
                    message: "error"
                });
            }
        });
    },


}