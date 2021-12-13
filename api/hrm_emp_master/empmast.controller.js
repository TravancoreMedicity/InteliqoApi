const {
    create,
    update,
    deleteByID,
    getData,
    getDataById,
    getSelect,
    getEmpByDeptAndSection,
    updateserialnum
} = require('../hrm_emp_master/empmast.service');
const { validateempmaster, validateempmasterupdate } = require('../../validation/validation_schema');

module.exports = {
    createempmast: (req, res) => {
        const body = req.body;
        const body_result = validateempmaster.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.em_name = body_result.value.em_name;

        create(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            else {
                updateserialnum((err, results) => {
                    if (err) {
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
                        message: "Data Created Successfully"
                    });
                });


            }


        });
    },
    updateempmast: (req, res) => {

        const body = req.body;
        const body_result = validateempmasterupdate.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.em_name = body_result.value.em_name;

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
    inactiveempmast: (req, res) => {

        const body = req.body;

        deleteByID(body, (err, results) => {
            if (err) {
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
    getempmast: (req, res) => {

        getData((err, results) => {
            if (err) {
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
    getempmastByID: (req, res) => {

        const id = req.params.id;
        getDataById(id, (err, results) => {
            if (err) {
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
    getSelectEmpmast: (req, res) => {

        getSelect((err, results) => {
            if (err) {
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
    getDepartAndSectionEmpDetl: (req, res) => {
        const body = req.body

        getEmpByDeptAndSection(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    }
}