const pool = require('../../config/database');

module.exports = {
    InsertVerification: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_verification 
            (
                 em_id,
                verification_required,
                second_level_required
                    )
            VALUES (?,?,?)`,
            [
                data.em_id,
                data.verification_required,
                data.second_level_required,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getFirstlevelVerification: (callBack) => {
        pool.query(
            `select emp_verify_slno,hrm_emp_verification.em_id,verification_status,ifnull(verification_Remark,'pending')verification_Remark,
            em_no,em_name,hrm_branch.branch_name, hrm_department.dept_name,hrm_dept_section.sect_name,em_doj
             from hrm_emp_verification
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_verification.em_id
            left join  hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
            left join hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
            left join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where verification_required=1 and verification_status=0 or verification_status=2`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateFirstlevelVerification: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_verification
                SET verification_status =?,
                verification_Remark =?
            WHERE em_id =?`,
            [
                data.verification_status,
                data.verification_Remark,
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
    getSecondlevelVerification: (callBack) => {
        pool.query(
            `select emp_verify_slno,hrm_emp_verification.em_id,verification_status,ifnull(second_level_remarks,'second level pending')verification_Remark,second_level_verification,
            em_no,em_name,hrm_branch.branch_name, hrm_department.dept_name,hrm_dept_section.sect_name,em_doj,
            (case when verification_status='0' then "First level pending" when verification_status='2' then "Not Verified" else "Verified" end ) as verify_remark
             from hrm_emp_verification
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_verification.em_id
            left join  hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
            left join hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
            left join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where second_level_required=1 and second_level_verification!=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateSecondlevelVerification: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_verification
                SET second_level_verification =?,
                second_level_remarks =?
            WHERE em_id =?`,
            [
                data.verification_status,
                data.verification_Remark,
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

}