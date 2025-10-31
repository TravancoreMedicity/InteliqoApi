const pool = require('../../config/database');
module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO one_hour_request (
                em_id,
                em_no,
                dept_id,
                dept_sect_id,
                request_date,
                one_hour_duty_day,
                checkin_flag,
                check_in,
                checkout_flag,
                check_out,
                shift_id,
                reason,
                incharge_req_status,
                incharge_approval_status,
                incharge_approval_comment,
                incharge_approval_date,
                hod_req_status,
                hod_approval_status,
                hod_approval_comment,
                hod_approval_date,
                ceo_req_status,
                hr_req_status,
                incharge_empid,
                hod_empid 
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [

                data.em_id,
                data.em_no,
                data.dept_id,
                data.dept_sect_id,
                data.request_date,
                data.one_hour_duty_day,
                data.checkin_flag,
                data.check_in,
                data.checkout_flag,
                data.check_out,
                data.shift_id,
                data.reason,
                data.incharge_req_status,
                data.incharge_approval_status,
                data.incharge_approval_comment,
                data.incharge_approval_date,
                data.hod_req_status,
                data.hod_approval_status,
                data.hod_approval_comment,
                data.hod_approval_date,
                data.ceo_req_status,
                data.hr_req_status,
                data.incharge_empid,
                data.hod_empid
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkInsertVal: (data, callBack) => {

        pool.query(
            `SELECT   MONTH(one_hour_duty_day) AS month,
            COUNT(request_slno) AS onehour_count
            FROM one_hour_request WHERE 
            em_id = ? 
            AND YEAR(one_hour_duty_day) = YEAR(?) -- Replace with the desired year
            AND month(one_hour_duty_day) = month(?)
             AND cancel_status != 1 
              AND incharge_approval_status!=2
             AND hod_req_status!=2
             AND hr_approval_status!=2
        GROUP BY MONTH(one_hour_duty_day)
        ORDER BY month;`,
            [
                data.em_id,
                data.one_hour_duty_day,
                data.one_hour_duty_day

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    createGenralRq: (data, callBack) => {
        pool.query(
            `INSERT INTO general_request (
                em_id,
                em_no,
                dept_id,
                dept_sect_id,
                request_date,
                general_request_type,
                request_comments
                )
                VALUES (?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.dept_id,
                data.dept_sect_id,
                data.request_date,
                data.general_request_type,
                data.request_comments
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createOndutyRequest: (data, callBack) => {
        pool.query(
            `INSERT INTO on_duty_request (
                em_id,
                em_no,
                dept_id,
                dept_sect_id,
                request_date,
                on_duty_date,
                shift_id,
                in_time,
                out_time,
                onduty_reason,
                incharge_req_status,
                incharge_approval_status,
                incharge_approval_comment,
                incharge_approval_date,
                hod_req_status,
                hod_approval_status,
                hod_approval_comment,
                hod_approval_date,
                ceo_req_status,
                hr_req_status,
                incharge_empid,
                hod_empid
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
    createEnableMispunchRqst: (data, callBack) => {
        pool.query(
            `INSERT INTO enablemisspunchforot (
                em_id,
                em_no,
                dept_id,
                dept_sect_id,
                request_date,
                miss_punch_day,
                shift_id,
                checkinflag,
                check_in,
                checkoutflag,
                check_out,
                reason,
                incharge_req_status,
                incharge_approval_status,
                incharge_approval_comment,
                incharge_approval_date,
                hod_req_status,
                hod_approval_status,
                hod_approval_comment,
                hod_approval_date,
                ceo_req_status,
                hr_req_status  
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [

                data.em_id,
                data.em_no,
                data.dept_id,
                data.dept_sect_id,
                data.request_date,
                data.miss_punch_day,
                data.shift_id,
                data.checkinflag,
                data.check_in,
                data.checkoutflag,
                data.check_out,
                data.reason,
                data.incharge_req_status,
                data.incharge_approval_status,
                data.incharge_approval_comment,
                data.incharge_approval_date,
                data.hod_req_status,
                data.hod_approval_status,
                data.hod_approval_comment,
                data.hod_approval_date,
                data.ceo_req_status,
                data.hr_req_status
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getOneHourReqst: (callBack) => {
        pool.query(
            `
            SELECT  
            request_slno,
            one_hour_request.em_id,
            one_hour_request.em_no,
            em_name,
            one_hour_request.dept_id,
            dept_name,
            sect_name,
            dept_sect_id,
            one_hour_duty_day,
            shift_id ,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            ceo_req_status,
            ceo_approval_status,
            hr_req_status,
            hr_approval_status,
            shft_desc,
            check_in,
            check_out,
            checkin_flag,
            checkout_flag,
            reason,
            request_date,
            incharge_approval_comment,
            hod_approval_comment,
            ceo_approval_comment,
            one_hour_duty_day FROM one_hour_request
            inner join hrm_emp_master on one_hour_request.em_id=hrm_emp_master.em_id
            inner join hrm_department on one_hour_request.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on one_hour_request.dept_sect_id=hrm_dept_section.sect_id
            inner join hrm_shift_mast on one_hour_request.shift_id=hrm_shift_mast.shft_slno
            where cancel_status=0 order by one_hour_duty_day desc
           `,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getOndutyRequest: (callBack) => {
        pool.query(
            ` SELECT  ROW_NUMBER() OVER () as serialno,
            onduty_slno,
            on_duty_request.em_id,
            on_duty_request.em_no,
            em_name,
            on_duty_request.dept_id,
            dept_name,
            sect_name,
            dept_sect_id,
            on_duty_date,
            shift_id ,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            ceo_req_status,
            ceo_approval_status,
            hr_req_status,
            hr_approval_status,
            shft_desc,
            request_date,
            onduty_reason,
            incharge_approval_comment,
            hod_approval_comment,
            ceo_approval_comment,
            in_time,
            out_time
            FROM on_duty_request
            inner join hrm_emp_master on on_duty_request.em_id=hrm_emp_master.em_id
            inner join hrm_department on on_duty_request.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on on_duty_request.dept_sect_id=hrm_dept_section.sect_id
            inner join hrm_shift_mast on on_duty_request.shift_id=hrm_shift_mast.shft_slno
            where in_time!=0 and out_time!=0 and cancel_status=0`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getenableMisspunchRequest: (callBack) => {
        pool.query(
            `SELECT  ROW_NUMBER() OVER () as serialno,
            enablemisspunchforot.slno,
             enablemisspunchforot.em_id,
             enablemisspunchforot.em_no,
             em_name,
             enablemisspunchforot.dept_id,
             dept_name,
             sect_name,
             dept_sect_id,
             miss_punch_day,
             enablemisspunchforot.shift_id ,
             incharge_req_status,
             incharge_approval_status,
             hod_req_status,
             hod_approval_status,
             ceo_req_status,
             ceo_approval_status,
             hr_req_status,
               hr_approval_status,
               hrm_shift_mast.shft_desc,
               check_in,
               check_out,
               checkInflag,
               checkoutflag,
               reason,
               incharge_approval_comment,
               hod_approval_comment,
               ceo_approval_comment,
               request_date
            FROM enablemisspunchforot
             inner join hrm_emp_master on enablemisspunchforot.em_id=hrm_emp_master.em_id
             inner join hrm_department on enablemisspunchforot.dept_id=hrm_department.dept_id
             inner join hrm_dept_section on enablemisspunchforot.dept_sect_id=hrm_dept_section.sect_id
             inner join hrm_shift_mast on enablemisspunchforot.shift_id=hrm_shift_mast.shft_slno 
             where cancel_status=0`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getGeneralReqstAll: (callBack) => {
        pool.query(
            `SELECT  
			ROW_NUMBER() OVER () as serialno,
          general_slno,
             general_request.em_id,
             general_request.em_no,
             em_name,
             general_request.dept_id,
             dept_name,
             sect_name,
             dept_sect_id,
             request_date,
             general_request_type,
             request_name,
             hr_status,
             request_comments
            FROM general_request
             inner join hrm_emp_master on general_request.em_id=hrm_emp_master.em_id
             inner join hrm_department on general_request.dept_id=hrm_department.dept_id
             inner join hrm_dept_section on general_request.dept_sect_id=hrm_dept_section.sect_id
             inner join common_request_master on general_request.general_request_type=common_request_master.slno
             where cancel_status=0`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getMissPunchDetails: (data, callBack) => {
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
            hrm_shift_mast.shft_desc
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
    inchargeEnable: (data, callBack) => {
        pool.query(
            `UPDATE enablemisspunchforot
            SET incharge_approval_status =?,
            incharge_approval_comment=?,
            incharge_approval_date=?,
            incharge_empid=?
            WHERE slno=?`,
            [
                data.incharge_approval_status,
                data.incharge_approval_comment,
                data.incharge_approval_date,
                data.incharge_empid,
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
    inchargeOneHour: (data, callBack) => {
        pool.query(
            `UPDATE one_hour_request
            SET incharge_approval_status =?,
            incharge_approval_comment=?,
            incharge_approval_date=?,
            incharge_empid=?
            WHERE request_slno=?`,
            [
                data.incharge_approval_status,
                data.incharge_approval_comment,
                data.incharge_approval_date,
                data.incharge_empid,
                data.request_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    inchargeOnDuty: (data, callBack) => {
        pool.query(
            `UPDATE on_duty_request
            SET incharge_approval_status =?,
            incharge_approval_comment=?,
            incharge_approval_date=?,
            incharge_empid=?
            WHERE onduty_slno=?`,
            [
                data.incharge_approval_status,
                data.incharge_approval_comment,
                data.incharge_approval_date,
                data.incharge_empid,
                data.onduty_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    hodEnable: (data, callBack) => {
        pool.query(
            `UPDATE enablemisspunchforot
            SET hod_approval_status =?,
            hod_approval_comment=?,
            hod_approval_date=?,
            hod_empid=?
            WHERE slno=?`,
            [
                data.hod_approval_status,
                data.hod_approval_comment,
                data.hod_approval_date,
                data.hod_empid,
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
    hodOnDuty: (data, callBack) => {
        pool.query(
            `UPDATE on_duty_request
            SET hod_approval_status =?,
            hod_approval_comment=?,
            hod_approval_date=?,
            hod_empid=?
            WHERE onduty_slno=?`,
            [
                data.hod_approval_status,
                data.hod_approval_comment,
                data.hod_approval_date,
                data.hod_empid,
                data.onduty_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    hodOneHour: (data, callBack) => {
        pool.query(
            `UPDATE one_hour_request
            SET hod_approval_status =?,
            hod_approval_comment=?,
            hod_approval_date=?,
            hod_empid=?
            WHERE request_slno=?`,
            [
                data.hod_approval_status,
                data.hod_approval_comment,
                data.hod_approval_date,
                data.hod_empid,
                data.request_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    ceoEnable: (data, callBack) => {
        pool.query(
            `UPDATE enablemisspunchforot
            SET ceo_approval_status =?,
            ceo_approval_comment=?,
            ceo_approval_date=?,
            ceo_empid=?
            WHERE slno=?`,
            [
                data.ceo_approval_status,
                data.ceo_approval_comment,
                data.ceo_approval_date,
                data.ceo_empid,
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
    ceoonduty: (data, callBack) => {
        pool.query(
            `UPDATE on_duty_request
            SET ceo_approval_status =?,
            ceo_approval_comment=?,
            ceo_approval_date=?,
            ceo_empid=?
            WHERE onduty_slno=?`,
            [
                data.ceo_approval_status,
                data.ceo_approval_comment,
                data.ceo_approval_date,
                data.ceo_empid,
                data.onduty_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    ceoOnehour: (data, callBack) => {
        pool.query(
            `UPDATE one_hour_request
            SET ceo_approval_status =?,
            ceo_approval_comment=?,
            ceo_approval_date=?,
            ceo_empid=?
            WHERE request_slno=?`,
            [
                data.ceo_approval_status,
                data.ceo_approval_comment,
                data.ceo_approval_date,
                data.ceo_empid,
                data.request_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    hrEnable: (data, callBack) => {
        pool.query(
            `UPDATE enablemisspunchforot
            SET hr_approval_status =?,
            hr_approval_comment=?,
            hr_approval_date=?,
            hr_empId=?
            WHERE slno=?`,
            [
                data.hr_approval_status,
                data.hr_approval_comment,
                data.hr_approval_date,
                data.hr_empId,
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
    hrOnduty: (data, callBack) => {
        pool.query(
            `UPDATE on_duty_request
            SET hr_approval_status =?,
            hr_approval_comment=?,
            hr_approval_date=?,
            hr_empId=?
            WHERE onduty_slno=?`,
            [
                data.hr_approval_status,
                data.hr_approval_comment,
                data.hr_approval_date,
                data.hr_empId,
                data.onduty_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    hrOnehour: (data, callBack) => {
        pool.query(
            `UPDATE one_hour_request
            SET hr_approval_status =?,
            hr_approval_comment=?,
            hr_approval_date=?,
            hr_empId=?
            WHERE request_slno=?`,
            [
                data.hr_approval_status,
                data.hr_approval_comment,
                data.hr_approval_date,
                data.hr_empId,
                data.request_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    addHrComment: (data, callBack) => {
        pool.query(
            `UPDATE one_hour_request
            SET hr_approval_status =?,
            hr_approval_comment=?,
            hr_approval_date=?,
            hr_empId=?
            WHERE request_slno=?`,
            [
                data.hr_approval_status,
                data.hr_approval_comment,
                data.hr_approval_date,
                data.hr_empId,
                data.request_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkingAttendanceMarking: (data, callBack) => {
        pool.query(
            `SELECT 
                month(attendance_marking_month) month,
                year(attendance_marking_month) year
            FROM hrm_attendance_marking 
            WHERE em_no = ?
            AND month(attendance_marking_month) = month(?)
            AND year(attendance_marking_month) = year(?)`,
            [
                data.empNo,
                data.fromDate,
                data.fromDate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, JSON.stringify(results));
            }
        )
    },
    HRNopunchMasterIn: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET punch_in =?,
            duty_status = 1,
            lvereq_desc = 'OHP',
            duty_desc = 'OHP',
            leave_status=1,
            lve_tble_updation_flag=1
         WHERE em_no=? and duty_day=?`,
            [
                data.checkintime,
                data.emno,
                data.dutyDay
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
            lvereq_desc = 'OHP',
            duty_desc = 'OHP',
            leave_status=1,
            lve_tble_updation_flag=1
            WHERE em_no=? and duty_day=?`,
            [
                data.checkouttime,
                data.emno,
                data.dutyDay
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkMispunchRequest: (data, callBack) => {
        pool.query(
            `SELECT 
                nopunch_slno,
                np_hr_apprv_status
            FROM nopunchrequest
            WHERE em_id=? AND month(nopunchdate) = month(?) AND month(nopunchdate) = year(?) 
            AND req_status = 0`,
            [
                data.em_id,
                data.date,
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
    checksEnableRq: (data, callBack) => {
        pool.query(
            `SELECT * FROM enablemisspunchforot WHERE 
            month(miss_punch_day) = month(?) AND em_id=?`,
            [
                data.miss_punch_day,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    punchdataEntry: (data, callBack) => {
        pool.query(
            ` INSERT INTO 
            punch_data (
                id,
                emp_code,
                punch_time,
                punch_state,
                enabled_punch_flag
                )
                VALUES (?,?,?,?,?)`,
            [

                data.id,
                data.emp_code,
                data.punch_time,
                data.punch_state,
                data.enabled_punch_flag
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HROnDutyPunchMaster: (data, callBack) => {
        pool.query(
            `UPDATE 
            punch_master
            SET 
            punch_in=?,
            punch_out=?,
            leave_status = 1,
            duty_status=1,
            lvereq_desc = ?,
            duty_desc = 'ODP',
            lve_tble_updation_flag = 1
            WHERE em_no = ? and duty_day=?`,
            [
                data.punch_in,
                data.punch_out,
                data.lvereq_desc,
                data.emno,
                data.duty_day
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkAttendanceProcess: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_attendance_marking 
            where attendance_marking_month between ? and ?
            and em_no=?
            `,
            [
                data.fromdate,
                data.todate,
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
    generalHRapproval: (data, callBack) => {
        pool.query(
            `UPDATE general_request
            SET hr_comments =?,
            hr_status=?,
            hrm_comment_date=?,
            hr_userid=?
            WHERE general_slno=?`,
            [
                data.hr_comments,
                data.hr_status,
                data.hrm_comment_date,
                data.hr_userid,
                data.general_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    cancelEnable: (data, callBack) => {
        pool.query(
            `UPDATE enablemisspunchforot
            SET cancel_status =1,
            cancel_date=curdate()
            WHERE slno=?`,
            [
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
    enableOnduty: (data, callBack) => {
        pool.query(
            `UPDATE on_duty_request
            SET cancel_status=1,
            cancel_comment=?,
            cancel_date=curdate(),
            cancel_user=?
            WHERE onduty_slno=?`,
            [
                data.cancel_comment,
                data.cancel_user,
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
    cancelOnehour: (data, callBack) => {
        pool.query(
            `UPDATE one_hour_request
            SET cancel_status =1,
            cancel_comment=?,
            cancel_date=curdate(),
            cancel_user=?
            WHERE request_slno=?`,
            [
                data.cancel_comment,
                data.cancel_user,
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
    cancelgeneral: (data, callBack) => {
        pool.query(
            `UPDATE general_request
            SET cancel_status =1,
            cancel_date=curdate()
            WHERE general_slno=?`,
            [
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
    onDutyReport: (data, callBack) => {
        pool.query(
            `SELECT on_duty_request.em_no,em_name, dept_name,sect_name,on_duty_date,onduty_reason,
            case when hr_approval_status = 1 then 'HR Approved'  else 'HR Not Approved' end as 'status'
            FROM on_duty_request 
           inner join hrm_emp_master on hrm_emp_master.em_id=on_duty_request.em_id
           inner join hrm_department on hrm_department.dept_id=on_duty_request.dept_id
           inner join hrm_dept_section on hrm_dept_section.sect_id=on_duty_request.dept_sect_id
           where  on_duty_date between ? and ? and in_time=1 and out_time=1 and cancel_status=0`,
            [
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
    HrApprovedOneHourData: (callBack) => {
        pool.query(
            ` SELECT  
            request_slno,
            one_hour_request.em_id,
            one_hour_request.em_no,
            em_name,
            one_hour_request.dept_id,
            dept_name,
            sect_name,
            dept_sect_id,
            one_hour_duty_day,
            shift_id ,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            ceo_req_status,
            ceo_approval_status,
            hr_req_status,
            hr_approval_status,
            shft_desc,
            check_in,
            check_out,
            checkin_flag,
            checkout_flag,
            reason,
            request_date,
            incharge_approval_comment,
            hod_approval_comment,
            ceo_approval_comment,
            one_hour_duty_day FROM one_hour_request
            inner join hrm_emp_master on one_hour_request.em_id=hrm_emp_master.em_id
            inner join hrm_department on one_hour_request.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on one_hour_request.dept_sect_id=hrm_dept_section.sect_id
            inner join hrm_shift_mast on one_hour_request.shift_id=hrm_shift_mast.shft_slno
            where cancel_status=0 and hr_req_status=1 and hr_approval_status=1 order by one_hour_duty_day desc`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    HrApprovedOnDutyData: (callBack) => {
        pool.query(
            `SELECT  ROW_NUMBER() OVER () as serialno,
            onduty_slno,
            on_duty_request.em_id,
            on_duty_request.em_no,
            em_name,
            on_duty_request.dept_id,
            dept_name,
            sect_name,
            dept_sect_id,
            on_duty_date,
            shift_id ,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            ceo_req_status,
            ceo_approval_status,
            hr_req_status,
            hr_approval_status,
            shft_desc,
            request_date,
            onduty_reason,
            incharge_approval_comment,
            hod_approval_comment,
            ceo_approval_comment,
            in_time,
            out_time
            FROM on_duty_request
            inner join hrm_emp_master on on_duty_request.em_id=hrm_emp_master.em_id
            inner join hrm_department on on_duty_request.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on on_duty_request.dept_sect_id=hrm_dept_section.sect_id
            inner join hrm_shift_mast on on_duty_request.shift_id=hrm_shift_mast.shft_slno
            where in_time!=0 and out_time!=0 and cancel_status=0 and hr_req_status=1 
            and hr_approval_status=1 order by on_duty_date desc`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmpwiseOnduty: (data, callBack) => {
        pool.query(
            `SELECT  ROW_NUMBER() OVER () as serialno,
            onduty_slno,
            on_duty_request.em_id,
            on_duty_request.em_no,
            em_name,
            on_duty_request.dept_id,
            dept_name,
            sect_name,
            dept_sect_id,
            on_duty_date,
            shift_id ,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            ceo_req_status,
            ceo_approval_status,
            hr_req_status,
            hr_approval_status,
            shft_desc,
            request_date,
            onduty_reason,
            incharge_approval_comment,
            hod_approval_comment,
            ceo_approval_comment,
            in_time,
            out_time,
            cancel_status
            FROM on_duty_request
            inner join hrm_emp_master on on_duty_request.em_id=hrm_emp_master.em_id
            inner join hrm_department on on_duty_request.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on on_duty_request.dept_sect_id=hrm_dept_section.sect_id
            inner join hrm_shift_mast on on_duty_request.shift_id=hrm_shift_mast.shft_slno
            where in_time!=0 and out_time!=0 and hrm_emp_master.em_id=?  order by on_duty_date desc`,
            [
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmpwiseOneHour: (data, callBack) => {
        pool.query(
            `SELECT  
            request_slno,
            one_hour_request.em_id,
            one_hour_request.em_no,
            em_name,
            one_hour_request.dept_id,
            dept_name,
            sect_name,
            dept_sect_id,
            one_hour_duty_day,
            shift_id ,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            ceo_req_status,
            ceo_approval_status,
            hr_req_status,
            hr_approval_status,
            shft_desc,
            check_in,
            check_out,
            checkin_flag,
            checkout_flag,
            reason,
            request_date,
            incharge_approval_comment,
            hod_approval_comment,
            ceo_approval_comment,
            cancel_status,
            one_hour_duty_day FROM one_hour_request
            inner join hrm_emp_master on one_hour_request.em_id=hrm_emp_master.em_id
            inner join hrm_department on one_hour_request.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on one_hour_request.dept_sect_id=hrm_dept_section.sect_id
            inner join hrm_shift_mast on one_hour_request.shift_id=hrm_shift_mast.shft_slno
            where hrm_emp_master.em_id=?  order by one_hour_duty_day desc`,
            [
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSectWiseOneHour: (data, callBack) => {
        pool.query(
            `SELECT  
            request_slno,
            one_hour_request.em_id,
            one_hour_request.em_no,
            em_name,
            one_hour_request.dept_id,
            dept_name,
            sect_name,
            dept_sect_id,
            one_hour_duty_day,
            shift_id ,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            ceo_req_status,
            ceo_approval_status,
            hr_req_status,
            hr_approval_status,
            shft_desc,
            check_in,
            check_out,
            checkin_flag,
            checkout_flag,
            reason,
            request_date,
            incharge_approval_comment,
            hod_approval_comment,
            ceo_approval_comment,
            one_hour_duty_day FROM one_hour_request
            inner join hrm_emp_master on one_hour_request.em_id=hrm_emp_master.em_id
            inner join hrm_department on one_hour_request.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on one_hour_request.dept_sect_id=hrm_dept_section.sect_id
            inner join hrm_shift_mast on one_hour_request.shift_id=hrm_shift_mast.shft_slno
            where cancel_status=0 and dept_sect_id IN(?) order by one_hour_duty_day desc`,
            [
                data.sectIds
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSectWiseOnDuty: (data, callBack) => {
        pool.query(
            ` SELECT  ROW_NUMBER() OVER () as serialno,
            onduty_slno,
            on_duty_request.em_id,
            on_duty_request.em_no,
            em_name,
            on_duty_request.dept_id,
            dept_name,
            sect_name,
            dept_sect_id,
            on_duty_date,
            shift_id ,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            ceo_req_status,
            ceo_approval_status,
            hr_req_status,
            hr_approval_status,
            shft_desc,
            request_date,
            onduty_reason,
            incharge_approval_comment,
            hod_approval_comment,
            ceo_approval_comment,
            in_time,
            out_time
            FROM on_duty_request
            inner join hrm_emp_master on on_duty_request.em_id=hrm_emp_master.em_id
            inner join hrm_department on on_duty_request.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on on_duty_request.dept_sect_id=hrm_dept_section.sect_id
            inner join hrm_shift_mast on on_duty_request.shift_id=hrm_shift_mast.shft_slno
            where in_time!=0 and out_time!=0 and dept_sect_id IN(?) and cancel_status=0 order by on_duty_date desc`,
            [
                data.sectIds
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    OneHourForApprovalHR: (callBack) => {
        pool.query(
            `
            SELECT  
            request_slno,
            one_hour_request.em_id,
            one_hour_request.em_no,
            em_name,
            one_hour_request.dept_id,
            dept_name,
            sect_name,
            dept_sect_id,
            one_hour_duty_day,
            shift_id ,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            ceo_req_status,
            ceo_approval_status,
            hr_req_status,
            hr_approval_status,
            shft_desc,
            check_in,
            check_out,
            checkin_flag,
            checkout_flag,
            reason,
            request_date,
            incharge_approval_comment,
            hod_approval_comment,
            ceo_approval_comment,
            one_hour_duty_day FROM one_hour_request
            inner join hrm_emp_master on one_hour_request.em_id=hrm_emp_master.em_id
            inner join hrm_department on one_hour_request.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on one_hour_request.dept_sect_id=hrm_dept_section.sect_id
            inner join hrm_shift_mast on one_hour_request.shift_id=hrm_shift_mast.shft_slno
            where cancel_status=0 and hr_req_status=1 and hr_approval_status!=1 and hr_approval_status!=2 
            and incharge_approval_status!=2 and hod_approval_status!=2 order by one_hour_duty_day desc
           `,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    OndutyForApprovalHR: (callBack) => {
        pool.query(
            `SELECT  ROW_NUMBER() OVER () as serialno,
            onduty_slno,
            on_duty_request.em_id,
            on_duty_request.em_no,
            em_name,
            on_duty_request.dept_id,
            dept_name,
            sect_name,
            dept_sect_id,
            on_duty_date,
            shift_id ,
            incharge_req_status,
            incharge_approval_status,
            hod_req_status,
            hod_approval_status,
            ceo_req_status,
            ceo_approval_status,
            hr_req_status,
            hr_approval_status,
            shft_desc,
            request_date,
            onduty_reason,
            incharge_approval_comment,
            hod_approval_comment,
            ceo_approval_comment,
            in_time,
            out_time,
            gross_salary
            FROM on_duty_request
            inner join hrm_emp_master on on_duty_request.em_id=hrm_emp_master.em_id
            inner join hrm_department on on_duty_request.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on on_duty_request.dept_sect_id=hrm_dept_section.sect_id
            inner join hrm_shift_mast on on_duty_request.shift_id=hrm_shift_mast.shft_slno
            where in_time!=0 and out_time!=0 and cancel_status=0 and hr_req_status=1 and hr_approval_status!=1 and hr_approval_status!=2 
            and incharge_approval_status!=2 and hod_approval_status!=2 order by on_duty_date desc
           `,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CheckOndutyExistorNot: (data, callBack) => {
        pool.query(
            `SELECT  *
            FROM on_duty_request 
            WHERE em_no=? and on_duty_date BETWEEN ? AND ?
            and (incharge_approval_status!=2 and hod_approval_status!=2 and hr_approval_status!=2 and cancel_status!=1 )`,
            [
                data.em_no,
                data.fromDate,
                data.toDate,
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