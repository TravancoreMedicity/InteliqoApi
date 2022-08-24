const pool = require('../../config/database');

/** to get employee details of training and probation */
module.exports = {
    getTrainingprob: (callBack) => {
        pool.query(
            `SELECT emstats_slno,empstat_name FROM medi_hrm.employee_status where not empstat_name='CONFORMATION'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getcatedetl: (data, callBack) => {
        pool.query(
            `SELECT
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_dob,
            hrm_emp_master.em_age_year,
            designation.desg_name,
            employee_status.empstat_name,
            hrm_emp_master.em_mobile,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_branch.branch_name,
            hrm_emp_master.em_email,
            hrm_emp_master.em_doj,
            hrm_emp_category.ecat_name
            FROM medi_hrm.hrm_emp_master
            left join hrm_emp_category on hrm_emp_master.em_category = hrm_emp_category.category_slno
            left join employee_status on hrm_emp_category.des_type = employee_status.emstats_slno
            left join designation on hrm_emp_master.em_designation = designation.desg_slno
            left join hrm_department on hrm_emp_master.em_department = hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
            left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
            where hrm_emp_master.em_status = 1 and hrm_emp_category.des_type IN (?)`,
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