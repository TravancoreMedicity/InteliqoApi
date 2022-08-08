const {
    // getCatogery,
    getBloodgrp,
    getDistrictById,
    getDistrict,
    getRegion,
    getReligion,
    // getCategorybyId,
    getBloodgrpWiseReport,
    getReligionWiseReport,
    // getDesignation,
    // getDesignationById,
    // getEducation,
    // getEducationById,
    getRegionById,
    // getCourse,
    // getCourseById,
    // getSpecialization,
    // getSpecializationById,
    getDistRegion,
    getDistRegionById,
    experienceReport,
    DeptSectReport,
    getEmpNameByDeptSection,
    EmpNameReport,
    InstitutionReport,
    getDeptSectByID,
    RegistrationTypeReport,
    DeptRegistrationTypeReport,
    EmpRegistrationTypeReport,
    getRegistrTyp,
    RegistrationNumberWiseReport,
    ChellanWiseReport,
    // getDesignationExpGreater,
    // getdeptSection,
    // getSectionTypeDetl,
    // getDesignationExpLessthan,
    // getDesignationExpDetl,
    // getExpdetlnonTmch,
    // getExpdetlTmch,
    // getCurrentExp,
    // getCurrentTmchExp,
    // getCurrentPrevious,
    // getTotalExp,
    // getTmchLessExp,
    // getTmchGreaterExp,
    // getNonTmchLessExp,
    // getNonTmchGreaterExp,
    // getCurrentExpLess,
    // getCurrentExpGreater,
    // getCurrentPreviousLess,
    // getCurrentPreviousGreter,
    // getcurrentTmchLess,
    // getcurrentTmchGreater,
    // getTotalExpLess,
    // getTotalExpGreater


} = require('../reports/reports.service');


