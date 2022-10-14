const {
    getProbationEndList,
    getAnnualList,
    getTrainingList,
    getContractEndList,
    getLevel2Hierarchy,
    getLevel1Hierarchy,
    getIdOnly,
    createAppraisal,
    getInchargeAppraisalList,
    getHODAppraisalList,
    getCEODepartments,
    getContractRenewList
} = require('../PerformanceAppraisal/PerformanceAppraisal.service')

module.exports = {
    getProbationEndList: (req, res) => {
        getProbationEndList((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getAnnualList: (req, res) => {
        getAnnualList((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getTrainingList: (req, res) => {
        getTrainingList((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getContractEndList: (req, res) => {
        getContractEndList((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getLevel2Hierarchy: (req, res) => {
        const id = req.params.id;
        getLevel2Hierarchy(id, (err, results) => {
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
    getLevel1Hierarchy: (req, res) => {
        const id = req.params.id;
        getLevel1Hierarchy(id, (err, results) => {
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
    getIdOnly: (req, res) => {
        getIdOnly((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    createAppraisal: (req, res) => {
        const body = req.body;
        createAppraisal(body, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
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
    getInchargeAppraisalList: (req, res) => {
        const body = req.body
        getInchargeAppraisalList(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getHODAppraisalList: (req, res) => {
        const body = req.body
        getHODAppraisalList(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getCEODepartments: (req, res) => {
        getCEODepartments((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getContractRenewList: (req, res) => {
        getContractRenewList((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
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