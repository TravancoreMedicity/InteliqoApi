const pool = require('../../config/database');

module.exports = {

    InstitutionReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_branch.branch_name,
            institution_type.inst_emp_type,
            designation.desg_name,
            hrm_emp_master.em_doj
            FROM medi_hrm.institution_type
            left join hrm_emp_master on hrm_emp_master.em_institution_type = institution_type.inst_slno
            left join hrm_department on hrm_department.dept_id = hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
            left join designation on hrm_emp_master.em_designation = designation.desg_slno
            where hrm_emp_master.em_status = 1 and institution_type.inst_slno IN(?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
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
}