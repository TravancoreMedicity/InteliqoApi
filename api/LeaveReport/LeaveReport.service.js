const pool = require('../../config/database');
const moment = require('moment');
module.exports = {
    getleavereq: (callBack) => {
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
                   leavetype_name,
                   leave_name,
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
                inner join hrm_leave_request_detl ON hrm_leave_request_detl.lve_uniq_no = hrm_leave_request.lve_uniq_no
                where  lv_cancel_status=0  and lv_cancel_status_user=0;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getHalfday: (callBack) => {
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
            hf_inc_apprv_cmnt,
            hf_hod_apprv_cmnt,
            hf_hr_apprv_cmnt,
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
    getNopunchReq: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            nopunch_slno,
            plan_slno,
            shift_id,
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
            np_inc_apprv_cmnt,
            np_hod_apprv_cmnt,
            np_hr_apprv_cmnt,
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
            where lv_cancel_req_status_user=0 and lv_cancel_status_user=0;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getCoffReq: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            cmp_off_reqid,
            shift_id,
			comp_off_request.em_no,
            em_name,
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
    getOneHour: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            request_slno,
            one_hour_request.em_id,
            one_hour_request.em_no,
            one_hour_request.dept_id,
            dept_sect_id,
            one_hour_duty_day,
            dept_name,
            em_name,
            sect_name,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            hr_req_status,
            hr_approval_status,
            request_date,
            incharge_approval_comment,
            hod_approval_comment,
            hr_approval_comment
            FROM one_hour_request
            inner join hrm_emp_master on  one_hour_request.em_no =hrm_emp_master.em_no
            inner join hrm_department on  one_hour_request.dept_id =hrm_department.dept_id
			inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  cancel_status=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getOnduty: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            on_duty_request.em_no,
            onduty_slno,
            dept_sect_id,
            on_duty_request.dept_id,
            on_duty_date,
            dept_name,
            em_name,
            sect_name,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            hr_req_status,
            hr_approval_status,
            request_date,
            incharge_approval_comment,
            hod_approval_comment,
            hr_approval_comment
            FROM on_duty_request
            inner join hrm_emp_master on  on_duty_request.em_no =hrm_emp_master.em_no
            inner join hrm_department on  on_duty_request.dept_id =hrm_department.dept_id
			inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  cancel_status=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    empMisspunchyearwise: (data, callBack) => {
        pool.query(
            `SELECT 
            nopunchrequest.em_no,
            em_name,
            dept_name,
            sect_name,
            np_inc_apprv_req,
            np_incapprv_status,
            np_hod_apprv_req,
            np_hod_apprv_status,
            np_hr_aprrv_requ,
            np_hr_apprv_status,
            np_reason,
            np_inc_apprv_cmnt,
            np_hod_apprv_cmnt,
            np_hr_apprv_cmnt,
            nopunchdate,
            checkintime,
            checkouttime,
            checkinflag,
            checkoutflag,
            creteddate,
            lv_cancel_status,
            lv_cancel_req_status_user,
            lv_cancel_cmnt,
            lv_cancel_cmnt_user,
            shift_id, shft_desc
            FROM nopunchrequest
            left join hrm_emp_master on  nopunchrequest.em_no =hrm_emp_master.em_no
            left join hrm_department on  nopunchrequest.em_department =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            inner join hrm_shift_mast on hrm_shift_mast.shft_slno=nopunchrequest.shift_id
            where nopunchrequest.em_id=? and year(nopunchdate)=year(?)`,
            [
                data.em_id,
                data.dateyear
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    emOnehouryearwise: (data, callBack) => {
        pool.query(
            `SELECT 
            one_hour_request.em_id,
            one_hour_request.em_no,
            em_name,
            one_hour_duty_day,
            dept_name,
            sect_name,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            hr_req_status,
            hr_approval_status,
            request_date,
            incharge_approval_comment,
            hod_approval_comment,
            hr_approval_comment,
            cancel_status,
            cancel_comment,
            checkin_flag,
            checkout_flag,
            reason
            FROM one_hour_request
            inner join hrm_emp_master on  one_hour_request.em_no =hrm_emp_master.em_no
            inner join hrm_department on  one_hour_request.dept_id =hrm_department.dept_id
			inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  one_hour_request.em_id=? and year(one_hour_duty_day)=year(?)`,
            [
                data.em_id,
                data.dateyear
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    empOndutyyearwise: (data, callBack) => {
        pool.query(
            `SELECT 
            on_duty_request.em_no,
            on_duty_date,
            dept_name,
            em_name,
            sect_name,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            hr_req_status,
            hr_approval_status,
            request_date,
            incharge_approval_comment,
            hod_approval_comment,
            hr_approval_comment,
            cancel_status,
            cancel_comment,
            onduty_reason
            FROM on_duty_request
            inner join hrm_emp_master on  on_duty_request.em_no =hrm_emp_master.em_no
            inner join hrm_department on  on_duty_request.dept_id =hrm_department.dept_id
			inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  on_duty_request.em_id=? and year(on_duty_date)=year(?)`,
            [
                data.em_id,
                data.dateyear
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    empHalfdayYearWise: (data, callBack) => {
        pool.query(
            `SELECT 
            dept_name,
            hrm_halfdayrequest.em_no,
            em_name,
            sect_name,
            hf_incapprv_status, 
            hf_inc_apprv_req,
            hf_incapprv_status,
            hf_hod_apprv_req,
            hf_hod_apprv_status,
            hf_hr_aprrv_requ,
            hf_hr_apprv_status,
            hf_inc_apprv_cmnt,
            hf_hod_apprv_cmnt,
            hf_hr_apprv_cmnt,
            requestdate,
            leavedate,
            month,		
            checkIn,
            checkOut,
            hf_reason,
            halfday_status,
            lv_cancel_status,
            lv_cancel_status_user,
            lv_cancel_cmnt,
            lv_cancel_cmnt_user,
            shift_id, shft_desc
            FROM hrm_halfdayrequest
            inner join hrm_emp_master on  hrm_halfdayrequest.em_no =hrm_emp_master.em_no
            inner join hrm_department on  hrm_halfdayrequest.dept_id =hrm_department.dept_id
			inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            inner join hrm_shift_mast on hrm_shift_mast.shft_slno=hrm_halfdayrequest.shift_id
            where  emp_id=? and year(leavedate)=year(?)`,
            [
                data.em_id,
                data.dateyear
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    empLeaveYearWise: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_leave_request.em_id,
            hrm_leave_request.em_no,
            em_name,
            dept_name,
            sect_name,
            request_date,
            leave_dates,
            leavetype_name,
            leave_name,
            leave_reason,
            inc_apprv_req,
            incapprv_status,
            hod_apprv_req,
            hod_apprv_status,
            hr_aprrv_requ,
            hr_apprv_status,
            lv_cancel_status,
            lv_cancel_status_user ,
            lv_cancel_cmnt,
            lv_cancel_cmnt_user
            FROM hrm_leave_request 
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_leave_request.em_id
            left join hrm_leave_request_detl on hrm_leave_request_detl.lve_uniq_no=hrm_leave_request.lve_uniq_no
            left join hrm_department on hrm_department.dept_id=hrm_leave_request.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_leave_request.dept_section
            where hrm_leave_request.em_id=? and year(leave_dates)=year(?)`,
            [
                data.em_id,
                data.dateyear
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