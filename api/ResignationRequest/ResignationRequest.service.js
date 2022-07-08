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
                hod_required,
                ceo_required)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.hod_required,
                data.ceo_required
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
            `SELECT resig_slno,hrm_resignation_request.dept_id,hrm_resignation_request.sect_id,dept_name,sect_name,em_name,
            hrm_resignation_request.em_no,request_date,
             if(inch_app_status is null ,'Incharge Approval Pending','Approved')inch_app_status
            FROM hrm_resignation_request
            left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            WHERE hrm_resignation_request.sect_id IN(?)
            AND incharge_required=1 AND resign_status is null`,
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
            `SELECT resig_slno,hrm_resignation_request.dept_id,hrm_resignation_request.sect_id,dept_name,sect_name,em_name,
            hrm_resignation_request.em_no,request_date,
             if(inch_app_status is null ,'Incharge Approval Pending',if(hod_app_status is null,'HOD Approval Pending','Approved'))inch_app_status
            FROM hrm_resignation_request
            left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            WHERE hrm_resignation_request.sect_id IN(?)
            AND hod_required=1 AND resign_status is null and ((incharge_required=1 and inch_app_status=1) or incharge_required =0)`,
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
              WHERE hrm_resignation_request.sect_id IN(?) AND resign_status is null and ((incharge_required=1 and inch_app_status=1) or incharge_required =0)
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
            `SELECT resig_slno,hrm_resignation_request.dept_id,hrm_resignation_request.sect_id,dept_name,sect_name,em_name,
            hrm_resignation_request.em_no,request_date,
            if(ceo_appr_status=1,'Approved','Pending')ceo_appr_status
            FROM hrm_resignation_request
            left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            WHERE ceo_required=1 AND resign_status is null and ((incharge_required=1 and inch_app_status=1) or incharge_required =0)
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
                SET hr_id = ?,
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
    getResignCancel: (callBack) => {
        pool.query(
            `SELECT resig_slno,hrm_resignation_request.dept_id,hrm_resignation_request.sect_id,dept_name,sect_name,em_name,
            hrm_resignation_request.em_no,request_date,
             if(hr_app_status is null ,'Incharge Approval Pending','Approved')hr_app_status,hr_app_date,hr_coment
            FROM hrm_resignation_request
            left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            WHERE resign_status="A" AND resign_cancel is null and contract_close_resign is null`,
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
}