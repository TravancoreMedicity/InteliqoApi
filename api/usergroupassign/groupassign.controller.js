const { insertGroupAssign, getGroupAssignById, updateGroupAssign, deleteGroupAssign, getGroupAssign } = require('../usergroupassign/groupassign.service');
const { validateGroupAssign } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {

    insertGroupAssign: (req, res) => {

        const body = req.body;

        const body_result = validateGroupAssign.validate(body);
        if (body_result.error) {
            return res.status(400).json({
                success: 0,
                message: body_result.error.details[0].message
            });
        }

        insertGroupAssign(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: results
            });
        })

    },
    updateGroupAssign: async (req, res) => {

        const body = req.body;
        const body_result = validateGroupAssign.validate(body);

        if (body_result.error) {
            return res.status(400).json({
                success: 0,
                message: body_result.error.details[0].message
            });
        }

        updateGroupAssign(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
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
                message: "Data Updated Successfully"
            });

        });

    },
    deleteGroupAssign: (req, res) => {
        const body = req.body;
        deleteGroupAssign(body, (err, results) => {
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
    getGroupAssign: (req, res) => {
        getGroupAssign((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }

            if (results.length == 0) {
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
    getGroupAssignById: (req, res) => {
        const id = req.params.id;
        getGroupAssignById(id, (err, results) => {
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

