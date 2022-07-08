const { insertuserGroup, getUserGroups, getGroupById, updateUserGroup, deleteUserGroup, getUserGroupSelect } = require('./usrgroup.service');
const { validateUserGroup } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {

    insertuserGroup: (req, res) => {

        const body = req.body;

        const body_result = validateUserGroup.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 0,
                message: body_result.error.details[0].message
            });
        }
        // after the validation value
        body.user_group_name = body_result.value.user_group_name;

        insertuserGroup(body, (err, results) => {

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
        })

    },
    updateUserGroup: async (req, res) => {

        const body = req.body;
        const body_result = validateUserGroup.validate(body);

        body.user_group_name = body_result.value.user_group_name;

        if (body_result.error) {
            return res.status(200).json({
                success: 0,
                message: body_result.error.details[0].message
            });
        }

        updateUserGroup(body, (err, results) => {
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
    deleteUserGroup: (req, res) => {
        const body = req.body;
        deleteUserGroup(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
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
                message: "Record Deleted Successfully"
            });
        });
    },
    getUserGroups: (req, res) => {
        getUserGroups((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 10,
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
    getGroupById: (req, res) => {
        const id = req.params.id;
        getGroupById(id, (err, results) => {
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
        });
    },
    getUserGroupsSelected: (req, res) => {
        getUserGroupSelect((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 10,
                    message: err
                });
            }

            if (results.length == 0) {
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

}