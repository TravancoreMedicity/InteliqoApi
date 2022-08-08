const {
    getCatogery,
    getCategorybyId,
    getDesignation,
    getDesignationById,
    getEducation,
    getEducationById,
    getCourse,
    getCourseById,
    getSpecialization,
    getSpecializationById,
    getDesignationExp,
    getdeptSection,
    getSectionTypeDetl,
    getPermanentEmpBranch,
    getpermanentEmpBranchDept,
    getpermanentEmpDetails

} = require('../reports/reports.service');


module.exports = {
    getCatogery: (req, res) => {
        getCatogery((err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    getCategorybyId: (req, res) => {
        const body = req.body;
        getCategorybyId(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    getDesignation: (req, res) => {
        getDesignation((err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    getDesignationById: (req, res) => {
        const body = req.body
        getDesignationById(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    getEducation: (req, res) => {
        getEducation((err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    getEducationById: (req, res) => {
        const body = req.body;
        getEducationById(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    getCourse: (req, res) => {
        const body = req.body
        getCourse(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
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
    getCourseById: (req, res) => {
        const body = req.body;
        getCourseById(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    getSpecialization: (req, res) => {
        const body = req.body
        // console.log(body);
        getSpecialization(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    getSpecializationById: (req, res) => {
        const body = req.body
        getSpecializationById(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    getSectionTypeDetl: (req, res) => {
        const body = req.body;
        getSectionTypeDetl(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    getdeptSection: (req, res) => {
        const body = req.body
        getdeptSection(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "no result found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getDesignationExp: (req, res) => {
        const body = req.body
        getDesignationExp(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    // /** Branch wise permanent employee list */
    // getPermanentEmpBranch: (req, res) => {
    //     const body = req.body
    //     getPermanentEmpBranch(body, (err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No Results Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     })
    // },
    // /** Branch, Department wise permanent employee */
    // getpermanentEmpBranchDept: (req, res) => {
    //     const body = req.body
    //     getpermanentEmpBranchDept(body, (err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No Results Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     })
    // },
    // /** Branch, department, dept section wise permanent employee list */
    // getpermanentEmpDetails: (req, res) => {
    //     const body = req.body
    //     getpermanentEmpDetails(body, (err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No Results Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     })
    // },
}