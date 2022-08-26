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
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
             where em_category IN (4,7,9) and em_prob_end_date<=curdate() and em_prob_end_date!="2000-01-01" and em_status=1;`,
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
            `select 
            em_id,
            em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            where em_category=1 and DATE_ADD(em_doj, INTERVAL 12 MONTH) <=curdate() and em_status=1 ;;`,
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
            `select 
            em_id,
            em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj,
            ecat_name,
           case when em_category=2 then DATE_ADD(em_doj, INTERVAL 3 MONTH) when em_category=3 then DATE_ADD(em_doj, INTERVAL 6 MONTH)  end as training_end
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            where em_category IN (2,3) and em_prob_end_date<=curdate() and em_status=1 ;`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractEndList: (callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_id,
            hrm_emp_master.em_no, 
            em_name,
            dept_name,
            desg_name ,
            em_doj
            FROM medi_hrm.hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_emp_contract_detl ON hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            where em_cont_end<=curdate() and contract_renew_appr=1 and em_status=1 ;`,
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