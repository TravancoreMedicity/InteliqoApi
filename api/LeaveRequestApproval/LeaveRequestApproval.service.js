const pool = require('../../config/database');
module.exports = {
    getleaverequestdep: (data, callBack) => {
        pool.query(
            `SELECT leave_slno,
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
            FROM medi_hrm.hrm_leave_request 
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
            cf_hod_apprv_status,cf_hr_apprv_status,cf_hr_aprrv_requ,cf_ceo_req_status,cf_ceo_apprv_status,cf_inc_apprv_cmnt,cf_hod_apprv_cmnt,cf_hr_apprv_cmnt
            FROM medi_hrm.comp_off_request 
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
                        FROM medi_hrm.hrm_halfdayrequest
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
            `SELECT nopunch_slno,plan_slno,shift_id,nopunchrequest.em_no,punslno,dept_name,np_incapprv_status, em_name, 
            np_inc_apprv_req,np_incapprv_status,np_hod_apprv_req,np_hod_apprv_status,np_hr_aprrv_requ,
            np_hr_apprv_status,np_ceo_apprv_status,np_ceo_req_status,nopunchrequest.em_dept_section
                        FROM medi_hrm.nopunchrequest
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
             "Leave Request" reqtype FROM medi_hrm.hrm_leave_request where leave_slno=?`,
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
            `SELECT leave_dates,
             leavetype_name,
             leave_name 
             FROM hrm_leave_request_detl,
             hrm_leave_request 
             where hrm_leave_request_detl.lve_uniq_no=hrm_leave_request.lve_uniq_no AND leave_slno=?`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    gethalfdaydetl: (data, callBack) => {
        pool.query(
            `SELECT em_no,
            requestdate,
            half_slno,
            leavedate,
            month,
            hf_reason FROM medi_hrm.hrm_halfdayrequest where half_slno=?`,
            [data],
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
            `SELECT nopunch_slno,checkintime,
            checkouttime,nopunchdate,
            creteddate,checkinflag,
            checkoutflag,np_reason
             FROM medi_hrm.nopunchrequest 
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
            `SELECT leave_date,cmp_off_reqid,
            durationpunch,reqtype_name,cf_reason
             FROM medi_hrm.comp_off_request 
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
            `UPDATE hrm_leave_request SET incapprv_status =?,
            inc_apprv_cmnt=?,
            inc_apprv_time=? 
            WHERE leave_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
            hf_inc_apprv_time=? 
            WHERE half_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
            `UPDATE nopunchrequest SET np_incapprv_status =?,
            np_inc_apprv_cmnt=?,
            np_inc_apprv_time=? 
            WHERE nopunch_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
            cf_inc_apprv_time=? 
            WHERE cmp_off_reqid=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
            hod_apprv_time=? 
            WHERE leave_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
            hf_hod_apprv_time=? 
            WHERE half_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
             np_hod_apprv_time=? 
            WHERE nopunch_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
             cf_hod_apprv_time=? 
            WHERE cmp_off_reqid=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
             ceo_apprv_date=? 
            WHERE leave_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
             hf_ceo_apprv_date=? 
            WHERE half_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
             np_ceo_apprv_date=? 
            WHERE nopunch_slno=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
             cf_ceo_apprv_date=? 
            WHERE cmp_off_reqid=?`,
            [
                data.status,
                data.comment,
                data.apprvdate,
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
            `UPDATE hrm_leave_request
             SET hr_apprv_status =?,
             hr_apprv_cmnt=?,
             hr_apprv_date=?,
             hr_uscode=?  
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
    HRhalfDay: (data, callBack) => {
        pool.query(
            `UPDATE hrm_halfdayrequest
             SET hf_hr_apprv_status =?,
             hf_hr_apprv_cmnt=?,
             hf_hr_apprv_date=?,
             hf_hr_uscode=?  
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
    HRCoff: (data, callBack) => {
        pool.query(
            `UPDATE comp_off_request
             SET cf_hr_apprv_status =?,
             cf_hr_apprv_cmnt=?,
             cf_hr_apprv_time=?,
             cf_hr_uscode=?  
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

    getlevdetl: (data, callback) => {
        pool.query(
            `SELECT * FROM medi_hrm.hrm_leave_request_detl where lve_uniq_no=?`,
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
                        return resolve(null, results);
                    }
                )
            })
        })
    },
    getHalfdaylevdetl: (data, callback) => {
        pool.query(
            `SELECT * FROM medi_hrm.hrm_halfdayrequest where half_slno=?`,
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
            `SELECT * FROM medi_hrm.nopunchrequest where nopunch_slno=?`,
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
            `SELECT * FROM medi_hrm.comp_off_request where cmp_off_reqid=?`,
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
            longleave_spclleave
            FROM medi_hrm.hrm_leave_request 
            left join hrm_emp_master on  hrm_leave_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  hrm_leave_request.dept_id =hrm_department.dept_id
            where  lv_cancel_status=0 and hr_apprv_status='0' and ((inc_apprv_req=1 AND incapprv_status=1) OR inc_apprv_req=0) AND
           ((hod_apprv_req=1 AND hod_apprv_status=1 )OR hod_apprv_status=0) and lv_cancel_status_user=0;`,
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
            FROM medi_hrm.hrm_leave_request 
            left join hrm_emp_master on  hrm_leave_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  hrm_leave_request.dept_id =hrm_department.dept_id
            where  lv_cancel_status=0 and (hr_apprv_status='0'or  hr_apprv_status='1')  and ((inc_apprv_req=1 AND incapprv_status=1) OR inc_apprv_req=0) AND
           ((hod_apprv_req=1 AND hod_apprv_status=1 )OR hod_apprv_status=0) and lv_cancel_status_user=0;`,
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
            `SELECT half_slno,planslno,requestdate,dept_name,
            hrm_halfdayrequest.em_no,em_name,hf_incapprv_status,dept_section, 
            hf_inc_apprv_req,
            hf_incapprv_status,
            hf_hod_apprv_req,
            hf_hod_apprv_status,
            hf_hr_aprrv_requ,
            hf_hr_apprv_status,
            hf_ceo_apprv_status,hf_ceo_req_status
            FROM medi_hrm.hrm_halfdayrequest
                        left join hrm_emp_master on  hrm_halfdayrequest.em_no =hrm_emp_master.em_no
                        left join hrm_department on  hrm_halfdayrequest.dept_id =hrm_department.dept_id
                        where  lv_cancel_status=0 and hf_hr_apprv_status!=1  and ((hf_inc_apprv_req=1 AND hf_incapprv_status=1) OR hf_inc_apprv_req=0) AND
            ((hf_hod_apprv_req=1 AND hf_hod_apprv_status=1 )OR hf_hod_apprv_req=0);`,
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
            FROM medi_hrm.hrm_halfdayrequest
                        left join hrm_emp_master on  hrm_halfdayrequest.em_no =hrm_emp_master.em_no
                        left join hrm_department on  hrm_halfdayrequest.dept_id =hrm_department.dept_id
                        where  lv_cancel_status=0 and (hf_hr_apprv_status!=1 OR hf_hr_apprv_status=1)  and ((hf_inc_apprv_req=1 AND hf_incapprv_status=1) OR hf_inc_apprv_req=0) AND
            ((hf_hod_apprv_req=1 AND hf_hod_apprv_status=1 )OR hf_hod_apprv_req=0) AND ((hf_ceo_req_status=1 AND hf_ceo_apprv_status=1 )OR hf_ceo_req_status=0);`,
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
            `SELECT nopunch_slno,plan_slno,shift_id,nopunchrequest.em_no,punslno,dept_name,np_incapprv_status, em_name,nopunchrequest.em_dept_section, 
            np_inc_apprv_req,np_incapprv_status,np_hod_apprv_req,np_hod_apprv_status,np_hr_aprrv_requ,np_hr_apprv_status,
            np_ceo_apprv_status,np_ceo_req_status
                        FROM medi_hrm.nopunchrequest
                       left join hrm_emp_master on  nopunchrequest.em_no =hrm_emp_master.em_no
                       left join hrm_department on  nopunchrequest.em_department =hrm_department.dept_id
                       where lv_cancel_status=0  and np_hr_apprv_status!=1 and ((np_inc_apprv_req=1 AND np_incapprv_status=1) OR np_inc_apprv_req=0) AND
            ((np_hod_apprv_req=1 AND np_hod_apprv_status=1 )OR np_hod_apprv_req=0);`,
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
                        FROM medi_hrm.nopunchrequest
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
            `SELECT cmp_off_reqid,
            shift_id,em_name,
            leave_date,
            comp_off_request.em_no,
            dept_name,cf_incapprv_status,
            em_name,em_dept_section,
            cf_inc_apprv_req,
            cf_incapprv_status,
            cf_hod_apprv_req,
            cf_hod_apprv_status,cf_hr_apprv_status,cf_hr_aprrv_requ,cf_ceo_req_status,cf_ceo_apprv_status,cf_inc_apprv_cmnt,cf_hod_apprv_cmnt,cf_hr_apprv_cmnt
            FROM medi_hrm.comp_off_request 
            left join hrm_emp_master on  comp_off_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  comp_off_request.em_department =hrm_department.dept_id
            where  lv_cancel_status=0 and cf_hr_apprv_status!=1  and ((cf_inc_apprv_req=1 AND cf_incapprv_status=1) OR cf_inc_apprv_req=0) AND
            ((cf_hod_apprv_req=1 AND cf_hod_apprv_status=1 )OR cf_hod_apprv_req=0);`,
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
            FROM medi_hrm.comp_off_request 
            left join hrm_emp_master on  comp_off_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  comp_off_request.em_department =hrm_department.dept_id
            where  lv_cancel_status=0 and (cf_hr_apprv_status!=1 or  cf_hr_apprv_status=1 ) and ((cf_inc_apprv_req=1 AND cf_incapprv_status=1) OR cf_inc_apprv_req=0) AND
            ((cf_hod_apprv_req=1 AND cf_hod_apprv_status=1 )OR cf_hod_apprv_req=0) and ((cf_ceo_req_status=1 AND cf_ceo_apprv_status=1) OR cf_ceo_req_status=0);`,
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
            SET lv_cancel_req_status_user=?,
            lv_cancel_cmnt_user=?,
            lv_cancel_date_user=?,
            lv_cancel_us_code_user=? 
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
    NopunchCancelUser: (data, callBack) => {
        pool.query(
            `UPDATE nopunchrequest
            SET lv_cancel_status_user=?,
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

}