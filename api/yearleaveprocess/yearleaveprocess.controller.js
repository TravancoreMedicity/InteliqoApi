const {
    checkTable, insertprocesstable, update, getdataById, insertcasualleave,
    getholidaylist, insertHoliday, updatecasualleave, updateholiday,
    updateprocessslno, insertCommonleave, updatecommon, insertearnleave,
    updateearnleave, updateholidayupdateslno, updatecasualleaveupdateslno,
    updateeanleaveupdate, creditCasualLeave, allowableCasualLeave,
    allowableholiday, allowablefesitval, allowableearnleave, allowableconleave,
    dataannualcalculation, holidaylistyear, insertyearly, select_yearlyprocess,
    dataannualcalculationEmployee, creditPrivilegeLeave, getLeaveProccedData, inactiveLastYearProcessData,
    inactiveCasualLeave, inactiveEarnLeave, inactiveHoliday, inactiveCommonLeave,
    getEsiPfDetails, getleaveProcessData, inactiveSickLeave, insertStatutoryCommonleave,
    insertSickLeave, updateCommonUpdateSlno, getLeavecountbyDate, getYearlyLeaveCount,
    getYearlyCasualLeaveCount, getYearlySickLeaveCount, getYearlyEarnLeaveCount,
    updatePreviousLeave, insertPreviousearnLeave, insertPreviouscasualleave,
    updatecarryforwardEl, updatecarryforwardCl, updatecarryforwardSl
} = require('../yearleaveprocess/yearllraveprocess.service');
const logger = require('../../logger/logger');
const { differenceInMonths, endOfYear, startOfYear } = require('date-fns');
module.exports = {
    getLeaveProccedData: (req, res) => {
        const body = req.body;
        getLeaveProccedData(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    msge: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    msge: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                msge: results[0]
            });
        });
    },
    inactiveLastYearProcessData: (req, res) => {
        const body = req.body;
        inactiveLastYearProcessData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    updateMessage: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    updateMessage: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                updateMessage: "Data Inactive Successfully"
            });
        });
    },
    checkprocesstable: (req, res) => {
        const body = req.body;
        checkTable(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    },
    insertprocesstable: (req, res) => {
        const body = req.body;
        insertprocesstable(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            else {
                updateprocessslno(body, (err, results) => {
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
            }
        });
    },

    insertcasualleave: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.em_no, value.em_id, value.cl_lv_mnth, value.cl_lv_year,
            value.cl_lv_allowed, value.cl_lv_credit, value.cl_lv_taken, value.lv_process_slno, value.update_user]
        })
        insertcasualleave(a1, (err, results) => {
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
    insertearnleave: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.em_no, value.ernlv_mnth, value.ernlv_year, value.ernlv_allowed,
            value.ernlv_credit, value.ernlv_taken, value.lv_process_slno, value.update_user, value.em_id]
        })
        insertearnleave(a1, (err, results) => {
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
    updateprocess: (req, res) => {
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
    getproceedataByID: (req, res) => {
        const id = req.params.id;
        getdataById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 1,
                    message: err
                });
            }

            else if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Founds"
                });
            }
            else {
                return res.status(200).json({
                    success: 0,
                    data: results
                });
            }
        });
    },
    getholidaylist: (req, res) => {
        getholidaylist((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    insertHoliday: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.em_no, value.hd_slno, value.hl_lv_year, value.hl_date,
            value.hl_lv_credit, value.hl_lv_taken, value.hl_lv_allowed, value.lv_process_slno, value.update_user, value.em_id]
        })
        insertHoliday(a1, (err, results) => {
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
    updatecasualleave: (req, res) => {
        const body = req.body;
        updatecasualleave(body, (err, results) => {
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
    updateholiday: (req, res) => {
        const body = req.body;
        updateholiday(body, (err, results) => {
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
    updateearnleave: (req, res) => {
        const body = req.body;
        updateearnleave(body, (err, results) => {
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
    updatecommon: (req, res) => {
        const body = req.body;
        updatecommon(body, (err, results) => {
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
    insertCommonleave: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.em_no, value.llvetype_slno, value.cmn_lv_allowedflag, value.cmn_lv_allowed,
            value.cmn_lv_taken, value.cmn_lv_balance, value.Iv_process_slno, value.update_user, value.em_id, value.cmn_lv_year]
        })
        insertCommonleave(a1, (err, results) => {
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

    updateholidayupdateslno: (req, res) => {
        const body = req.body;
        updateholidayupdateslno(body, (err, results) => {
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
    updatecasualleaveupdateslno: (req, res) => {
        const body = req.body;
        updatecasualleaveupdateslno(body, (err, results) => {
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
    updateeanleaveupdate: (req, res) => {
        const body = req.body;
        updateeanleaveupdate(body, (err, results) => {
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
    creditCasualLeave: (req, res) => {
        const body = req.body;
        creditCasualLeave(body, (err, results) => {
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
    allowableCasualLeave: (req, res) => {
        const id = req.params.id;
        allowableCasualLeave(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    allowableholiday: (req, res) => {
        const id = req.params.id;
        allowableholiday(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    allowablefesitval: (req, res) => {
        const id = req.params.id;
        allowablefesitval(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }

        });
    },
    allowableearnleave: (req, res) => {
        const id = req.params.id;
        allowableearnleave(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    allowableconleave: (req, res) => {
        const id = req.params.id;
        allowableconleave(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    dataannualcalculation: (req, res) => {
        const body = req.body;
        dataannualcalculation(body, (err, results) => {
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
                data: results
            });
        });
    },
    holidaylistyear: (req, res) => {
        const body = req.body;
        holidaylistyear(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },

    insertyearly: (req, res) => {
        const body = req.body;
        insertyearly(body, (err, results) => {
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
    select_yearlyprocess: (req, res) => {
        const body = req.body;
        select_yearlyprocess(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successStatus: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    successStatus: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                successStatus: 2,
                data: results
            });
        });
    },
    dataannualcalculationEmployee: (req, res) => {
        const body = req.body;
        dataannualcalculationEmployee(body, (err, results) => {
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
                data: results
            });
        });
    },
    creditPrivilegeLeave: (req, res) => {
        const body = req.body;
        creditPrivilegeLeave(body, (err, results) => {
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
                data: results
            });
        })
    },
    inactiveCasualLeave: (req, res) => {
        const body = req.body;
        inactiveCasualLeave(body, (err, results) => {
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
                message: "Inactive Successfully"
            });
        })
    },
    inactiveEarnLeave: (req, res) => {
        const body = req.body;
        inactiveEarnLeave(body, (err, results) => {
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
                message: "Inactive Successfully"
            });
        })
    },
    inactiveHoliday: (req, res) => {
        const body = req.body;
        inactiveHoliday(body, (err, results) => {
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
                message: "Inactive Successfully"
            });
        })
    },
    inactiveCommonLeave: (req, res) => {
        const body = req.body;
        inactiveCommonLeave(body, (err, results) => {
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
                message: "Inactive Successfully"
            });
        })
    },
    getEsiPfDetails: (req, res) => {
        const id = req.params.id;
        getEsiPfDetails(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 1,
                    message: err
                });
            }
            else if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Founds"
                });
            }
            else {
                return res.status(200).json({
                    success: 0,
                    data: results
                });
            }
        });
    },
    getleaveProcessData: (req, res) => {
        const id = req.params.id;
        getleaveProcessData(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 1,
                    message: err
                });
            }

            else if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Founds"
                });
            }
            else {
                return res.status(200).json({
                    success: 0,
                    data: results
                });
            }

        });

    },
    inactiveSickLeave: (req, res) => {
        const { hrm_lv_cmn, em_no,
            cmn_lv_allowedflag,
            Iv_process_slno,
            update_user,
            em_id,
            cmn_lv_year } = req.body
        const startMonth = startOfYear(new Date())
        const result = differenceInDays(new Date(), startMonth)

        const updatedata = {
            hrm_lv_cmn: hrm_lv_cmn
        }
        const postdata = {
            em_no: em_no,
            llvetype_slno: 6,
            cmn_lv_allowedflag,
            cmn_lv_allowed: result,
            cmn_lv_taken: 0,
            cmn_lv_balance: result,
            Iv_process_slno: Iv_process_slno,
            update_user: update_user,
            em_id: em_id,
            cmn_lv_year: cmn_lv_year
        }
        inactiveSickLeave(updatedata, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                insertStatutoryCommonleave(postdata, (err, results) => {
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
            }
        })
    },
    inactiveEsiLeave: (req, res) => {

        const { hrm_lv_cmn, em_no,
            cmn_lv_allowedflag,
            Iv_process_slno,
            update_user,
            em_id,
            cmn_lv_year } = req.body
        const endMonth = endOfYear(new Date())
        const result = differenceInMonths(endMonth, new Date())
        const updatedata = {
            hrm_lv_cmn: hrm_lv_cmn
        }
        const postdata = {
            em_no: em_no,
            llvetype_slno: 7,
            cmn_lv_allowedflag,
            cmn_lv_allowed: result + 1,
            cmn_lv_taken: 0,
            cmn_lv_balance: result + 1,
            Iv_process_slno: Iv_process_slno,
            update_user: update_user,
            em_id: em_id,
            cmn_lv_year: cmn_lv_year
        }
        inactiveSickLeave(updatedata, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                insertSickLeave(postdata, (err, results) => {
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
            }
        })
    },
    updateCommonUpdateSlno: (req, res) => {
        const body = req.body;
        updateCommonUpdateSlno(body, (err, results) => {

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
    getLeavecountbyDate: (req, res) => {
        const body = req.body;
        getLeavecountbyDate(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    data: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getYearlyLeaveCount: (req, res) => {
        const body = req.body;
        getYearlyLeaveCount(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    data: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getYearlyCasualLeaveCount: (req, res) => {
        const body = req.body;
        getYearlyCasualLeaveCount(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    data: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getYearlySickLeaveCount: (req, res) => {
        const body = req.body;
        getYearlySickLeaveCount(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    data: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getYearlyEarnLeaveCount: (req, res) => {
        const body = req.body;
        getYearlyEarnLeaveCount(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    data: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    data: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updatePreviousLeave: async (req, res) => {
        const body = req.body;
        updatecarryforwardSl(body).then(results => {
            updatePreviousLeave(body).then(results => {
                return res.status(200).json({
                    success: 1,
                    messagee: 'Update Successfully'
                });
            }).catch(err => {
                return res.status(200).json({
                    success: 0,
                    messagee: "Error Occured , Please Contact HRD / IT"
                });
            })
        }).catch(err => {
            return res.status(200).json({
                succes: 0,
                messagee: "Error Occured , Please Contact HRD / IT"
            });
        })



    },
    insertPreviousearnLeave: (req, res) => {
        const body = req.body;
        //filter the array inside an array and combine into one array
        const mergedEarnLeaveArray = body.reduce((acc, employee) => {
            return acc.concat(employee.earnLeaveArray);
        }, []);

        updatecarryforwardEl(body).then(results => {
            var a1 = mergedEarnLeaveArray.map((value, index) => {
                return [value.em_no, value.ernlv_mnth, value.ernlv_year, value.ernlv_allowed,
                value.ernlv_credit, value.ernlv_taken, value.lv_process_slno, value.update_user, value.em_id,
                value.credit_status, value.credit_year, value.special_remark]
            })

            insertPreviousearnLeave(a1, (err, results) => {
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
        }).catch(err => {
            return res.status(200).json({
                succes: 0,
                messagee: "Error Occured , Please Contact HRD / IT"
            });
        })
    },

    insertPreviouscasualleave: (req, res) => {
        const body = req.body;
        //filter
        const mergedEarnLeaveArray = body.reduce((acc, employee) => {
            return acc.concat(employee.earnLeaveArray);
        }, []);

        updatecarryforwardCl(body).then(results => {
            var a1 = mergedEarnLeaveArray.map((value, index) => {
                return [value.em_no, value.em_id, value.cl_lv_mnth, value.cl_lv_year,
                value.cl_lv_allowed, value.cl_lv_credit, value.cl_lv_taken, value.lv_process_slno,
                value.update_user, value.special_remark]
            })
            insertPreviouscasualleave(a1, (err, results) => {
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
        }).catch(err => {
            return res.status(200).json({
                succes: 0,
                messagee: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    insertPrevious: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.em_no, value.ernlv_mnth, value.ernlv_year, value.ernlv_allowed,
            value.ernlv_credit, value.ernlv_taken, value.lv_process_slno, value.update_user, value.em_id,
            value.credit_status, value.credit_year, value.special_remark]
        })
        insertPreviousearnLeave(a1, (err, results) => {
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
}
