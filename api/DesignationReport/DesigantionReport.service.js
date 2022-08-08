const pool = require('../../config/database');

/** to get designation report */
module.exports = {
    getDesignation: (callBack) => {
        pool.query(
            `select desg_slno,desg_name FROM designation `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDesignationById: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
                hrm_emp_master.em_name,
                hrm_emp_master.em_age_year,
                hrm_emp_master.em_mobile,
                bloodgroup.group_name,
                hrm_department.dept_name,
                hrm_dept_section.sect_name,
                designation.desg_name,
                hrm_branch.branch_name,
                institution_type.inst_emp_type,
                designation.desg_name,
                hrm_religion.relg_name,
                hrm_emp_master.em_doj,
                hrm_emp_category.ecat_name,
                case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'Gender',
                case when hrm_emp_personal.em_maritalstatus = 1 then 'married' when  hrm_emp_personal.em_maritalstatus=2 then 'unmarried' else 'not updated' end as 'marital_status'
                FROM medi_hrm.hrm_emp_master
                left join bloodgroup on  hrm_emp_master.blood_slno = bloodgroup.group_slno
                left join hrm_department on hrm_emp_master.em_department = hrm_department.dept_id
                left join hrm_dept_section on hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
                left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
                left join institution_type on hrm_emp_master.em_institution_type = institution_type.inst_slno
                left join designation on hrm_emp_master.em_designation = designation.desg_slno
                left join hrm_religion on  hrm_emp_master.hrm_religion = hrm_religion.relg_slno
                left join hrm_emp_category on hrm_emp_master.em_category = hrm_emp_category.category_slno
                left join hrm_emp_personal on hrm_emp_master.em_id = hrm_emp_personal.em_id
                where hrm_emp_master.em_status = 1 and designation.desg_slno IN (?)`,
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
    }
}