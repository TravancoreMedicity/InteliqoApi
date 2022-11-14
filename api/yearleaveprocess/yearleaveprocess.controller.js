const {
    checkTable, insertprocesstable, update, getdataById, insertcasualleave,
    getholidaylist, insertHoliday, updatecasualleave, updateholiday,
    updateprocessslno, insertCommonleave, updatecommon, insertearnleave,
    updateearnleave, updateholidayupdateslno, updatecasualleaveupdateslno,
    updateeanleaveupdate, creditCasualLeave, allowableCasualLeave,
    allowableholiday, allowablefesitval, allowableearnleave, allowableconleave,
    dataannualcalculation, holidaylistyear, insertyearly, select_yearlyprocess,
    dataannualcalculationEmployee
} = require('../yearleaveprocess/yearllraveprocess.service');
const logger = require('../../logger/logger')
module.exports = {
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
            if (results.length == 0) {
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
    allowableconleave: (req, res) => {

        const body = req.body;
        allowableconleave(body, (err, results) => {


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
}











