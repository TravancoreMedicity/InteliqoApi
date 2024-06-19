// @ts-nocheck
const pool = require('../../config/database');
const moment = require('moment');
module.exports = {
    getleaverequestdep: (data, callBack) => {
        pool.query(
            `SELECT 
			leave_slno,
            hrm_leave_request.dept_section,
            lve_uniq_no,
            leave_date,
            hrm_leave_request.em_no,
            dept_name,incapprv_status,
            em_name ,
            inc_apprv_req,
            incapprv_status,
            hod_apprv_req,
            hod_apprv_status,
            hr_aprrv_requ,
            hr_apprv_status,
            ceo_req_status,inc_apprv_cmnt,hod_apprv_cmnt,hr_apprv_cmnt,
            ceo_apprv_status, 
            longleave_spclleave
            FROM hrm_leave_request 
            left join hrm_emp_master on  hrm_leave_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  hrm_leave_request.dept_id =hrm_department.dept_id
            where hrm_leave_request.dept_section IN (?) and  lv_cancel_status=0 and hr_apprv_status=0 and lv_cancel_status_user=0`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getcompenoff: (data, callBack) => {
        pool.query(
            `SELECT cmp_off_reqid,
            shift_id,em_name,
            leave_date,
            comp_off_request.em_dept_section,
            comp_off_request.em_no,
            dept_name,cf_incapprv_status,
            em_name ,
            cf_inc_apprv_req,
            cf_incapprv_status,
            cf_hod_apprv_req,
            cf_hod_apprv_status,cf_hr_apprv_status,cf_hr_aprrv_requ,cf_ceo_req_status,cf_ceo_apprv_status,cf_inc_apprv_cmnt,cf_hod_apprv_cmnt,cf_hr_apprv_cmnt,
             case when cf_incapprv_status=0 then 'Approval Pending' when cf_incapprv_status=1 then 'Incharge Approved'   end as 'status'
            FROM comp_off_request 
            left join hrm_emp_master on  comp_off_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  comp_off_request.em_department =hrm_department.dept_id
            where comp_off_request.em_dept_section IN (?) and lv_cancel_status=0 and cf_hr_apprv_status!=1`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    halfrequst: (data, callBack) => {
        pool.query(
            `SELECT half_slno,planslno,requestdate,dept_name,hrm_halfdayrequest.em_no,em_name,hf_incapprv_status,hrm_halfdayrequest.dept_section, 
            hf_inc_apprv_req,
            hf_incapprv_status,
            hf_hod_apprv_req,
            hf_hod_apprv_status,
            hf_hr_aprrv_requ,
            hf_hr_apprv_status,
            hf_ceo_apprv_status,hf_ceo_req_status
            FROM hrm_halfdayrequest
                        left join hrm_emp_master on  hrm_halfdayrequest.em_no =hrm_emp_master.em_no
                        left join hrm_department on  hrm_halfdayrequest.dept_id =hrm_department.dept_id
                        where hrm_halfdayrequest.dept_section In (?) and lv_cancel_status=0 and hf_hr_apprv_status!=1`,
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
    nopunchreq: (data, callBack) => {
        pool.query(
            `
            SELECT nopunch_slno,plan_slno,shift_id,nopunchrequest.em_no,punslno,dept_name,np_incapprv_status, em_name, 
            np_inc_apprv_req,np_incapprv_status,np_hod_apprv_req,np_hod_apprv_status,np_hr_aprrv_requ,
            np_hr_apprv_status,np_ceo_apprv_status,np_ceo_req_status,nopunchrequest.em_dept_section,
             case when np_incapprv_status=0 then 'Approval Pending' when np_incapprv_status=1 then 'Incharge Approved'   end as 'status'
                        FROM nopunchrequest
                       left join hrm_emp_master on  nopunchrequest.em_no =hrm_emp_master.em_no
                       left join hrm_department on  nopunchrequest.em_department =hrm_department.dept_id
                       where nopunchrequest.em_dept_section IN(?) and lv_cancel_status=0  and np_hr_apprv_status!=1`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    getlevereqmast: (data, callBack) => {
        pool.query(
            `SELECT em_no,
            leave_date,
            leave_slno ,
            lve_uniq_no,
            leavetodate,
            leave_reason,
            no_of_leave,
            hod_apprv_req,
            hod_apprv_status,
            hod_apprv_cmnt,
            hod_apprv_time,
            inc_apprv_req,
            incapprv_status,
            inc_apprv_cmnt,
            ceo_req_status,
            ceo_apprv_status,
             "Leave Request" reqtype FROM hrm_leave_request where leave_slno=?`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getlevereqdetl: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_leave_request_detl WHERE lve_uniq_no = ?`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    gethalfdaydetl: (id, callBack) => {
        pool.query(
            `select hrm_halfdayrequest.em_no,
            em_name,
            requestdate,
            half_slno,
            leavedate,
            month,planslno,
            hf_inc_apprv_req,
            hf_incapprv_status,
            hf_hod_apprv_req,
            hf_hod_apprv_status,hf_hr_apprv_status,
            hf_ceo_req_status,
            hf_ceo_apprv_status,
            checkIn,
            checkOut,
            hf_reason FROM hrm_halfdayrequest 
            inner join hrm_emp_master on  hrm_halfdayrequest.em_no =hrm_emp_master.em_no
			inner join hrm_department on  hrm_halfdayrequest.dept_id =hrm_department.dept_id
            where half_slno=?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getnopunchreq: (data, callBack) => {
        pool.query(
            `SELECT 
            nopunch_slno,
            checkintime,
            checkouttime,
            nopunchdate,
            creteddate,
            checkinflag,
            checkoutflag,np_hr_apprv_status,
            np_reason,punslno,
            np_inc_apprv_req,
            np_incapprv_status,
            nopunchrequest.shift_id,
            hrm_shift_mast.shft_desc,
            shft_chkin_time,
            shft_chkout_time
             FROM nopunchrequest 
             LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno=nopunchrequest.shift_id
             where nopunch_slno=?`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    compensatoryoffdata: (data, callBack) => {
        pool.query(
            `SELECT 
			comp_off_request.em_no,
            em_name,comp_off_request.em_id,
            leave_date,
            cmp_off_reqid,
            durationpunch,
            reqtype_name,cf_hr_apprv_status,
            cf_reason,
            cf_inc_apprv_req,
            cf_incapprv_status,
            reqestdate,
            punchindata,
            punchoutdata
             FROM comp_off_request 
             inner join hrm_emp_master on comp_off_request.em_id=hrm_emp_master.em_id 
             where cmp_off_reqid=?`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    inchargeapprv: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_request 
            SET incapprv_status =?,
            inc_apprv_cmnt=?,
            inc_apprv_time=? ,
            inc_us_code=?
            WHERE leave_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    inchargeapprvhalfday: (data, callBack) => {
        pool.query(
            `UPDATE hrm_halfdayrequest 
            SET hf_incapprv_status =?,
            hf_inc_apprv_cmnt=?,
            hf_inc_apprv_time=? ,
            hf_inc_us_code=?
            WHERE half_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    inchargeapprvNopunch: (data, callBack) => {
        pool.query(
            `UPDATE nopunchrequest 
            SET np_incapprv_status =?,
            np_inc_apprv_cmnt=?,
            np_inc_apprv_time=?, 
            np_inc_us_code=?
            WHERE nopunch_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    inchargeapprvCoff: (data, callBack) => {
        pool.query(
            `UPDATE comp_off_request SET 
            cf_incapprv_status =?,
            cf_inc_apprv_cmnt=?,
            cf_inc_apprv_time=? ,
            cf_inc_us_code=?
            WHERE cmp_off_reqid=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HodApprvlLeave: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_request SET hod_apprv_status =?,
            hod_apprv_cmnt=?,
            hod_apprv_time=? ,
            hod_us_code=?
            WHERE leave_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HodApprvlHalfday: (data, callBack) => {
        pool.query(
            `UPDATE hrm_halfdayrequest
             SET hf_hod_apprv_status =?,
             hf_hod_apprv_cmnt=?,
             hf_hod_apprv_time=? ,
             hf_hod_us_code=?
            WHERE half_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HodApprvlNopunch: (data, callBack) => {
        pool.query(
            `UPDATE nopunchrequest
             SET np_hod_apprv_status =?,
             np_hod_apprv_cmnt=?,
             np_hod_apprv_time=? ,
             np_hod_us_code=?
            WHERE nopunch_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HodApprvlCoff: (data, callBack) => {
        pool.query(
            `UPDATE comp_off_request
             SET cf_hod_apprv_status =?,
             cf_hod_apprv_cmnt=?,
             cf_hod_apprv_time=? ,
             cf_hod_us_code=?
            WHERE cmp_off_reqid=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CEOApprvLeave: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_request
             SET ceo_apprv_status =?,
             ceo_apprv_cmnt=?,
             ceo_apprv_date=? ,
             ceo_us_code=?
            WHERE leave_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CEOHalfDay: (data, callBack) => {
        pool.query(
            `UPDATE hrm_halfdayrequest
             SET hf_ceo_apprv_status =?,
             hf_ceo_apprv_cmnt=?,
             hf_ceo_apprv_date=? ,
             hf_ceo_us_code=?
            WHERE half_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CEONopunch: (data, callBack) => {
        pool.query(
            `UPDATE nopunchrequest
             SET np_ceo_apprv_status =?,
             np_ceo_apprv_cmnt=?,
             np_ceo_apprv_date=? ,
             np_ceo_us_code=?
            WHERE nopunch_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CEOCoff: (data, callBack) => {
        pool.query(
            `UPDATE comp_off_request
             SET cf_ceo_apprv_status =?,
             cf_ceo_apprv_cmnt=?,
             cf_ceo_apprv_date=? ,
             cf_ceo_us_code=?
            WHERE cmp_off_reqid=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //HR APPROVAL LEAVE request
    HRLeaveApprv: (data, callBack) => {
        pool.query(
            `UPDATE 
                hrm_leave_request
             SET 
                hr_apprv_status =?,
                hr_apprv_cmnt =?,
                hr_apprv_date =?,
                hr_uscode =?  
            WHERE lve_uniq_no = ?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HRhalfDay: (data, callBack) => {
        pool.query(
            `UPDATE hrm_halfdayrequest
             SET hf_hr_apprv_status =?,
             hf_hr_apprv_cmnt=?,
             hf_hr_apprv_date=?,
             hf_hr_uscode=?  
            WHERE half_slno=?`,
            [
                data.hf_hr_apprv_status,
                data.hf_hr_apprv_cmnt,
                data.hf_hr_apprv_date,
                data.hf_hr_uscode,
                data.half_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HRhalfDayPuchMast: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
             SET 
             punch_in=?,
             punch_out=?,
             hrs_worked=?,
             late_in=?,
             early_out=?,
             duty_status=?,
             leave_status=1,
             lvereq_desc=?,
             duty_desc = ?,
             lve_tble_updation_flag=1
            WHERE duty_day=? and em_no=?`,
            [
                data.punch_in,
                data.punch_out,
                data.hrs_worked,
                data.late_in,
                data.early_out,
                data.duty_status,
                data.lvereq_desc,
                data.duty_desc,
                data.duty_day,
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
    HRNopunch: (data, callBack) => {

        pool.query(
            `UPDATE nopunchrequest
             SET np_hr_apprv_status =?,
             np_hr_apprv_cmnt=?,
             np_hr_apprv_time=?,
             np_hr_uscode=?  
            WHERE nopunch_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HRCoff: (data, callBack) => {
        pool.query(
            `UPDATE comp_off_request
             SET cf_hr_apprv_status =?,
             cf_hr_apprv_cmnt=?,
             cf_hr_apprv_time=?,
             cf_hr_uscode=?  
            WHERE cmp_off_reqid=?`,
            [
                data.cf_hr_apprv_status,
                data.cf_hr_apprv_cmnt,
                data.cf_hr_apprv_time,
                data.cf_hr_uscode,
                data.cmp_off_reqid,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getlevdetl: (data, callback) => {
        pool.query(
            `SELECT * FROM hrm_leave_request_detl where lve_uniq_no=?`,
            [
                data.lve_uniq_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    //update leave request
    updateLeavePunchMast: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE punch_master
            SET lvreq_type =?,
            leave_type=?,
            sublvreq_type=?,
            duty_status=?,
            duty_worked=?
            WHERE duty_day=? AND em_no=?`,
                    [
                        val.req_type,
                        val.leave,
                        val.leave_subreq,
                        1,
                        1,
                        val.date,
                        val.em_no
                    ],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(results);
                    }
                )
            })
        })
    },
    getHalfdaylevdetl: (data, callback) => {
        pool.query(
            `SELECT * FROM hrm_halfdayrequest where half_slno=?`,
            [
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    //update leave request
    updateHalfdayPunchMast: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE punch_master
                        SET lvreq_type =?,
                            leave_type=?,
                            sublvreq_type=?,
                            duty_status=?,
                            duty_worked=?
                        WHERE duty_day=? AND em_no=?`,
                    [
                        val.req_type,
                        val.leave,
                        val.leave_subreq,
                        1,
                        1,
                        val.date,
                        val.em_no
                    ],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(null, results);
                    }
                )
            })
        })
    },
    getNopunchlevdetl: (data, callback) => {
        pool.query(
            `SELECT * FROM nopunchrequest where nopunch_slno=?`,
            [
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    updateNoPunchPunchMast: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE punch_master
                        SET lvreq_type =?,
                        punch_in=?,
                        duty_status=?,
                        duty_worked=?
                       WHERE duty_day=? AND em_no=?`,
                    [
                        val.req_type,
                        val.punch,
                        1,
                        1,
                        val.date,
                        val.em_no
                    ],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(null, results);
                    }
                )
            })
        })
    },
    getCofflevdetl: (data, callback) => {
        pool.query(
            `SELECT * FROM comp_off_request where cmp_off_reqid=?`,
            [
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    InsertCoffLeaveCalculated: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_leave_calculated
            (     emp_id,
                calculated_date,
                credited_date,
                lvetype_slno,
                credited)
            VALUES (?,?,?,?,?)`,
            [
                data.emp_id,
                data.calculated_date,
                data.calculated_date,
                11,
                1,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateNoPunchOUTPunchMast: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE punch_master
                        SET lvreq_type =?,
                        punch_out=?,
                        duty_status=?,
                        duty_worked=?
                       WHERE duty_day=? AND em_no=?`,
                    [
                        val.req_type,
                        val.punch,
                        val.date,
                        1,
                        1,
                        val.em_no
                    ],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(null, results);
                    }
                )
            })
        })
    },
    //LEAVE CANCEL
    leaveReqCancel: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_request
         SET lv_cancel_status =?,
         lv_cancel_cmnt=?,
         lv_cancel_date=?,
         lv_cancel_us_code=?  
        WHERE leave_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HalfdayCancel: (data, callBack) => {
        pool.query(
            `UPDATE hrm_halfdayrequest
            SET lv_cancel_status =?,
            lv_cancel_cmnt=?,
            lv_cancel_date=?,
            lv_cancel_us_code=? 
        WHERE half_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    NopunchCancel: (data, callBack) => {
        pool.query(
            `UPDATE nopunchrequest
            SET lv_cancel_status =?,
            lv_cancel_cmnt=?,
            lv_cancel_date=?,
            lv_cancel_us_code=?  
        WHERE nopunch_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CoffCancel: (data, callBack) => {
        pool.query(
            `UPDATE comp_off_request
            SET lv_cancel_status =?,
            lv_cancel_cmnt=?,
            lv_cancel_date=?,
            lv_cancel_us_code=?  
        WHERE cmp_off_reqid=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getCeoPending: (callBack) => {
        pool.query(
            `            SELECT 
            ROW_NUMBER() OVER () as rslno,
            leave_slno,
            dept_section,
            hrm_leave_request.lve_uniq_no,
                leave_date,
                hrm_leave_request.em_no,
                dept_name,
                em_name ,
                   sect_name,
                inc_apprv_req,
                incapprv_status,
                hod_apprv_req,
                hr_aprrv_requ,
                hr_apprv_status,
                hr_apprv_cmnt,
                longleave_spclleave,
                leavetodate,
                leave_reason,
                no_of_leave,
                hod_apprv_status,
                hod_apprv_cmnt,
                hod_apprv_time,
                inc_apprv_cmnt,
                ceo_req_status,
                ceo_apprv_status,
                request_date,
                hrm_leave_request.dept_id
                FROM hrm_leave_request 
                inner join hrm_emp_master on  hrm_leave_request.em_no =hrm_emp_master.em_no
                inner join hrm_department on  hrm_leave_request.dept_id =hrm_department.dept_id
                inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
                where  lv_cancel_status=0  and lv_cancel_status_user=0 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getHRpending: (callBack) => {
        pool.query(
            `SELECT leave_slno,dept_section,
            lve_uniq_no,
            leave_date,
            hrm_leave_request.em_no,
            dept_name,incapprv_status,
            em_name ,
            inc_apprv_req,
            incapprv_status,
            hod_apprv_req,
            hod_apprv_status,
            hr_aprrv_requ,
            hr_apprv_status,
            ceo_req_status,inc_apprv_cmnt,hod_apprv_cmnt,hr_apprv_cmnt,
            ceo_apprv_status,
            longleave_spclleave,lv_cancel_status
            FROM hrm_leave_request 
            left join hrm_emp_master on  hrm_leave_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  hrm_leave_request.dept_id =hrm_department.dept_id
            where  lv_cancel_status=0 and hr_aprrv_requ=1 and lv_cancel_status_user=0;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    CeoHalfdayPending: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            half_slno,
            planslno,
            dept_name,
            hrm_halfdayrequest.em_no,
            em_name,
            sect_name,
            hf_incapprv_status,
            dept_section, 
            hf_inc_apprv_req,
            hf_incapprv_status,
            hf_hod_apprv_req,
            hf_hod_apprv_status,
            hf_hr_aprrv_requ,
            hf_hr_apprv_status,
            hf_ceo_apprv_status,
            hf_ceo_req_status,
            requestdate,
            leavedate,
            month,		
            checkIn,
            checkOut,
            hf_reason,
            shift_id,
            halfday_status,
            hrm_halfdayrequest.dept_id
            FROM hrm_halfdayrequest
            inner join hrm_emp_master on  hrm_halfdayrequest.em_no =hrm_emp_master.em_no
            inner join hrm_department on  hrm_halfdayrequest.dept_id =hrm_department.dept_id
			inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  lv_cancel_req_status_user=0 and lv_cancel_status_user=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HRHalfdayPending: (callBack) => {
        pool.query(
            `SELECT half_slno,planslno,requestdate,dept_name,hrm_halfdayrequest.em_no,em_name,
            hf_incapprv_status,dept_section,
            hf_inc_apprv_req,
            hf_incapprv_status,
            hf_hod_apprv_req,
            hf_hod_apprv_status,
            hf_hr_aprrv_requ,
            hf_hr_apprv_status,
            hf_ceo_apprv_status,hf_ceo_req_status
            FROM hrm_halfdayrequest
                        left join hrm_emp_master on  hrm_halfdayrequest.em_no =hrm_emp_master.em_no
                        left join hrm_department on  hrm_halfdayrequest.dept_id =hrm_department.dept_id
                        where  lv_cancel_status=0 and hf_hr_aprrv_requ=1 AND hf_hr_apprv_status=0;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CeoNopunchReq: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            nopunch_slno,
            plan_slno,
            nopunchrequest.shift_id,
            hrm_shift_mast.shft_desc,
            nopunchrequest.em_no,
            punslno,dept_name,
            np_incapprv_status, 
            em_name,
            sect_name,
            nopunchrequest.em_dept_section, 
            np_inc_apprv_req,
            np_incapprv_status,
            np_hod_apprv_req,
            np_hod_apprv_status,
            np_hr_aprrv_requ,
            np_hr_apprv_status,
            np_ceo_apprv_status,
            np_ceo_req_status,
            np_reason,
            nopunchdate,
            checkintime,
            checkouttime,
            checkinflag,
            checkoutflag,
            creteddate,
            nopunchrequest.em_department
            FROM nopunchrequest
            left join hrm_emp_master on  nopunchrequest.em_no =hrm_emp_master.em_no
            left join hrm_department on  nopunchrequest.em_department =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
             LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno=nopunchrequest.shift_id
            where lv_cancel_req_status_user=0 and lv_cancel_status_user=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HrNopunchReq: (callBack) => {
        pool.query(
            `SELECT nopunch_slno,plan_slno,shift_id,nopunchrequest.em_no,punslno,dept_name,np_incapprv_status, em_name,nopunchrequest.em_dept_section, 
            np_inc_apprv_req,np_incapprv_status,np_hod_apprv_req,np_hod_apprv_status,np_hr_aprrv_requ,np_hr_apprv_status,np_ceo_apprv_status,np_ceo_req_status
                        FROM nopunchrequest
                       left join hrm_emp_master on  nopunchrequest.em_no =hrm_emp_master.em_no
                       left join hrm_department on  nopunchrequest.em_department =hrm_department.dept_id
                       where lv_cancel_status=0  and np_hr_apprv_status!=1 and ((np_inc_apprv_req=1 AND np_incapprv_status=1) OR np_inc_apprv_req=0) AND
            ((np_hod_apprv_req=1 AND np_hod_apprv_status=1 )OR np_hod_apprv_req=0) and ((np_ceo_req_status=1 AND np_ceo_apprv_status=1) OR np_ceo_req_status=0) ;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CeoCoffReq: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            cmp_off_reqid,
            shift_id,
			comp_off_request.em_no,
            em_name,
            comp_off_request.em_id,
			comp_off_request.em_dept_section,
			dept_name,
            leave_date,
            sect_name,
            durationpunch,
            reqtype_name,
            cf_reason,
            reqestdate,
            cf_inc_apprv_req,
            cf_incapprv_status,
            cf_hod_apprv_req,
            cf_hod_apprv_status,
            cf_hr_apprv_status,
            cf_hr_aprrv_requ,
            cf_ceo_req_status,
            cf_ceo_apprv_status,
            cf_inc_apprv_cmnt,
            cf_hod_apprv_cmnt,
            cf_hr_apprv_cmnt,
            punchindata,
            punchoutdata,
            comp_off_request.em_department
            FROM comp_off_request 
            left join hrm_emp_master on  comp_off_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  comp_off_request.em_department =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  lv_cancel_status=0 and lv_cancel_status_user=0;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HrCoffReq: (callBack) => {
        pool.query(
            `SELECT cmp_off_reqid,
            shift_id,em_name,comp_off_request.em_dept_section,
            leave_date,
            comp_off_request.em_no,
            dept_name,cf_incapprv_status,
            em_name ,
            cf_inc_apprv_req,
            cf_incapprv_status,
            cf_hod_apprv_req,
            cf_hod_apprv_status,cf_hr_apprv_status,cf_hr_aprrv_requ,cf_ceo_req_status,cf_ceo_apprv_status,cf_inc_apprv_cmnt,cf_hod_apprv_cmnt,cf_hr_apprv_cmnt
            FROM comp_off_request 
            left join hrm_emp_master on  comp_off_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  comp_off_request.em_department =hrm_department.dept_id
            where  lv_cancel_status=0 and cf_hr_aprrv_requ=1 and  cf_hr_apprv_status=0 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //LEAVE CANCEL User
    leaveReqCancelUser: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_request
         SET lv_cancel_status_user =?,
         lv_cancel_cmnt_user=?,
         lv_cancel_date_user=?,
         lv_cancel_us_code_user=?  
        WHERE leave_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HalfdayCancelUser: (data, callBack) => {
        pool.query(
            `UPDATE hrm_halfdayrequest
            SET lv_cancel_status_user=1,
            lv_cancel_req_status_user=1,
            lv_cancel_cmnt_user=?,
            lv_cancel_date_user=?,
            lv_cancel_us_code_user=? 
        WHERE half_slno=?`,
            [
                data.lv_cancel_cmnt,
                data.lv_cancel_date,
                data.lv_cancel_us_code,
                data.half_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    NopunchCancelUser: (data, callBack) => {
        pool.query(
            `UPDATE nopunchrequest
            SET lv_cancel_status_user=1,
            lv_cancel_req_status_user=?,
            lv_cancel_cmnt_user=?,
            lv_cancel_date_user=?,
            lv_cancel_us_code_user=?  
        WHERE nopunch_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CoffCancelUser: (data, callBack) => {
        pool.query(
            `UPDATE comp_off_request
            SET lv_cancel_status_user =?,
            lv_cancel_cmnt_user=?,
            lv_cancel_date_user=?,
            lv_cancel_us_code_user=?  
        WHERE cmp_off_reqid=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
                data.us_code,
                data.slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    AllList: (data, callBack) => {
        pool.query(
            `
            SELECT *, ROW_NUMBER() OVER() ROW_NUM
              FROM (
                    SELECT 
                        hrm_leave_request.em_no, 
                        em_name, 
                        sect_name ,
                        "LR"  typename,
                        1 as reqtype,
                                    inc_apprv_req as increq,
                        incapprv_status as incaprv
                        FROM hrm_leave_request
                        inner join hrm_emp_master on hrm_leave_request.em_no=hrm_emp_master.em_no
                        inner join hrm_dept_section on hrm_leave_request.dept_section=hrm_dept_section.sect_id
                        where hrm_dept_section.sect_id in (?)  and inc_apprv_req=1
                        union all
                       SELECT 
                        hrm_halfdayrequest.em_no, 
                        em_name ,
                        sect_name,
                        "HR"  typename,
                        2 as reqtype,
                        hf_inc_apprv_req as increq,
            hf_incapprv_status as incaprv
                        FROM hrm_halfdayrequest
                        inner join hrm_emp_master on hrm_halfdayrequest.em_no=hrm_emp_master.em_no
                        inner join hrm_dept_section on hrm_halfdayrequest.dept_section=hrm_dept_section.sect_id
                        and hrm_halfdayrequest.dept_section in(1) and hf_inc_apprv_req=1
                        union all
                       SELECT 
            nopunchrequest.em_no,
            em_name ,
            sect_name ,
            "NPR" typename,
             3 as reqtype,
             np_inc_apprv_req as increq,
            np_incapprv_status as incaprv
            FROM nopunchrequest
            inner join hrm_emp_master on nopunchrequest.em_no=hrm_emp_master.em_no
            inner join hrm_dept_section on nopunchrequest.em_dept_section=hrm_dept_section.sect_id
            where nopunchrequest.em_dept_section in (?) and np_inc_apprv_req=1
                        union all
                        SELECT 
            comp_off_request.em_no,
            em_name ,
            sect_name ,
            "COFF" typename,
             4 as reqtype,
             cf_inc_apprv_req as increq,
            cf_incapprv_status as incaprv
            FROM comp_off_request
            inner join hrm_emp_master on comp_off_request.em_no=hrm_emp_master.em_no
            inner join hrm_dept_section on comp_off_request.em_dept_section=hrm_dept_section.sect_id
            where comp_off_request.em_dept_section in (?) and cf_inc_apprv_req=1
                   ) a`,
            [
                data,
                data,
                data,
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
    AllListHOD: (data, callBack) => {
        pool.query(
            `SELECT *, ROW_NUMBER() OVER() ROW_NUM
            FROM (
                  SELECT 
                      hrm_leave_request.em_no, 
                      em_name, 
                      sect_name ,
                      "LR"  typename,
                      1 as reqtype,
                        hod_apprv_req as hod_req,
                      hod_apprv_status as hodaprv
                      FROM hrm_leave_request
                      inner join hrm_emp_master on hrm_leave_request.em_no=hrm_emp_master.em_no
                      inner join hrm_dept_section on hrm_leave_request.dept_section=hrm_dept_section.sect_id
                      where hrm_dept_section.sect_id in (?)  and hod_apprv_req=1
                      union all
                     SELECT 
                      hrm_halfdayrequest.em_no, 
                      em_name ,
                      sect_name,
                      "HR"  typename,
                      2 as reqtype,
          hf_hod_apprv_req as hod_req,
          hf_hod_apprv_status as hodaprv
                      FROM hrm_halfdayrequest
                      inner join hrm_emp_master on hrm_halfdayrequest.em_no=hrm_emp_master.em_no
                      inner join hrm_dept_section on hrm_halfdayrequest.dept_section=hrm_dept_section.sect_id
                      and hrm_halfdayrequest.dept_section in(?) and hf_hod_apprv_req=1
                      union all
                     SELECT 
          nopunchrequest.em_no,
          em_name ,
          sect_name ,
          "NPR" typename,
           3 as reqtype,
          np_hod_apprv_req as hod_req,
          np_hod_apprv_status as hodaprv
          FROM nopunchrequest
          inner join hrm_emp_master on nopunchrequest.em_no=hrm_emp_master.em_no
          inner join hrm_dept_section on nopunchrequest.em_dept_section=hrm_dept_section.sect_id
          where nopunchrequest.em_dept_section in (?) and np_hod_apprv_req=1
                      union all
                      SELECT 
          comp_off_request.em_no,
          em_name ,
          sect_name ,
          "COFF" typename,
           4 as reqtype,
          cf_hod_apprv_req as hod_req,
          cf_hod_apprv_status as hodaprv
          FROM comp_off_request
          inner join hrm_emp_master on comp_off_request.em_no=hrm_emp_master.em_no
          inner join hrm_dept_section on comp_off_request.em_dept_section=hrm_dept_section.sect_id
          where comp_off_request.em_dept_section in (?) and cf_hod_apprv_req=1
                 ) a`,
            [
                data,
                data,
                data,
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
    AllListCeo: (callBack) => {
        pool.query(
            `SELECT *, ROW_NUMBER() OVER() ROW_NUM
            FROM (
                  SELECT 
                      hrm_leave_request.em_no, 
                      em_name, 
                      sect_name ,
                      "LR"  typename,
                      1 as reqtype,
                        ceo_req_status as ceo_req,
                      ceo_apprv_status as ceo_apprv
                      FROM hrm_leave_request
                      inner join hrm_emp_master on hrm_leave_request.em_no=hrm_emp_master.em_no
                      inner join hrm_dept_section on hrm_leave_request.dept_section=hrm_dept_section.sect_id
                      where  ceo_req_status=1
                      union all
                     SELECT 
                      hrm_halfdayrequest.em_no, 
                      em_name ,
                      sect_name,
                      "HR"  typename,
                      2 as reqtype,
           hf_ceo_req_status as ceo_req,
          hf_ceo_apprv_status as ceo_apprv
                      FROM hrm_halfdayrequest
                      inner join hrm_emp_master on hrm_halfdayrequest.em_no=hrm_emp_master.em_no
                      inner join hrm_dept_section on hrm_halfdayrequest.dept_section=hrm_dept_section.sect_id
                      and hf_ceo_req_status=1
                      union all
                     SELECT 
          nopunchrequest.em_no,
          em_name ,
          sect_name ,
          "NPR" typename,
           3 as reqtype,
           np_ceo_req_status as ceo_req,
          np_ceo_apprv_status as ceo_apprv
          FROM nopunchrequest
          inner join hrm_emp_master on nopunchrequest.em_no=hrm_emp_master.em_no
          inner join hrm_dept_section on nopunchrequest.em_dept_section=hrm_dept_section.sect_id
          where np_ceo_req_status=1
                      union all
                      SELECT 
          comp_off_request.em_no,
          em_name ,
          sect_name ,
          "COFF" typename,
           4 as reqtype,
           cf_ceo_req_status as ceo_req,
          cf_ceo_apprv_status as ceo_apprv
          FROM comp_off_request
          inner join hrm_emp_master on comp_off_request.em_no=hrm_emp_master.em_no
          inner join hrm_dept_section on comp_off_request.em_dept_section=hrm_dept_section.sect_id
          where  cf_ceo_req_status=1
                 ) a`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    AllListHr: (callBack) => {
        pool.query(
            `SELECT *, ROW_NUMBER() OVER() ROW_NUM
            FROM (
                  SELECT 
                      hrm_leave_request.em_no, 
                      em_name, 
                      sect_name ,
                      "LR"  typename,
                      1 as reqtype,
                        hr_aprrv_requ as hrreq,
                      hr_apprv_status as hr_apprv
                      FROM hrm_leave_request
                      inner join hrm_emp_master on hrm_leave_request.em_no=hrm_emp_master.em_no
                      inner join hrm_dept_section on hrm_leave_request.dept_section=hrm_dept_section.sect_id
                      where  hr_aprrv_requ=1
                      union all
                     SELECT 
                      hrm_halfdayrequest.em_no, 
                      em_name ,
                      sect_name,
                      "HR"  typename,
                      2 as reqtype,
           hf_hr_aprrv_requ as hrreq,
          hf_hr_aprrv_requ as hr_apprv
                      FROM hrm_halfdayrequest
                      inner join hrm_emp_master on hrm_halfdayrequest.em_no=hrm_emp_master.em_no
                      inner join hrm_dept_section on hrm_halfdayrequest.dept_section=hrm_dept_section.sect_id
                      and hf_hr_aprrv_requ=1
                      union all
                     SELECT 
          nopunchrequest.em_no,
          em_name ,
          sect_name ,
          "NPR" typename,
           3 as reqtype,
           np_hr_aprrv_requ as hrreq,
          np_hr_apprv_status as hr_apprv
          FROM nopunchrequest
          inner join hrm_emp_master on nopunchrequest.em_no=hrm_emp_master.em_no
          inner join hrm_dept_section on nopunchrequest.em_dept_section=hrm_dept_section.sect_id
          where np_hr_aprrv_requ=1
                      union all
                      SELECT 
          comp_off_request.em_no,
          em_name ,
          sect_name ,
          "COFF" typename,
           4 as reqtype,
           cf_hr_aprrv_requ as hrreq,
          cf_hr_apprv_status as hr_apprv
          FROM comp_off_request
          inner join hrm_emp_master on comp_off_request.em_no=hrm_emp_master.em_no
          inner join hrm_dept_section on comp_off_request.em_dept_section=hrm_dept_section.sect_id
          where  cf_hr_aprrv_requ=1
                 ) a`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateCasualLeaveDetlTable: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                        hrm_leave_cl
                    SET cl_lv_taken = 1,
                        cl_bal_leave = 0,
                        hl_lv_tkn_status = 0
                    WHERE hrm_cl_slno = ?`,
                    [
                        data.leave_processid
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updateNationalHolidayDetlTable: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                        hrm_leave_holiday
                    SET hl_lv_taken = 1,
                        hl_lv_tkn_status = 0
                    WHERE hrm_hl_slno = ?`,
                    [
                        data.leave_processid
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updateEarnLeaveDetlTable: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                        hrm_leave_earnlv
                    SET ernlv_taken = 1,
                        hl_lv_tkn_status = 0
                    WHERE hrm_ernlv_slno = ?`,
                    [
                        data.leave_processid
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updateCoffDetlTable: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                        hrm_leave_calculated
                    SET
                        taken = 1,
                        hl_lv_tkn_status = 0
                    WHERE hrm_calc_holiday = ?`,
                    [
                        data.leave_processid
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updatePunchMasterEsi: (body) => {

        //FOR ESI LEAVE
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                            punch_master
                        SET leave_status = 1,
                            lvereq_desc = 'ESI',
                            duty_desc = 'ESI',
                            lve_tble_updation_flag = 1
                        WHERE em_no = ? 
                        AND duty_day = ?`,
                    [
                        data.emno,
                        moment(data.leave_dates).format('YYYY-MM-DD')
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updatePunchMasterlwf: (body) => {
        //FOR LWF
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                            punch_master
                        SET leave_status = 1,
                            lvereq_desc = 'LWP',
                            duty_desc = 'LWP',
                            lve_tble_updation_flag = 1
                        WHERE em_no = ? 
                        AND duty_day = ?`,
                    [
                        data.emno,
                        moment(data.leave_dates).format('YYYY-MM-DD')
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updatePunchMasterLeave: (body) => {

        //FOR LEAVE
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                            punch_master
                        SET leave_status = 1,
                        duty_status=?,
                        lvereq_desc = ?,
                        duty_desc = ?,
                        lve_tble_updation_flag = 1
                        WHERE em_no = ? 
                        AND duty_day = ?`,
                    [
                        data.duty_status,
                        data.lvereq_desc,
                        data.duty_desc,
                        data.emno,
                        data.leave_dates
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    leaveReqRejectHr: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_request
            SET hr_apprv_status =?,
            hr_apprv_cmnt=?,
            hr_apprv_date=?,
            hr_uscode=?,
            request_status=0 
        WHERE lve_uniq_no=?`,
            [
                data.hr_apprv_status,
                data.hr_apprv_cmnt,
                data.hr_apprv_date,
                data.hr_uscode,
                data.lve_uniq_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    leaveReqRejectHrDetl: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_request_detl
            SET leave_status = 0
        WHERE lve_uniq_no=?`,
            [
                data.lve_uniq_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HalfDayReqRejectHr: (data, callBack) => {
        pool.query(
            `UPDATE hrm_halfdayrequest
            SET hf_hr_apprv_status =?,
            hf_hr_apprv_cmnt=?,
            hf_hr_apprv_date=?,
            hf_hr_uscode=?,
            approve=0 
        WHERE half_slno=?`,
            [
                data.hf_hr_apprv_status,
                data.hf_hr_apprv_cmnt,
                data.hf_hr_apprv_date,
                data.hf_hr_uscode,
                data.half_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    HalfDayHrRejectCl: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_cl
            SET cl_lv_taken = cl_lv_taken-0.5,
            cl_bal_leave=cl_bal_leave-0.5,
            hl_lv_tkn_status=0
        WHERE hrm_cl_slno=?`,
            [
                data.hrm_cl_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HRNopunchMasterIn: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET 
            punch_in=?,
             punch_out=?,
             hrs_worked=?,
             late_in=?,
             early_out=?,
            duty_status = ?,
            lvereq_desc = ?,
            duty_desc = ?,
            leave_status=1,
            lve_tble_updation_flag=1
        WHERE punch_slno=?`,
            [
                data.punch_in,
                data.punch_out,
                data.hrs_worked,
                data.late_in,
                data.early_out,
                data.duty_status,
                data.lvereq_desc,
                data.duty_desc,
                data.punch_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HRNopunchMasterOut: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET punch_out =?,
            duty_status = 1,
            lvereq_desc = 'MPP',
            duty_desc = 'MPP',
            lve_tble_updation_flag=1
        WHERE punch_slno=?`,
            [
                data.checkouttime,
                data.punch_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    NoPunchReqRejectHr: (data, callBack) => {
        pool.query(
            `UPDATE nopunchrequest
            SET np_hr_apprv_status =?,
            np_hr_apprv_cmnt=?,
            np_hr_apprv_time=?,
            np_hr_uscode=?,
            apprv_status=0 
        WHERE nopunch_slno=?`,
            [
                data.np_hr_apprv_status,
                data.np_hr_apprv_cmnt,
                data.np_hr_apprv_time,
                data.np_hr_uscode,
                data.nopunch_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CoffReqRejectHr: (data, callBack) => {
        pool.query(
            `UPDATE comp_off_request
            SET cf_hr_apprv_status =?,
            cf_hr_apprv_cmnt=?,
            cf_hr_apprv_time=?,
            cf_hr_uscode=?
              WHERE cmp_off_reqid=?`,
            [
                data.cf_hr_apprv_status,
                data.cf_hr_apprv_cmnt,
                data.cf_hr_apprv_time,
                data.cf_hr_uscode,
                data.cmp_off_reqid
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CoffReqCancelHr: (data, callBack) => {
        pool.query(
            `UPDATE comp_off_request
            SET  lv_cancel_req_status=1,
            lv_cancel_status=1,
            lv_cancel_cmnt =?,
            lv_cancel_date=?,
            lv_cancel_us_code=?          
              WHERE cmp_off_reqid=?`,
            [
                data.lv_cancel_cmnt,
                data.lv_cancel_date,
                data.lv_cancel_us_code,
                data.cmp_off_reqid
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    InsertLeaveCalc: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_leave_calculated(
                emp_id,
                calculated_date,
                credited_date,
                lvetype_slno,
                credited
             
            ) VALUES (?,?,?,?,?)`,
            [
                data.emp_id,
                data.calculated_date,
                data.credited_date,
                data.lvetype_slno,
                1

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CoffCancelHR: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_calculated
            SET credited=0
            WHERE date(calculated_date)=? and emp_id=?`,
            [
                data.calculated_date,
                data.emp_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    NoPunchReqCancelHr: (data, callBack) => {
        pool.query(
            `UPDATE nopunchrequest
            SET  lv_cancel_req_status=1,
            req_status=1,
            lv_cancel_status=1,
            lv_cancel_cmnt =?,
            lv_cancel_date=?,
            lv_cancel_us_code=?          
              WHERE nopunch_slno=?`,
            [
                data.lv_cancel_cmnt,
                data.lv_cancel_date,
                data.lv_cancel_us_code,
                data.nopunch_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    NoPunchMasterCancel: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET punch_out =null,
            punch_in=null,
            lve_tble_updation_flag=0
        WHERE punch_slno=?`,
            [
                data.punch_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HalfDayReqCancelHr: (data, callBack) => {
        pool.query(
            `UPDATE hrm_halfdayrequest
            SET  lv_cancel_req_status=1,
            lv_cancel_status=1,
            lv_cancel_cmnt =?,
            lv_cancel_date=?,
            lv_cancel_us_code=?          
              WHERE half_slno=?`,
            [
                data.lv_cancel_cmnt,
                data.lv_cancel_date,
                data.lv_cancel_us_code,
                data.half_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    lveReqCanclHr: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_request
            SET  
            lv_cancel_status=1,
            lv_cancel_cmnt =?,
            lv_cancel_date=?,
            lv_cancel_us_code=?          
              WHERE lve_uniq_no=?`,
            [
                data.lv_cancel_cmnt,
                data.lv_cancel_date,
                data.lv_cancel_us_code,
                data.lve_uniq_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CancelHolidayLeave: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                    hrm_leave_holiday
                    SET hl_lv_taken = 0,
                        hl_lv_tkn_status = 0
                    WHERE hrm_hl_slno = ?`,
                    [
                        data.leave_processid
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    CancelCasualyLeave: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                        hrm_leave_cl
                    SET cl_lv_taken = 0,
                        cl_bal_leave = 0,
                        hl_lv_tkn_status = 0
                    WHERE hrm_cl_slno = ?`,
                    [
                        data.leave_processid
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    CancelEarnLeave: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                        hrm_leave_earnlv
                    SET ernlv_taken = 0,
                    hl_lv_tkn_status = 0
                    WHERE hrm_ernlv_slno = ?`,
                    [
                        data.leave_processid
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    CancelCoffLeave: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                        hrm_leave_calculated
                    SET
                        taken =0,
                        hl_lv_tkn_status = 0
                    WHERE hrm_calc_holiday = ?`,
                    [
                        data.leave_processid
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    CancelpunchMastEsiLeave: (body) => {
        //FOR ESI LEAVE
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                            punch_master
                        SET leave_status = 0,
                            lvereq_desc = null,
                            duty_desc = 0,
                            lve_tble_updation_flag = 0
                        WHERE em_no = ? 
                        AND duty_day = ?`,
                    [
                        data.emno,
                        moment(data.leave_dates).format('YYYY-MM-DD')
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    CancelpunchMastLwfLeave: (body) => {
        //FOR LWF
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                            punch_master
                        SET leave_status = 1,
                            lvereq_desc = null,
                            duty_desc = null,
                            lve_tble_updation_flag = 1
                        WHERE em_no = ? 
                        AND duty_day = ?`,
                    [
                        data.emno,
                        moment(data.leave_dates).format('YYYY-MM-DD')
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    CancelpunchMastLeave: (body) => {

        //FOR LEAVE
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                            punch_master
                        SET leave_status = 0,
                            lvereq_desc = null,
                            duty_desc = null,
                            lve_tble_updation_flag = 0
                        WHERE em_no = ? 
                        AND duty_day = ?`,
                    [
                        data.emno,
                        moment(data.leave_dates).format('YYYY-MM-DD')
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    CancelCommonLeave: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                    hrm_leave_common
                    SET
                    cmn_lv_taken =cmn_lv_taken-1,
                    cmn_lv_balance =cmn_lv_balance+1
                   
                    WHERE llvetype_slno = ? and em_no=?`,
                    [
                        data.leave_typeid,
                        data.em_no
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    HalfDayHrCancelPunchMast: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET 
            leave_status=0,
            lvereq_desc=null,
            lve_tble_updation_flag=0
           WHERE duty_day=? and em_no=?`,
            [
                data.duty_day,
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
    UpdateHalfdayCasual: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_cl SET hl_lv_tkn_status = 0 WHERE hrm_cl_slno = ?`,
            [
                data.planSlno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateCompFlag: (data, callBack) => {
        pool.query(
            `UPDATE punch_master SET ot_request_flag = 0  WHERE punch_slno = ?`,
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
    empCoffData: (data, callBack) => {
        pool.query(
            `SELECT 
            cmp_off_reqid,
            shift_id,
        	comp_off_request.em_no,
            em_name,
            comp_off_request.em_id,
        	comp_off_request.em_dept_section,
        	dept_name,
            leave_date,
            sect_name,
            durationpunch,
            reqtype_name,
            cf_reason,
            reqestdate,
            cf_inc_apprv_req,
            cf_incapprv_status,
            cf_hod_apprv_req,
            cf_hod_apprv_status,
            cf_hr_apprv_status,
            cf_hr_aprrv_requ,
            cf_ceo_req_status,
            cf_ceo_apprv_status,
            cf_inc_apprv_cmnt,
            cf_hod_apprv_cmnt,
            cf_hr_apprv_cmnt,
            punchindata,
            punchoutdata,
            comp_off_request.em_department
            FROM comp_off_request 
            left join hrm_emp_master on  comp_off_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  comp_off_request.em_department =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  lv_cancel_status=0 and lv_cancel_status_user=0 and comp_off_request.em_id=? order by leave_date DESC`,
            [
                data
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    sectionCoffData: (data, callBack) => {
        pool.query(
            `SELECT 
            comp_off_request.em_id,
            cmp_off_reqid,
            shift_id,
        	comp_off_request.em_no,
            em_name,
            comp_off_request.em_id,
        	comp_off_request.em_dept_section,
        	dept_name,
            leave_date,
            sect_name,
            durationpunch,
            reqtype_name,
            cf_reason,
            reqestdate,
            cf_inc_apprv_req,
            cf_incapprv_status,
            cf_hod_apprv_req,
            cf_hod_apprv_status,
            cf_hr_apprv_status,
            cf_hr_aprrv_requ,
            cf_ceo_req_status,
            cf_ceo_apprv_status,
            cf_inc_apprv_cmnt,
            cf_hod_apprv_cmnt,
            cf_hr_apprv_cmnt,
            punchindata,
            punchoutdata,
            comp_off_request.em_department
            FROM comp_off_request 
            left join hrm_emp_master on  comp_off_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  comp_off_request.em_department =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where lv_cancel_status=0 and lv_cancel_status_user=0 and hrm_emp_master.em_dept_section IN (?) order by leave_date DESC`,
            [
                data.data
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    empMisspunchData: (data, callBack) => {
        pool.query(
            `SELECT 
            nopunch_slno,
            plan_slno,
            nopunchrequest.shift_id,
            hrm_shift_mast.shft_desc,
            nopunchrequest.em_no,
            punslno,dept_name,
            np_incapprv_status, 
            em_name,
            sect_name,
            nopunchrequest.em_dept_section, 
            np_inc_apprv_req,
            np_incapprv_status,
            np_hod_apprv_req,
            np_hod_apprv_status,
            np_hr_aprrv_requ,
            np_hr_apprv_status,
            np_ceo_apprv_status,
            np_ceo_req_status,
            np_reason,
            nopunchdate,
            checkintime,
            checkouttime,
            checkinflag,
            checkoutflag,
            creteddate,
            nopunchrequest.em_department
            FROM nopunchrequest
            left join hrm_emp_master on  nopunchrequest.em_no =hrm_emp_master.em_no
            left join hrm_department on  nopunchrequest.em_department =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
             LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno=nopunchrequest.shift_id
            where lv_cancel_status_user=0 and lv_cancel_status=0 and nopunchrequest.em_id=? order by nopunchdate DESC`,
            [
                data
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    empHalfdayData: (data, callBack) => {
        pool.query(
            `SELECT 
            half_slno,
            planslno,
            dept_name,
            hrm_halfdayrequest.em_no,
            em_name,
            sect_name,
            hf_incapprv_status,
            dept_section, 
            hf_inc_apprv_req,
            hf_incapprv_status,
            hf_hod_apprv_req,
            hf_hod_apprv_status,
            hf_hr_aprrv_requ,
            hf_hr_apprv_status,
            hf_ceo_apprv_status,
            hf_ceo_req_status,
            requestdate,
            leavedate,
            month,		
            checkIn,
            checkOut,
            hf_reason,
            hrm_halfdayrequest.dept_id
            FROM hrm_halfdayrequest
            inner join hrm_emp_master on  hrm_halfdayrequest.em_no =hrm_emp_master.em_no
            inner join hrm_department on  hrm_halfdayrequest.dept_id =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where lv_cancel_status=0 and lv_cancel_status_user=0 and hrm_halfdayrequest.emp_id=? order by leavedate DESC`,
            [
                data
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    empLeaveData: (data, callBack) => {
        pool.query(
            `SELECT 
            leave_slno,
            dept_section,
            hrm_leave_request.lve_uniq_no,
                leave_date,
                hrm_leave_request.em_no,
                dept_name,
                em_name ,
                   sect_name,
                inc_apprv_req,
                incapprv_status,
                hod_apprv_req,
                hr_aprrv_requ,
                hr_apprv_status,
                hr_apprv_cmnt,
                longleave_spclleave,
                leavetodate,
                leave_reason,
                no_of_leave,
                hod_apprv_status,
                hod_apprv_cmnt,
                hod_apprv_time,
                inc_apprv_cmnt,
                ceo_req_status,
                ceo_apprv_status,
                request_date,
                hrm_leave_request.dept_id
                FROM hrm_leave_request 
                inner join hrm_emp_master on  hrm_leave_request.em_no =hrm_emp_master.em_no
                inner join hrm_department on  hrm_leave_request.dept_id =hrm_department.dept_id
                inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
                where  lv_cancel_status=0  and lv_cancel_status_user=0 and hrm_leave_request.em_id=?
                order by leave_date DESC`,
            [
                data
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    sectionLeaveData: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_leave_request.em_id,
            leave_slno,
            dept_section,
            hrm_leave_request.lve_uniq_no,
            leave_date,
            hrm_leave_request.em_no,
            dept_name,
            em_name ,
            sect_name,
            inc_apprv_req,
            incapprv_status,
            hod_apprv_req,
            hr_aprrv_requ,
            hr_apprv_status,
            hr_apprv_cmnt,
            longleave_spclleave,
            leavetodate,
            leave_reason,
            no_of_leave,
            hod_apprv_status,
            hod_apprv_cmnt,
            hod_apprv_time,
            inc_apprv_cmnt,
            ceo_req_status,
            ceo_apprv_status,
            request_date,
            hrm_leave_request.dept_id
            FROM hrm_leave_request 
            inner join hrm_emp_master on  hrm_leave_request.em_no =hrm_emp_master.em_no
            inner join hrm_department on  hrm_leave_request.dept_id =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  lv_cancel_status=0  and lv_cancel_status_user=0 and hrm_leave_request.dept_section IN (?)`,
            [
                data.sectIds
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    sectionHalfdayData: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_halfdayrequest.emp_id,
            half_slno,
            planslno,
            dept_name,
            hrm_halfdayrequest.em_no,
            em_name,
            sect_name,
            hf_incapprv_status,
            dept_section, 
            hf_inc_apprv_req,
            hf_incapprv_status,
            hf_hod_apprv_req,
            hf_hod_apprv_status,
            hf_hr_aprrv_requ,
            hf_hr_apprv_status,
            hf_ceo_apprv_status,
            hf_ceo_req_status,
            requestdate,
            leavedate,
            month,		
            checkIn,
            checkOut,
            hf_reason,
            hrm_halfdayrequest.dept_id
            FROM hrm_halfdayrequest
            inner join hrm_emp_master on  hrm_halfdayrequest.em_no =hrm_emp_master.em_no
            inner join hrm_department on  hrm_halfdayrequest.dept_id =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where lv_cancel_req_status_user=0 and lv_cancel_status_user=0 and hrm_halfdayrequest.dept_section IN (?)`,
            [
                data.sectIds
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result);
            }
        )
    },
    sectionMisspunchData: (data, callBack) => {

        pool.query(
            `SELECT 
            nopunchrequest.em_id,
            nopunch_slno,
            plan_slno,
            nopunchrequest.shift_id,
            hrm_shift_mast.shft_desc,
            nopunchrequest.em_no,
            punslno,dept_name,
            np_incapprv_status, 
            em_name,
            sect_name,
            nopunchrequest.em_dept_section, 
            np_inc_apprv_req,
            np_incapprv_status,
            np_hod_apprv_req,
            np_hod_apprv_status,
            np_hr_aprrv_requ,
            np_hr_apprv_status,
            np_ceo_apprv_status,
            np_ceo_req_status,
            np_reason,
            nopunchdate,
            checkintime,
            checkouttime,
            checkinflag,
            checkoutflag,
            creteddate,
            nopunchrequest.em_department
            FROM nopunchrequest
            left join hrm_emp_master on  nopunchrequest.em_no =hrm_emp_master.em_no
            left join hrm_department on  nopunchrequest.em_department =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
             LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno=nopunchrequest.shift_id
            where lv_cancel_req_status_user=0 and lv_cancel_status_user=0 and nopunchrequest.em_dept_section IN (?)`,
            [
                data.sectIds
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