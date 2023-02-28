const { createAttendanceMarking, checkInsertVal, checkAttendanceMarking,
    attendanceMarkingSaveContract } = require('../attendance_marking_save/attendance_marking_save.service');
const logger = require('../../logger/logger')
module.exports = {
    createAttendanceMarking: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.em_id, value.em_no, value.attendance_marking_month, value.attnd_mark_startdate, value.attnd_mark_enddate,
            value.total_working_days, value.tot_days_present,
            value.total_leave, value.total_lop, value.total_days, value.contract_renew_date, value.updated_user]
        })
        var a2 = body.map((value, index) => {
            return { em_id: value.em_id, month: value.attendance_marking_month }
        })
        checkInsertVal(a2, (err, results) => {
            logger.errorLogger(err)
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                createAttendanceMarking(a1, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated Successfully"
                    });

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Attendance Marking Already Processed"
                })
            }
        })
    },
    checkAttendanceMarking: (req, res) => {
        const body = req.body;
        checkAttendanceMarking(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                dataa: 1
            });
        });
    },
    attendanceMarkingSaveContract: (req, res) => {
        const body = req.body;
        attendanceMarkingSaveContract(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                dataa: results
            });
        });
    },
}