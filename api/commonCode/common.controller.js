const {
    getDepartmentName,
    getDistrictName,
    getSaluationNamelist,
    getNationNames,
    getStateName,
    getMainSideMenuByUser,
    getModuleNameList,
    getUserModuleRights,
    getBankName,
    getLeaveType,
    getGrades,
    getEducation,
    getCourse,
    getCourseById,
    getSerialno,
    getSerialnoempno,
    getSpecById,
    getUniversity,
    getRegistrationType,
    getWageDescription,
    getEarnings,
    getFineded,
    getpersonalData,
    GetFixedWagesSalry,
    GetEarningsSalry,
    GetDeductionSalry,
    getFineSlno,
    GetLastChangedSalary,
    getannprocess,
    getcasual,
    getleaveholiday,
    getleavecommon,
    getCompanyById,
    getcompanylogId
} = require('../commonCode/common.service');

module.exports = {
    getDepartmentName: (req, res) => {

        getDepartmentName((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getSerialnumber: (req, res) => {

        getSerialno((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getDistrictName: (req, res) => {

        getDistrictName((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getSaluationName: (req, res) => {
        getSaluationNamelist((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getNationNameList: (req, res) => {

        getNationNames((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getStateList: (req, res) => {

        getStateName((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getMainSideMenuList: (req, res) => {
        const id = req.params.id;
        getMainSideMenuByUser(id, (err, results) => {
            if (err) {
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
        })
    },
    getModuleNameList: (req, res) => {
        getModuleNameList((err, results) => {
            if (err) {
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
        })
    },
    getModuleRights: (req, res) => {
        const body = req.body
        getUserModuleRights(body, (err, results) => {
            if (err) {
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
        })
    },
    getBankNameDetl: (req, res) => {
        getBankName((err, results) => {
            if (err) {
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
        })
    },
    getLeaveType: (req, res) => {
        getLeaveType((err, results) => {
            if (err) {
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
        })
    },
    //Education List
    getEducation: (req, res) => {
        getEducation((err, results) => {
            if (err) {
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
        })
    },
    //Course List
    getCourse: (req, res) => {

        getCourse((err, results) => {
            if (err) {
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
        })
    },

    //Course ByID 
    getCourseById: (req, res) => {
        const id = req.params.id;
        getCourseById(id, (err, results) => {
            if (err) {
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
        })
    },

    //grade select
    getGrades: (req, res) => {
        getGrades((err, results) => {
            if (err) {
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
        })
    },
    // for getting employeid
    getSerialnoempno: (req, res) => {
        getSerialnoempno((err, results) => {
            if (err) {
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
        })
    },

    //Specialization ByID 
    getSpecById: (req, res) => {
        const id = req.params.id;
        getSpecById(id, (err, results) => {
            if (err) {
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
        })
    },

    //University List
    getUniversity: (req, res) => {
        getUniversity((err, results) => {
            if (err) {
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
        })
    },

    //Get registration Type
    getRegistrationType: (req, res) => {
        getRegistrationType((err, results) => {
            if (err) {
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
        })
    },

    //Get Wage description (earnded_name) from hrm_earning_deduction

    getWageDescription: (req, res) => {
        getWageDescription((err, results) => {
            if (err) {
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
        })
    },

    //Get details from hrm_earning_deduction depands on wage description
    getEarnings: (req, res) => {
        const id = req.params.id
        getEarnings(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    //Fine deduction list
    getFineded: (req, res) => {
        getFineded((err, results) => {
            if (err) {
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
        })
    },

    //Get details from EMPLOYEE PERSONAL
    getpersonalData: (req, res) => {
        const id = req.params.id
        getpersonalData(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    //Salary Information of fixed wages
    GetFixedWagesSalry: (req, res) => {
        const id = req.params.id
        GetFixedWagesSalry(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    //Salary Information of Earnings
    GetEarningsSalry: (req, res) => {
        const id = req.params.id
        GetEarningsSalry(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    //Salary Information of Deduction
    GetDeductionSalry: (req, res) => {
        const id = req.params.id
        GetDeductionSalry(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getFineSlno: (req, res) => {

        getFineSlno((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    //Last Changed Salary Information
    GetLastChangedSalary: (req, res) => {
        const id = req.params.id
        GetLastChangedSalary(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getannprocess: (req, res) => {
        const id = req.params.id
        getannprocess(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
    getcasual: (req, res) => {
        const id = req.params.id
        getcasual(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
    getleaveholiday: (req, res) => {
        const id = req.params.id
        getleaveholiday(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
    getleavecommon: (req, res) => {
        const id = req.params.id
        getleavecommon(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
    getCompanyById: (req, res) => {
        const id = req.params.id
        getCompanyById(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
    getcompanylogId: (req, res) => {
        const id = req.params.id
        getcompanylogId(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },


}