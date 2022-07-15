const { createDept, updateDept, deleteDept, getDept, getDeptById,
    checkInsertVal, checkUpdateVal } = require('../department/department.service');
const { validateDepartment } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createDept: (req, res) => {
        const body = req.body;
        //validate department Inster function
        const body_result = validateDepartment.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        // let body.dept_name = body_result
        body.dept_name = body_result.value.dept_name;
        body.dept_alias = body_result.value.dept_alias;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {

                createDept(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Department Master Created"
                    });
                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Department Name Already Exist"
                })
            }
        })
    },
    updateDept: (req, res) => {

        const body = req.body;
        const body_result = validateDepartment.validate(body);

        body.dept_name = body_result.value.dept_name;
        body.dept_alias = body_result.value.dept_alias;

        if (body_result.error) {
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                updateDept(body, (err, results) => {

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
                        message: "Department Updated Successfully"
                    });

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Department Name Already Exist"
                })
            }
        })

    },
    deleteDept: (req, res) => {
        const body = req.body;
        deleteDept(body, (err, results) => {
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
    getDept: (req, res) => {
        getDept((err, results) => {
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
    getDeptById: (req, res) => {
        const id = req.params.id;
        getDeptById(id, (err, results) => {
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
    }
}