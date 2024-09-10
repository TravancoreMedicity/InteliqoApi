const { getJobDescById, createJobDuties, updateDutiesEach, deleteduties, createSkill, checkInsertVal, createSkillJob, getJobSkill, UpdateSkill, deleteSkillduties,
    UpdateSkillJob,
} = require('../JobAndSkillDesc/jobAndSkill.service');
const logger = require('../../logger/logger')
module.exports = {
    getJobDescById: (req, res) => {
        const body = req.body
        getJobDescById(body, (err, results) => {
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

    createJobDuties: (req, res) => {
        const body = req.body;

        createJobDuties(body, (err, results) => {
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
                message: "Data Created Successfully"
            });
        });
    },

    updateDutiesEach: (req, res) => {
        const body = req.body;
        updateDutiesEach(body, (err, results) => {
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

    deleteduties: (req, res) => {
        const id = req.params.id;
        deleteduties(id, (err, results) => {
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
                success: 5,
                message: "Data Delete Successfully"
            });
        });
    },


    createSkill: (req, res) => {
        const body = req.body;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                createSkill(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    const { insertId } = results
                    const InsertData = {
                        designation: body.designation,
                        Dept_id: body.Dept_id,
                        skillid: insertId
                    }

                    createSkillJob(InsertData, (err, results) => {
                        if (err) {
                            logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }

                        return res.status(200).json({
                            success: 1,
                            message: "Skill Created"
                        });
                    });
                    // return res.status(200).json({
                    //     success: 1,
                    //     message: "Skill Created"
                    // });
                });
            }
            else {
                createSkillJob(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Skill Created"
                    });
                });
            }
        })
    },

    getJobSkill: (req, res) => {
        const body = req.body
        getJobSkill(body, (err, results) => {
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



    UpdateSkill: (req, res) => {
        const body = req.body;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                createSkill(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    const { insertId } = results
                    const InsertData = {
                        designation: body.designation,
                        Dept_id: body.Dept_id,
                        skillid: insertId,
                        slno: body.slno
                    }

                    UpdateSkillJob(InsertData, (err, results) => {
                        if (err) {
                            logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }

                        return res.status(200).json({
                            success: 1,
                            message: "Skill Created"
                        });
                    });
                    // return res.status(200).json({
                    //     success: 1,
                    //     message: "Skill Created"
                    // });
                });
            }
            else {
                UpdateSkillJob(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Skill Created"
                    });
                });
            }
        })
    },

    deleteSkillduties: (req, res) => {
        const id = req.params.id;
        deleteSkillduties(id, (err, results) => {
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
                success: 5,
                message: "Data Delete Successfully"
            });
        });
    },
}