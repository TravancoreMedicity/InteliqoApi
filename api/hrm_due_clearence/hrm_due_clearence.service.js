const pool = require('../../config/database');
module.exports = {
    createDueClearence: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_due_clearence (
                due_emp_id,
                due_dept_code,
                due_deptname
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
    getDueClarennceListBySection: (data, callBack) => {
        pool.query(
            `select due_slno,due_emp_id,due_emp_id,em_department,em_dept_section,
            dept_name,sect_name,em_no,em_name,if(due_dept_status is null ,'Pending','Hold')due_dept_status
            from hrm_due_clearence
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_due_clearence.due_emp_id
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            where due_dept_code=? and (due_dept_status is null or due_dept_status='H')`,
            [
                data.due_dept_code,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDueDetailsByID: (id, callBack) => {
        pool.query(
            `select due_slno,due_emp_id,due_emp_id,em_department,em_dept_section,dept_name,sect_name,
            em_no,em_name,if(due_dept_status is null ,'Pending','')due_dept_status,due_dept_code
            from hrm_due_clearence
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_due_clearence.due_emp_id
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            where due_slno=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateDueClearence: (data, callBack) => {
        pool.query(
            `UPDATE hrm_due_clearence 
                SET due_dept_status = ?,
                due_dept_comment =?,
                approved_date=?,
                approved_user=?,
                charge_handover_emp=?
                WHERE due_slno = ?`,
            [
                data.due_dept_status,
                data.due_dept_comment,
                data.approved_date,
                data.approved_user,
                data.charge_handover_emp,
                data.due_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDueClearenceHR: (callBack) => {
        pool.query(
            `SELECT resig_slno,hrm_resignation_request.dept_id,hrm_resignation_request.sect_id,
            dept_name,sect_name,em_name,request_date,hrm_resignation_request.em_id, 
            hrm_resignation_request.em_no,request_date,relieving_date
            FROM hrm_resignation_request
            left join hrm_department on hrm_department.dept_id=hrm_resignation_request.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_resignation_request.sect_id
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_resignation_request.em_id
            where due_clearence_status is null and resign_cancel is null AND resign_status='A' AND
            due_clearence_status is null`,
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
    getDueClearenceApproveDetails: (id, callBack) => {
        pool.query(
            `select due_slno, due_emp_id,due_deptname,
            (case when due_dept_status is null then 'Pending'
            when due_dept_status='A' then 'Approved'
            when due_dept_status='R' then 'Rejected'
            else  'Hold' end)as due_dept_status,
            ifnull(due_dept_comment,'Pending')due_dept_comment
            from hrm_due_clearence
            where due_emp_id=?`,
            [
                id
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