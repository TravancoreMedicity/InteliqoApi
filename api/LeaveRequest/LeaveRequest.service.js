const pool = require('../../config/database');
const moment = require('moment')
module.exports = {
    createmastleave: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_leave_request 
                (
                    lve_uniq_no,
                    em_id,
                    em_no,
                    dept_id,
                    dept_section,
                    leave_date,
                    leavetodate,
                    rejoin_date,
                    request_status,
                    inc_apprv_req,
                    incapprv_status,
                    inc_apprv_cmnt,
                    inc_apprv_time,
                    hod_apprv_req,
                    hod_apprv_status,
                    hod_apprv_cmnt,
                    hod_apprv_time,
                    hr_aprrv_requ,
                    ceo_req_status,
                    leave_reason,
                    no_of_leave
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.leaveid,
                data.em_id,
                data.em_no,
                data.em_department,
                data.em_dept_section,
                data.leavefrom_date,
                data.leavetodate,
                data.rejoin_date,
                data.request_status,
                data.inc_apprv_req,
                data.incapprv_status,
                data.inc_apprv_cmnt,
                data.inc_apprv_time,
                data.hod_apprv_req,
                data.hod_apprv_status,
                data.hod_apprv_cmnt,
                data.hod_apprv_time,
                data.hr_aprrv_requ,
                data.ceo_req_status,
                data.resonforleave,
                data.no_of_leave
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createdetlleave: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_leave_request_detl (
                lve_uniq_no,
                leave_dates,
                leave_processid,
                leave_typeid,
                leave_status,
                leavetype_name,                
                leave_name,
                no_days,
                sl_leave
                )
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateserialnum: (callBack) => {
        pool.query(
            `update master_serialno set serial_current=serial_current+1 where serial_slno=5`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    gethafdayshift: (data, callBack) => {
        pool.query(
            `SELECT 
                plan_slno,
                emp_id,
                hrm_duty_plan.shift_id,
                shft_desc,
                shft_chkin_time,
                shft_chkout_time,
                first_half_in,
                first_half_out,
                second_half_in,
                second_half_out
            FROM hrm_duty_plan
            LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno = hrm_duty_plan.shift_id 
            WHERE duty_day= ? AND emp_id=?`,
            [data.startDate, data.em_id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    getfirsthalf: (callBack) => {
        pool.query(
            `SELECT first_half_in,first_half_out FROM hrm_shift_mast where shft_slno=1;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getsecondhalf: (callBack) => {
        pool.query(
            `SELECT second_half_in,second_half_out FROM hrm_shift_mast where shft_slno=1;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    inserthalfdayreque: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_halfdayrequest(
                checkIn,
                checkOut,
                leavedate,
                planslno,
                approve,
                month,
                emp_id,
                shift_id,
                em_no,
                dept_id,
                dept_section,
                hf_reason,
                hf_inc_apprv_req,
                hf_incapprv_status,
                hf_inc_apprv_cmnt,
                hf_inc_apprv_time,
                hf_hod_apprv_req,
                hf_hod_apprv_status,
                hf_hod_apprv_cmnt,
                hf_hod_apprv_time,
                hf_hr_aprrv_requ,
                hf_ceo_req_status
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.checkIn,
                data.checkOut,
                data.leavedate,
                data.planslno,
                1,
                data.month,
                data.em_id,
                data.shiftid,
                data.em_no,
                data.em_department,
                data.em_dept_section,
                data.resonforleave,
                data.inc_apprv_req,
                data.incapprv_status,
                data.inc_apprv_cmnt,
                data.inc_apprv_time,
                data.hod_apprv_req,
                data.hod_apprv_status,
                data.hod_apprv_cmnt,
                data.hod_apprv_time,
                data.hr_aprrv_requ,
                data.ceo_req_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    insertnopunchrequest: (data, callBack) => {
        pool.query(
            `INSERT INTO nopunchrequest (
                checkinflag,
                checkintime, 
                checkoutflag, 
                checkouttime,
                nopunchdate,
                plan_slno,
                shift_id, 
                apprv_status, 
                req_status,
                crted_user, 
                em_id, 
                em_no,
                em_department,
                em_dept_section,
                punslno,
                np_inc_apprv_req,
                np_incapprv_status,
                np_inc_apprv_cmnt,
                np_inc_apprv_time,
                np_hod_apprv_req,
                np_hod_apprv_status,
                np_hod_apprv_cmnt,
                np_hod_apprv_time,
                np_hr_aprrv_requ,
                np_ceo_req_status,
                np_reason
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.checkinflag,
                data.checkintime,
                data.checkoutflag,
                data.checkouttime,
                data.nopunchdate,
                data.plan_slno,
                data.shift_id,
                1,
                0,
                data.crted_user,
                data.em_id,
                data.em_no,
                data.em_department,
                data.em_dept_section,
                data.punch_slno,
                data.inc_apprv_req,
                data.incapprv_status,
                data.inc_apprv_cmnt,
                data.inc_apprv_time,
                data.hod_apprv_req,
                data.hod_apprv_status,
                data.hod_apprv_cmnt,
                data.hod_apprv_time,
                data.hr_aprrv_requ,
                data.ceo_req_status,
                data.resonforleave
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    insertcompensatyoff: (data, callBack) => {
        pool.query(
            `INSERT INTO comp_off_request (
                punchindata,
                punchoutdata,
                req_type,
                reqtype_name, 
                durationpunch,
                shiftduration, 
                extratime,
                request_status,
                leave_date,
                em_id,
                em_no,
                em_department,
                em_dept_section,
                shift_id,
                cf_inc_apprv_req,
                cf_incapprv_status,
                cf_inc_apprv_cmnt,
                cf_inc_apprv_time,
                cf_hod_apprv_req,
                cf_hod_apprv_status,
                cf_hod_apprv_cmnt,
                cf_hod_apprv_time,
                cf_hr_aprrv_requ,
                cf_hr_apprv_status,
                cf_hr_apprv_cmnt,
                cf_hr_uscode,
                cf_hr_apprv_time,
                cf_ceo_req_status,
                cf_reason
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.punchindata,
                data.punchoutdata,
                data.req_type,
                data.reqtype_name,
                data.durationpunch,
                data.shiftduration,
                data.extratime,
                1,
                data.startdate,
                data.em_id,
                data.em_no,
                data.em_department,
                data.em_dept_section,
                data.shift_id,
                data.inc_apprv_req,
                data.incapprv_status,
                data.inc_apprv_cmnt,
                data.inc_apprv_time,
                data.hod_apprv_req,
                data.hod_apprv_status,
                data.hod_apprv_cmnt,
                data.hod_apprv_time,
                data.hr_aprrv_requ,
                data.hr_apprv_status,
                data.hr_apprv_cmnt,
                data.hr_user,
                data.hr_apprv_time,
                data.ceo_req_status,
                data.resonforleave
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getLeaveCancelEmpdetl: (id, callBack) => {
        pool.query(
            `call LEAVE_CANCEL_EMPDETL(?); `,
            [
                id
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    getPunchMasterSlno: (data, callBack) => {
        pool.query(
            `SELECT 
            holiday_status,
                punch_slno
            FROM punch_master
            WHERE emp_id=? AND duty_day = ?`,
            [
                data.em_id,
                data.date
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    checkMispunchRequest: (data, callBack) => {
        pool.query(
            `SELECT 
                nopunch_slno
            FROM nopunchrequest
            WHERE em_id=? AND month(nopunchdate) = month(?) AND req_status = 0 and (np_incapprv_status!=2 and np_hod_apprv_status!=2 and np_hr_apprv_status!=2 and lv_cancel_status!=1 and lv_cancel_status_user!=1)`,
            [
                data.em_id,
                data.date
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    updatePunchSlno: (data, callBack) => {
        pool.query(
            `UPDATE punch_master SET ot_request_flag = 1  WHERE punch_slno = ?`,
            [
                data.punchSlno,
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    getLeaveCount: (data, callBack) => {
        pool.query(
            `SELECT 
            COUNT(leave_slno) CNT
        FROM hrm_leave_request R
        INNER JOIN hrm_leave_request_detl D ON D.lve_uniq_no = R.lve_uniq_no AND R.em_no = ?
        WHERE D.leave_dates BETWEEN ? AND ? and (incapprv_status!=2 and hod_apprv_status!=2 and hr_apprv_status!=2 and lv_cancel_status!=1 and lv_cancel_status_user!=1)`,
            [
                data.em_no,
                data.fromDate,
                data.toDate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateCommonLeave: (data, callBack) => {
        try {
            data?.map((e) => {
                pool.query(
                    `UPDATE hrm_leave_common 
                        SET cmn_lv_balance = cmn_lv_balance - ?,
                        cmn_lv_taken = cmn_lv_taken + ?
                    WHERE llvetype_slno = ? AND em_no = ?`,
                    [
                        e.count,
                        e.count,
                        e.type,
                        e.em_no
                    ],
                    (error, results, feilds) => {
                        return error;
                    }
                )
            })
        } catch (error) {
            return callBack(error);
        }

    },
    updateCasualLeave: (data, callBack) => {
        try {
            data?.map((e) => {
                pool.query(
                    `UPDATE hrm_leave_cl SET hl_lv_tkn_status = 1 WHERE hrm_cl_slno = ?`,
                    [
                        e.caulmnth,
                    ],
                    (error, results, feilds) => {
                        return error;
                    }
                )
            })
        } catch (error) {
            return callBack(error);
        }
    },
    updateNationalHoliday: (data, callBack) => {
        try {
            data?.map((e) => {
                pool.query(
                    `UPDATE hrm_leave_holiday SET hl_lv_tkn_status = 1 WHERE hrm_hl_slno = ?`,
                    [
                        e.caulmnth,
                    ],
                    (error, results, feilds) => {
                        return error;
                    }
                )
            })
        } catch (error) {
            return callBack(error);
        }
    },
    updateEarnLeave: (data, callBack) => {
        try {
            data?.map((e) => {
                pool.query(
                    `UPDATE hrm_leave_earnlv SET hl_lv_tkn_status = 1 WHERE hrm_ernlv_slno = ?`,
                    [
                        e.caulmnth,
                    ],
                    (error, results, feilds) => {
                        return error;
                    }
                )
            })
        } catch (error) {
            return callBack(error);
        }
    },
    updateCompansatoryOff: (data, callBack) => {
        try {
            data?.map((e) => {
                pool.query(
                    `UPDATE hrm_leave_calculated SET hl_lv_tkn_status = 1 WHERE hrm_calc_holiday = ?`,
                    [
                        e.caulmnth,
                    ],
                    (error, results, feilds) => {
                        return error;
                    }
                )
            })
        } catch (error) {
            return callBack(error);
        }
    },
    halfDayRequestCheck: (data, callBack) => {
        pool.query(
            `SELECT half_slno FROM hrm_halfdayrequest 
            WHERE leavedate = ? AND em_no = ? and (hf_incapprv_status!=2 and hf_hod_apprv_status!=2 and hf_hr_apprv_status!=2 and lv_cancel_status!=1 and lv_cancel_status_user!=1)`,
            [
                moment(data.leavedate).format('YYYY-MM-DD'),
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateHaldayValueInTable: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_cl 
            SET cl_lv_taken = CASE 
                    WHEN (cl_lv_taken = 0.5 AND hl_lv_tkn_status = 0) THEN 1 
                    WHEN (cl_lv_taken = 0 AND hl_lv_tkn_status = 0)THEN 0.5 ELSE cl_lv_taken END,
                cl_bal_leave = CASE 
                    WHEN (cl_bal_leave = 0.5 AND hl_lv_tkn_status = 0) THEN 0
                    WHEN (cl_bal_leave = 0 AND hl_lv_tkn_status = 0)THEN 0.5 ELSE cl_lv_taken END,
                hl_lv_tkn_status = CASE 
                    WHEN (cl_bal_leave = 0 AND cl_lv_taken = 1 AND hl_lv_tkn_status = 0) THEN 1 
                     WHEN (cl_bal_leave = 0.5 AND cl_lv_taken = 0.5 AND hl_lv_tkn_status = 0) THEN 1
                    ELSE 0 END
        WHERE hrm_cl_slno = ? `,
            [
                data.planslno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkPunchMarkingHR: (data, callBack) => {
        pool.query(
            `SELECT 
                    last_update_date
                FROM punchmarking_hr 
                WHERE marking_month = ? AND deptsec_slno = ?`,
            [
                data.month,
                data.section
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, JSON.stringify(results));
            }
        )
    },
    leaveRequestUniquNumer: () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT serial_current FROM master_serialno where serial_slno=5`,
                [],
                (error, results, fields) => {
                    if (error) {
                        reject({ status: 0, data: [], error });
                    } else {
                        resolve({ status: 1, data: JSON.parse(JSON.stringify(results)) });
                    }
                }
            );
        }).then((result) => {
            // console.log('Query successful:', result.data[0].serial_current);
            return { status: 1, data: result.data[0].serial_current }; // Forward the result to the next .then() handler
        }).catch((error) => {
            // console.error('Error during query:', error);
            throw error; // Rethrow the error for further handling
        });
    },
    saveLeaveRequestMasterTable: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO hrm_leave_request 
                    (
                        lve_uniq_no,
                        em_id,
                        em_no,
                        dept_id,
                        dept_section,
                        leave_date,
                        leavetodate,
                        rejoin_date,
                        request_status,
                        inc_apprv_req,
                        incapprv_status,
                        inc_apprv_cmnt,
                        inc_apprv_time,
                        hod_apprv_req,
                        hod_apprv_status,
                        hod_apprv_cmnt,
                        hod_apprv_time,
                        hr_aprrv_requ,
                        ceo_req_status,
                        leave_reason,
                        no_of_leave,
                        inc_us_code,
                        hod_us_code
                    )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    data.leaveid,
                    data.em_id,
                    data.em_no,
                    data.em_department,
                    data.em_dept_section,
                    data.leavefrom_date,
                    data.leavetodate,
                    data.rejoin_date,
                    data.request_status,
                    data.inc_apprv_req,
                    data.incapprv_status,
                    data.inc_apprv_cmnt,
                    data.inc_apprv_time,
                    data.hod_apprv_req,
                    data.hod_apprv_status,
                    data.hod_apprv_cmnt,
                    data.hod_apprv_time,
                    data.hr_aprrv_requ,
                    data.ceo_req_status,
                    data.resonforleave,
                    data.no_of_leave,
                    data.inc_usCode,
                    data.hod_usCOde
                ],
                (error, results, feilds) => {
                    if (error) {
                        return reject({ status: 0, message: error });
                    }
                    return resolve({ status: 1, message: 'success' });
                }
            )
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error)
            return ({ status: 0, message: error })
        });
    },
    saveDetailedTableFun: async (data) => {//INSERTING DETAILED TABLE LEAVE REQUEST
        const promises = data?.map((e) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `INSERT INTO hrm_leave_request_detl (
                        lve_uniq_no,
                        leave_dates,
                        leave_processid,
                        leave_typeid,
                        leave_status,
                        leavetype_name,                
                        leave_name,
                        no_days,
                        sl_leave
                    )
                    VALUES (?)`,
                    [e],
                    (error, results, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });
        });

        try {
            const result = await Promise.all(promises);
            // console.log('Inserted records:', result);
            return { status: 1, message: 'success' };
        } catch (error) {
            return { status: 0, message: error };
        }
    },
    cancelLeaveReqMasterTable: async (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_leave_request
                    SET lv_cancel_status = 1,
                        lv_cancel_cmnt= 'error insert detl table',
                        lv_cancel_date= NOW(),
                        lv_cancel_us_code= ?
                WHERE lve_uniq_no = ?`,
                [
                    data.em_no,
                    data.leaveid,
                ],
                (error, results, fields) => {
                    if (error) {
                        reject({ status: 0 });
                    } else {
                        resolve({ status: 1 });
                    }
                }
            );
        }).then((result) => {
            return { status: 1 };
        }).catch((error) => {
            return { status: 0, data: error };
        });
    },
    getLeaveExcistOrNot: (data, callBack) => {
        pool.query(
            `SELECT SUM(count) count
                FROM(
                SELECT 
                    count(*) count 
                FROM hrm_leave_request 
                WHERE leavetodate >= ? AND leavetodate <= ? 
                AND em_no = ? 
                AND lv_cancel_status = 0 
                AND lv_cancel_status_user = 0
                AND incapprv_status=0
                AND hod_apprv_status=0
                UNION ALL
                SELECT 
                    count(*) count 
                FROM hrm_leave_request 
                WHERE leave_date >= ? AND leave_date <= ? 
                AND em_no = ? 
                AND lv_cancel_status = 0 
                AND lv_cancel_status_user = 0
                AND incapprv_status=0
                AND hod_apprv_status=0) A`,
            [
                data.fromDate,
                data.toDate,
                data.em_no,
                data.fromDate,
                data.toDate,
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}