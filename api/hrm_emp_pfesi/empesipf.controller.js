const {
    create,
    update,
    getDataById,
    getDataBySlno,
    getEsiallow,
    createNpsdata,
    esinotallowedUpdate,
    InactiveEsi
} = require('../hrm_emp_pfesi/empesipf.service');
const logger = require('../../logger/logger')
module.exports = {
    createpfesi: (req, res) => {
        const body = req.body;
        const {
            em_no
        } = body;

        getDataById(em_no, (err, results) => {
            if (Object.keys(results)?.length === 0) {
                create(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "Record Not Found"
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Data Created Successfully"
                    });

                });

            } else {
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
                            success: 2,
                            message: "Record Not Found"
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated Successfully"
                    });

                });
            }
        });
    },
    updatepfesi: (req, res) => {
        const body = req.body;
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
    getempesipfByID: (req, res) => {
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
                    message: "No Record Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    getempesipfBySlno: (req, res) => {
        const id = req.params.id;
        getDataBySlno(id, (err, results) => {
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

    },
    getEsiallow: (req, res) => {
        const id = req.params.id;
        getEsiallow(id, (err, results) => {
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

    },
    createnps: (req, res) => {
        const body = req.body;
        createNpsdata(body, (err, results) => {
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
    esinotallowedUpdate: (req, res) => {

        const body = req.body;
        esinotallowedUpdate(body, (err, results) => {
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
    InactiveEsi: (req, res) => {
        const body = req.body;
        InactiveEsi(body, (err, results) => {
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
}