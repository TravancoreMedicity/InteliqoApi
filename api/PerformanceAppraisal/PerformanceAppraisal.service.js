const pool = require('../../config/database');

module.exports = {
    getProbationEndList: (callBack) => {
        pool.query(
            `select 
            em_id,
            em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj,
            em_prob_end_date
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
             where em_category IN (4,7,9) and em_prob_end_date<=curdate() and em_prob_end_date!="2000-01-01"`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAnnualList: (callBack) => {
        pool.query(
            `
            select 
            em_id,
            em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj,
            em_contract_end_date
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            where em_category=1 and em_prob_end_date<=curdate();`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getTrainingList: (callBack) => {
        pool.query(
            `
            select 
            em_id,
            em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj,
            em_contract_end_date
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            where em_category IN (3,4) and em_prob_end_date<=curdate();`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}