module.exports = {
    // getCatogery: (req, res) => {
    //     getCatogery((err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Results Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
    getBloodgrp: (req, res) => {
        getBloodgrp((err, results) => {
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
    getBloodgrpWiseReport: (req, res) => {
        const body = req.body
        getBloodgrpWiseReport(body, (err, results) => {
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
    // getCategorybyId: (req, res) => {
    //     const body = req.body;
    //     getCategorybyId(body, (err, results) => {
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
    getReligionWiseReport: (req, res) => {

        const body = req.body
        getReligionWiseReport(body, (err, results) => {
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
    // getDesignation: (req, res) => {
    //     getDesignation((err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Results Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
    // getDesignationById: (req, res) => {
    //     const body = req.body
    //     getDesignationById(body, (err, results) => {
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
    getReligion: (req, res) => {
        getReligion((err, results) => {
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
    getRegion: (req, res) => {
        getRegion((err, results) => {
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
    getRegionById: (req, res) => {
        const id = req.params.id;
        getRegionById(id, (err, results) => {
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
    getDistrict: (req, res) => {
        getDistrict((err, results) => {
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
    getDistrictById: (req, res) => {
        const body = req.body
        getDistrictById(body, (err, results) => {
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
    getDistRegion: (req, res) => {
        const body = req.body;
        getDistRegion(body, (err, results) => {
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
    getDistRegionById: (req, res) => {
        const body = req.body;
        getDistRegionById(body, (err, results) => {
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
    // getEducation: (req, res) => {
    //     getEducation((err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Results Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
    // getEducationById: (req, res) => {
    //     const body = req.body;
    //     getEducationById(body, (err, results) => {
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
    // getCourse: (req, res) => {
    //     const body = req.body
    //     getCourse(body, (err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: err
    //             });
    //         }

    //         if (results.length == 0) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Results Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
    // getCourseById: (req, res) => {
    //     const body = req.body;
    //     getCourseById(body, (err, results) => {
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
    // getSpecialization: (req, res) => {
    //     const body = req.body
    //     // console.log(body);
    //     getSpecialization(body, (err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Results Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
    // getSpecializationById: (req, res) => {
    //     const body = req.body
    //     getSpecializationById(body, (err, results) => {
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
    experienceReport: (req, res) => {
        const body = req.body
        experienceReport(body, (err, results) => {
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
    getDeptSectByID: (req, res) => {
        const body = req.body;
        getDeptSectByID(body, (err, results) => {
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
    DeptSectReport: (req, res) => {
        const body = req.body;
        DeptSectReport(body, (err, results) => {
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
    getEmpNameByDeptSection: (req, res) => {
        const body = req.body;
        getEmpNameByDeptSection(body, (err, results) => {
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
    EmpNameReport: (req, res) => {
        const body = req.body;
        EmpNameReport(body, (err, results) => {
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
    InstitutionReport: (req, res) => {
        const body = req.body;
        InstitutionReport(body, (err, results) => {
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
    RegistrationTypeReport: (req, res) => {
        const body = req.body;
        RegistrationTypeReport(body, (err, results) => {
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
    DeptRegistrationTypeReport: (req, res) => {
        const body = req.body;
        DeptRegistrationTypeReport(body, (err, results) => {
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
    EmpRegistrationTypeReport: (req, res) => {
        const body = req.body;
        EmpRegistrationTypeReport(body, (err, results) => {
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

    getRegistrTyp: (req, res) => {
        getRegistrTyp((err, results) => {
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
    RegistrationNumberWiseReport: (req, res) => {
        const body = req.body;
        RegistrationNumberWiseReport(body, (err, results) => {
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
    ChellanWiseReport: (req, res) => {
        const body = req.body;
        ChellanWiseReport(body, (err, results) => {
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
    // getSectionTypeDetl: (req, res) => {
    //     const body = req.body;
    //     getSectionTypeDetl(body, (err, results) => {
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
    // getdeptSection: (req, res) => {
    //     const body = req.body
    //     getdeptSection(body, (err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "no result found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
    // getDesignationExpGreater: (req, res) => {
    //     const body = req.body
    //     getDesignationExpGreater(body, (err, results) => {
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

    // getDesignationExpLessthan: (req, res) => {
    //     const body = req.body
    //     getDesignationExpLessthan(body, (err, results) => {
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
    // getDesignationExpDetl: (req, res) => {
    //     const body = req.body
    //     getDesignationExpDetl(body, (err, results) => {
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
    // getExpdetlnonTmch: (req, res) => {
    //     const body = req.body
    //     getExpdetlnonTmch(body, (err, results) => {
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
    // getExpdetlTmch: (req, res) => {
    //     const body = req.body
    //     getExpdetlTmch(body, (err, results) => {
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

    // getCurrentExp: (req, res) => {
    //     const body = req.body
    //     getCurrentExp(body, (err, results) => {
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
    // getCurrentTmchExp: (req, res) => {
    //     const body = req.body
    //     getCurrentTmchExp(body, (err, results) => {
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
    // getCurrentPrevious: (req, res) => {
    //     const body = req.body
    //     getCurrentPrevious(body, (err, results) => {
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
    // getTotalExp: (req, res) => {
    //     const body = req.body
    //     getTotalExp(body, (err, results) => {
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
    // getTmchLessExp: (req, res) => {
    //     const body = req.body
    //     getTmchLessExp(body, (err, results) => {
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
    // getTmchGreaterExp: (req, res) => {
    //     const body = req.body
    //     getTmchGreaterExp(body, (err, results) => {
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
    // getNonTmchLessExp: (req, res) => {
    //     const body = req.body
    //     getNonTmchLessExp(body, (err, results) => {
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
    // getNonTmchGreaterExp: (req, res) => {
    //     const body = req.body
    //     getNonTmchGreaterExp(body, (err, results) => {
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
    // getCurrentExpLess: (req, res) => {
    //     const body = req.body
    //     getCurrentExpLess(body, (err, results) => {
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
    // getCurrentExpGreater: (req, res) => {
    //     const body = req.body
    //     getCurrentExpGreater(body, (err, results) => {
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
    // getCurrentPreviousLess: (req, res) => {
    //     const body = req.body
    //     getCurrentPreviousLess(body, (err, results) => {
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
    // getCurrentPreviousGreter: (req, res) => {
    //     const body = req.body
    //     getCurrentPreviousGreter(body, (err, results) => {
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
    // getcurrentTmchLess: (req, res) => {
    //     const body = req.body
    //     getcurrentTmchLess(body, (err, results) => {
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
    // getcurrentTmchGreater: (req, res) => {
    //     const body = req.body
    //     getcurrentTmchGreater(body, (err, results) => {
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
    // getTotalExpLess: (req, res) => {
    //     const body = req.body
    //     getTotalExpLess(body, (err, results) => {
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
    // getTotalExpGreater: (req, res) => {
    //     const body = req.body
    //     getTotalExpGreater(body, (err, results) => {
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
    // }
}