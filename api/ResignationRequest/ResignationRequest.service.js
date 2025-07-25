const pool = require('../../config/database');
module.exports = {
    InsertResignationRequest: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_resignation_request(
                dept_id, 
                sect_id,
                em_id,
                em_no,
                designation,
                resignation_type,
                request_date,
                relieving_date, 
                resign_reason,
                notice_period,
                incharge_required,
                inch_app_status,
                inch_coment,
                inch_app_date,
                inch_id,
                hod_required,
                hod_app_status,
                hod_coment,
                hod_app_date,
                hod_id,
                ceo_required,
                hr_required,
                attachment,
                attachment_type
                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.dept_id,
                data.sect_id,
                data.em_id,
                data.em_no,
                data.designation,
                data.resignation_type,
                data.request_date,
                data.relieving_date,
                data.resign_reason,
                data.notice_period,
                data.incharge_required,
                data.inch_app_status,
                data.inch_coment,
                data.inch_app_date,
                data.inch_id,
                data.hod_required,
                data.hod_app_status,
                data.hod_coment,
                data.hod_app_date,
                data.hod_id,
                data.ceo_required,
                data.hr_required,
                data.fileName,
                data.fileType
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    checkResignationEntryExcist: (data, callBack) => {
        pool.query(
            `SELECT resig_slno FROM hrm_resignation_request WHERE resign_cancel IS NULL 
            AND (resign_status != 'R' or resign_status IS NULL) AND em_no = ? 
            and (inch_app_status!=2 and hod_app_status!=2 and hr_app_status!=2);`,
            [
                data.em_no,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getInchargePending: (data, callBack) => {
        pool.query(
            `SELECT 
                ROW_NUMBER() OVER () as slno,
                resig_slno,
                hrm_resignation_request.dept_id,
                hrm_resignation_request.sect_id,
                dept_name,
                sect_name,
                em_name,
                hrm_resignation_request.em_no,
                request_date,
                resign_reason,
                relieving_date,
                inch_app_status,
                resignation_type,
                case when inch_app_status=1 then 'Approved' when  inch_app_status = 2 then 'Rejected' else 'Incharge Approval Pending' end as 'status',
                attachment,
                attachment_type,
                replacement_required_incharge,
                replacement_required_hod
            FROM hrm_resignation_request
                left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
                left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
                left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            WHERE hrm_resignation_request.sect_id IN(?)
            AND incharge_required=1 AND hrm_resignation_request.resign_status is null`,
            [
                data.dept_id,

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getResignationRequestByID: (id, callBack) => {
        pool.query(
            `SELECT resig_slno,request_date,relieving_date,resign_reason,em_id,designation
            FROM hrm_resignation_request
            WHERE hrm_resignation_request.resig_slno=?
            AND incharge_required=1`,
            [
                id

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    ResignationApprovalIncahrge: (data, callBack) => {
        pool.query(
            `UPDATE hrm_resignation_request
                SET inch_id = ?,
                inch_app_date = ?,
                inch_app_status =?,
                inch_coment =?,
                replacement_required_incharge=?
                WHERE resig_slno =?`,
            [
                data.inch_id,
                data.inch_app_date,
                data.inch_app_status,
                data.inch_coment,
                data.replacement_required_incharge,
                data.resig_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getHoDPending: (data, callBack) => {
        pool.query(
            `SELECT 
                ROW_NUMBER() OVER () as slno,
                resig_slno,
                hrm_resignation_request.dept_id,
                hrm_resignation_request.sect_id,
                dept_name,
                sect_name,
                em_name,
                resign_reason,
                relieving_date,
                hrm_resignation_request.em_no,
                request_date,
                inch_app_status,
                inch_coment,
                hod_app_status,
                resignation_type,
                if(inch_app_status is null ,'Incharge Approval Pending',if(hod_app_status=1,'Approved',if(hod_app_status=2,'Reject','HOD Approval Pending')))status,
                attachment,
                attachment_type,
                replacement_required_incharge,
                replacement_required_hod
            FROM hrm_resignation_request
                left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
                left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
                left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            WHERE hrm_resignation_request.sect_id IN(?)
            AND hod_required=1 AND hrm_resignation_request.resign_status is null and ((incharge_required=1 and inch_app_status=1) or incharge_required =0)`,
            [
                data.dept_id,

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getResignationRequestHOdByID: (id, callBack) => {
        pool.query(
            `SELECT resig_slno,request_date,relieving_date,resign_reason,em_id,designation,inch_app_status,
            inch_coment,incharge_required
            FROM hrm_resignation_request
            WHERE hrm_resignation_request.resig_slno=?
            AND hod_required=1`,
            [
                id

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    ResignationApprovalHOD: (data, callBack) => {
        pool.query(
            `UPDATE hrm_resignation_request
                SET hod_id = ?,
                hod_app_date = ?,
                hod_app_status =?,
                hod_coment =?,
                replacement_required_hod=?
                WHERE resig_slno =?`,
            [
                data.hod_id,
                data.hod_app_date,
                data.hod_app_status,
                data.hod_coment,
                data.replacement_required_hod,
                data.resig_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getHRPending: (data, callBack) => {
        pool.query(
            `
            SELECT resig_slno,hrm_resignation_request.dept_id,hrm_resignation_request.sect_id,dept_name,sect_name,em_name,
              hrm_resignation_request.em_no,request_date
              FROM hrm_resignation_request
              left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
              left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
              left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
              WHERE hrm_resignation_request.sect_id IN(?) AND hrm_resignation_request.resign_status is null and ((incharge_required=1 and inch_app_status=1) or incharge_required =0)
              and ((hod_required=1 and hod_app_status=1) or hod_required =0) and ((ceo_required=1 and ceo_appr_status=1) or ceo_required =0) `,
            [
                data.dept_id,

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getResignationRequestHRByID: (id, callBack) => {
        pool.query(
            `SELECT resig_slno,request_date,relieving_date,resign_reason,em_id,designation,sect_id,dept_id,
            inch_app_status,hod_coment,hod_required,hod_app_status,
            inch_coment,incharge_required
            FROM hrm_resignation_request
            WHERE hrm_resignation_request.resig_slno=?`,
            [
                id

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getCEOPending: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            resig_slno,
            hrm_resignation_request.dept_id,hrm_resignation_request.sect_id,
            dept_name,sect_name,
            em_name,
            hrm_resignation_request.em_no,
            request_date,
            ceo_appr_status,
            resign_reason,
            case when ceo_appr_status=1 then 'Approved' when  ceo_appr_status = 2 then 'Rejected' else 'Incharge Approval Pending' end as 'status'
            FROM hrm_resignation_request
            left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            WHERE ceo_required=1 AND hrm_resignation_request.resign_status is null and ((incharge_required=1 and inch_app_status=1) or incharge_required =0)
            and ((hod_required=1 and hod_app_status=1) or hod_required =0) `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getCEOPendingById: (id, callBack) => {
        pool.query(
            `SELECT resig_slno,request_date,relieving_date,resign_reason,em_id,designation,
            inch_app_status,hod_coment,hod_required,hod_app_status,
            inch_coment,incharge_required
            FROM hrm_resignation_request
            WHERE hrm_resignation_request.resig_slno=? and ceo_required=1`,
            [
                id

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    ResignationApprovalCEO: (data, callBack) => {
        pool.query(
            `UPDATE hrm_resignation_request
                SET ceo_id = ?,
                ceo_appr_date = ?,
                ceo_appr_status =?,
                ceo_comment =?
                 WHERE resig_slno =?`,
            [
                data.ceo_id,
                data.ceo_appr_date,
                data.ceo_appr_status,
                data.ceo_comment,
                data.resig_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    ResignationApprovalHR: (data, callBack) => {
        pool.query(
            `UPDATE hrm_resignation_request
                SET 
                hr_id = ?,
                hr_app_date = ?,
                hr_app_status =?,
                hr_coment =?,
                resign_status =?,
                attachment=?,
                attachment_type=?
                WHERE resig_slno =?`,
            [
                data.hr_id,
                data.hr_app_date,
                data.hr_app_status,
                data.hr_coment,
                data.resign_status,
                data.fileName,
                data.fileType,
                data.resig_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getResignCancel: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            resig_slno,
            hrm_resignation_request.dept_id,
            hrm_resignation_request.sect_id,
            dept_name,
            sect_name,
            em_name,
            hrm_resignation_request.em_no,
            request_date,
            hr_app_status,
            resign_reason,
             if(hr_app_status is null ,'Incharge Approval Pending','Approved')status,
             hr_app_date,
             hr_coment
            FROM hrm_resignation_request
            left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            WHERE hrm_resignation_request.resign_status="A" AND resign_cancel is null and contract_close_resign is null`,
            [
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    ResignationCancelHR: (data, callBack) => {
        pool.query(
            `UPDATE hrm_resignation_request
                SET resign_cancel = ?,
                resign_cancel_reason = ?,
                cancel_user =?,
                resign_cancel_date=?
             WHERE resig_slno =?`,
            [
                data.resign_cancel,
                data.resign_cancel_reason,
                data.cancel_user,
                data.resign_cancel_date,
                data.resig_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    InsertResignationRequestContractClose: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_resignation_request(
                dept_id, 
                sect_id,
                em_id,
                em_no,
                designation,
                resignation_type,
                request_date,
                relieving_date, 
                resign_reason,
                contract_close_resign,
                hr_id,
                hr_app_date,
                hr_app_status,
                hr_coment,
                resign_status
            )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.dept_id,
                data.sect_id,
                data.em_id,
                data.em_no,
                data.designation,
                data.resignation_type,
                data.request_date,
                data.relieving_date,
                data.resign_reason,
                data.contract_close_resign,
                data.hr_id,
                data.hr_app_date,
                data.hr_app_status,
                data.hr_coment,
                data.resign_status
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getHRPendingList: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            resig_slno,
            hrm_resignation_request.dept_id,
            hrm_resignation_request.sect_id,
            dept_name,
            sect_name,
            em_name,
            resignation_type,
            hrm_resignation_request.em_id,
            resign_reason,
            hrm_resignation_request.em_no,request_date,
            attachment,
            attachment_type,
            hr_app_status,
            inch_coment,
            hod_coment,
            resignation_type,
            relieving_date
            FROM hrm_resignation_request
            left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            where hrm_resignation_request.resign_status is null and hr_required=1 and (inch_app_status !=2 and hod_app_status!=2)`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getContractClosed: (callBack) => {
        pool.query(
            `select 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_contract_detl.em_id,
            hrm_emp_contract_detl.em_no,
            dept_name,
            em_cont_start,
            em_designation,
            desg_name,
            em_cont_close_date,
            em_cont_close,
            em_department,
            em_dept_section,
            em_name,
            sect_name
            from hrm_emp_contract_detl
            inner join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            inner join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
			inner join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_resignation_request on hrm_resignation_request.em_id=hrm_emp_contract_detl.em_id
			where em_cont_close='C' and em_cont_renew is null and contract_close_hr_appr is null and hrm_resignation_request.resign_status is null`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getFullSettlementEmp: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            resig_slno,
            hrm_resignation_request.dept_id,
            hrm_resignation_request.sect_id,
            dept_name,
            sect_name,
            em_name,
            resignation_type,
            hrm_resignation_request.em_no,
            hrm_resignation_request.em_id,
            request_date,
            hr_app_status,
            resign_reason,
            relieving_date,
            if(resignation_type=1 ,'30 days Resignation','24 hour resignation')Resign,
            if(hr_app_status is null ,'Incharge Approval Pending','Approved')appstatus,
            if(resign_complete_status=1, 'Resign Completed','Resign Pending')resignstatus,
            hr_app_date,
            hr_coment,
            em_doj,
            desg_name,
            gross_salary,
            hr_id,
            status,
            resign_complete_status
            FROM hrm_resignation_request
            inner join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
            inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
            inner join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            inner join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_resignation_salary_details on hrm_resignation_salary_details.em_id=hrm_resignation_request.em_id
            WHERE hrm_resignation_request.resign_status="A" and resign_cancel is null  `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertResigSalaryDetails: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_resignation_salary_details(
                em_id,
                em_no,
				payable_amount,
				recievable,
                status,
                balance_status,
                balance_amount,
                create_user
                )
                VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.payable_amount,
                data.recievable,
                1,
                data.balance_status,
                data.balance_amount,
                data.create_user

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    //Inactiving Employee By Hr
    InactiveEmployee: (data, callBack) => {
        pool.query(
            `update hrm_emp_master
            set em_status=?,
            resign_status=?,
            resign_date=?,
            unauthorised_absent_date=?,
            unauthorized_absent_status=?
            where em_id=?`,
            [
                data.em_status,
                data.resign_status,
                data.resign_date,
                data.unauthorised_absent_date,
                data.unauthorized_absent_status,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUnauthorizedAbsentee: (callBack) => {
        pool.query(
            `select hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_id,
            hrm_emp_master.em_doj,
            hrm_emp_contract_detl.em_cont_start,
            hrm_emp_master.contract_status,
            hrm_emp_master.gross_salary,
            hrm_department.dept_id,
            hrm_dept_section.sect_id,
            dept_name, 
            sect_name,
            desg_name,
            unauthorised_absent_date
            FROM hrm_emp_master
            left join hrm_emp_contract_detl on hrm_emp_contract_detl.em_no = hrm_emp_master.em_no and hrm_emp_contract_detl.status = 0
            inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            inner join designation on hrm_emp_master.em_designation=designation.desg_slno
            where  unauthorized_absent_status=1
                and doctor_status=0 and em_status=1
                and hrm_emp_master.em_no not in (1 ,2)`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertFromActiveEmp: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_resignation_request(
                dept_id, 
                sect_id,
                em_id,
                em_no,
                designation,
                resignation_type,
                request_date,
                relieving_date, 
                resign_reason,
                notice_period,
                incharge_required,
                inch_app_status,
                inch_coment,
                inch_app_date,
                inch_id,
                hod_required,
                hod_app_status,
                hod_coment,
                hod_app_date,
                hod_id,
                hr_required,
                hr_app_status,
                hr_app_date,
                hr_coment,
                hr_id,
                resign_status
                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.dept_id,
                data.sect_id,
                data.em_id,
                data.em_no,
                data.designation,
                data.resignation_type,
                data.request_date,
                data.relieving_date,
                data.resign_reason,
                data.notice_period,
                data.incharge_required,
                data.inch_app_status,
                data.inch_coment,
                data.inch_app_date,
                data.inch_id,
                data.hod_required,
                data.hod_app_status,
                data.hod_coment,
                data.hod_app_date,
                data.hod_id,
                data.hr_required,
                data.hr_app_status,
                data.hr_app_date,
                data.hr_coment,
                data.hr_id,
                data.resign_status
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getResignationRequestByEmpId: (id, callBack) => {
        pool.query(
            `SELECT * FROM hrm_resignation_request where em_id=?  `,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    insertFinalSettlement: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_final_settlement(
                em_id,
                em_no, 
                file_attachment,
                attached_type,
                exclusion,
                exclusion_reason,
                resignation_date,
                relieving_date,
                total_days, 
                leave_count,
                holiday_count,
                late_count,
                lop_count,
                holiday_worked,
                total_paydays,
                lop_amount,
                nps_amount,
                lwf_amount,
                deduction_amount,
                holiday_amount,
                extra_earnings,
                extra_deduction,
                gross_salary,
                net_salary,
                total_payableamount,
                refund_amount
                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.fileName,
                data.fileType,
                data.exclusion,
                data.exclusion_reason,
                data.resignation_date,
                data.relieving_date,
                data.total_days,
                data.leave_count,
                data.holiday_count,
                data.late_count,
                data.lop_count,
                data.holiday_worked,
                data.total_paydays,
                data.lop_amount,
                data.nps_amount,
                data.lwf_amount,
                data.deduction_amount,
                data.holiday_amount,
                data.extra_earnings,
                data.extra_deduction,
                data.gross_salary,
                data.net_salary,
                data.total_payableamount,
                data.refund_amount
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    resignComplete: (data, callBack) => {
        pool.query(
            `update hrm_resignation_request set resign_complete_status=1 where em_id=?`,
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
    finalApprovalList: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            resig_slno,
            hrm_resignation_request.dept_id,
            hrm_resignation_request.sect_id,
            dept_name,
            sect_name,
            em_name,
            resignation_type,
            hrm_resignation_request.em_no,
            hrm_resignation_request.em_id,
            request_date,
            hr_app_status,
            resign_reason,
            hrm_resignation_request.relieving_date,
            if(resignation_type=1 ,'30 days Resignation','24 hour resignation')Resign,
            if(hr_app_status is null ,'Incharge Approval Pending','Approved')appstatus,
            if(resign_complete_status=1, 'Resign Completed','Resign Pending')resignstatus,
            hr_app_date,
            hr_coment,
            em_doj,
            desg_name,
            hrm_emp_master.gross_salary,
            hr_id,
            status,
            resign_complete_status
            FROM hrm_resignation_request
            inner join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
            inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
            inner join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            inner join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_resignation_salary_details on hrm_resignation_salary_details.em_id=hrm_resignation_request.em_id
            left join hrm_emp_final_settlement on hrm_emp_final_settlement.em_id=hrm_resignation_request.em_id
            WHERE hrm_resignation_request.resign_status="A" and resign_cancel is null and resign_complete_status=1 and salary_update=0 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    paymentSubmit: (data, callBack) => {
        pool.query(
            `update hrm_emp_final_settlement set salarytype=?,remark=?,salary_update=1 where final_slno=?`,
            [
                data.salarytype,
                data.remark,
                data.final_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSettlementData: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_emp_final_settlement where em_no=? `,
            [
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
    deactivateLogin: (data, callBack) => {
        pool.query(
            `update hrm_employee set emp_status=0 where emp_id=? `,
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
    getResignationByEmID: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_resignation_request where em_id=?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    resignationHRReject: (data, callBack) => {
        pool.query(
            `UPDATE hrm_resignation_request
                SET 
                hr_id = ?,
                hr_app_date = ?,
                hr_app_status =?,
                hr_coment =?,
                resign_status =?
                WHERE resig_slno =?`,
            [
                data.hr_id,
                data.hr_app_date,
                data.hr_app_status,
                data.hr_coment,
                data.resign_status,
                data.resig_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertRetirmentLog: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_retirement_log(
                em_id,
                em_no, 
                file_attachment,
                attached_type,
                exclusion,
                exclusion_reason,
                em_doj,
                retirement_date,
                total_days, 
                leave_count,
                holiday_count,
                late_count,
                lop_count,
                holiday_worked,
                total_paydays,
                lop_amount,
                nps_amount,
                lwf_amount,
                deduction_amount,
                holiday_amount,
                extra_earnings,
                extra_deduction,
                gross_salary,
                net_salary,
                total_payableamount
                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.fileName,
                data.fileType,
                data.exclusion,
                data.exclusion_reason,
                data.em_doj,
                data.retirement_date,
                data.total_days,
                data.leave_count,
                data.holiday_count,
                data.late_count,
                data.lop_count,
                data.holiday_worked,
                data.total_paydays,
                data.lop_amount,
                data.nps_amount,
                data.lwf_amount,
                data.deduction_amount,
                data.holiday_amount,
                data.extra_earnings,
                data.extra_deduction,
                data.gross_salary,
                data.net_salary,
                data.total_payableamount
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
}