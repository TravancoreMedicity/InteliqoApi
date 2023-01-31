const pool = require('../../config/database');
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
                    rejoin_date,
                    request_status,
                    leavetodate,
                    inc_apprv_req,
                    hod_apprv_req,
                    hr_aprrv_requ,
                    ceo_req_status,
                    longleave_spclleave,
                    leave_reason
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.leaveid,
                data.em_id,
                data.em_no,
                data.em_department,
                data.em_dept_section,
                data.leavefrom_date,
                data.rejoin_date,
                data.request_status,
                data.leavetodate,
                data.incharge_level,
                data.hod_level,
                1,
                data.ceo_level,
                data.leavdaystype,
                data.resonforleave,
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
            `SELECT plan_slno,emp_id,hrm_duty_plan.shift_id,shft_desc,shft_chkin_time,shft_chkout_time FROM medi_hrm.hrm_duty_plan
            left join hrm_shift_mast on hrm_shift_mast.shft_slno=hrm_duty_plan.shift_id 
             where duty_day= ? and emp_id=?`,
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
            `SELECT first_half_in,first_half_out FROM medi_hrm.hrm_shift_mast where shft_slno=1;`,
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
            `SELECT second_half_in,second_half_out FROM medi_hrm.hrm_shift_mast where shft_slno=1;`,
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
            `INSERT INTO hrm_halfdayrequest (
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
                hf_inc_apprv_req,
                hf_hod_apprv_req,
                hf_hr_aprrv_requ,
                hf_ceo_req_status,
                hf_reason
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.incharge_level,
                data.hod_level,
                1,
                data.ceo_level,
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
                np_hod_apprv_req,
                np_hr_aprrv_requ,
                np_ceo_req_status,
                np_reason
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.incharge_level,
                data.hod_level,
                1,
                data.ceo_level,
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
                cf_hod_apprv_req,
                cf_hr_aprrv_requ,
                cf_ceo_req_status,
                cf_reason

                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.incharge_level,
                data.hod_level,
                1,
                data.ceo_level,
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
            `call medi_hrm.LEAVE_CANCEL_EMPDETL(?); `,
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




}