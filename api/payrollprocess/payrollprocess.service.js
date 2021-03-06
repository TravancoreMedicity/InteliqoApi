
const pool = require('../../config/database');


module.exports = {
    empDeptdata: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_no,gross_salary,em_name FROM hrm_emp_master
             WHERE em_branch=? and em_department=? and em_status=1`,
            [
                data.em_branch,
                data.em_department
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    empDeptSecdata: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_no,gross_salary,em_name FROM hrm_emp_master WHERE em_branch=? 
            and em_department=? and em_dept_section=? and em_status=1`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    empNameBasedata: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_no,gross_salary,em_name FROM hrm_emp_master WHERE em_branch=?
             and em_department=? and em_dept_section=? and em_id=? and em_status=1`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section,
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
    getFixedByEmid: (id, callBack) => {
        pool.query(
            ` SELECT 
            ernded_slno,
            hrm_earning_deduction.earnded_name,           
             em_amount
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              WHERE em_id =?  and em_earning_type=1 `,
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
    getTotalFixedByEmid: (id, callBack) => {
        pool.query(
            `     SELECT 
            ernded_slno,em_id,
           sum(em_amount)total_fixed
             FROM medi_hrm.hrm_emp_earn_deduction
			WHERE em_id =?  and em_earning_type=1`,
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
    getTotalEarningsByEmid: (id, callBack) => {
        pool.query(
            `     SELECT 
            ernded_slno,em_id,
           sum(em_amount)total_fixed
             FROM medi_hrm.hrm_emp_earn_deduction
			WHERE em_id =?  and em_earning_type=2`,
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
    getEarningByEmid: (id, callBack) => {
        pool.query(
            ` SELECT 
            ernded_slno,
            hrm_earning_deduction.earnded_name,           
             em_amount
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              WHERE em_id =?  and em_earning_type=2 `,
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
    getTotalFineByEmid: (data, callBack) => {
        pool.query(
            `SELECT ifnull(sum(fine_amount),0) as fine_sum from hrm_emp_fine_detl 
            where fine_date between ? and ? AND fine_emp_id=? `,
            [
                data.startDate,
                data.endDate,
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
    getTotalDeductionByEmid: (id, callBack) => {
        pool.query(
            `     SELECT 
            ernded_slno,em_id,
           ifnull(sum(em_amount),0)total_deduction
             FROM medi_hrm.hrm_emp_earn_deduction
			WHERE em_id =? and em_earning_type=3`,
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
    getDeductionByEmid: (id, callBack) => {
        pool.query(
            ` SELECT 
            ernded_slno,
            hrm_earning_deduction.earnded_name,           
             ifnull(em_amount,0)em_amount
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              WHERE em_id =?  and em_earning_type=3`,
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
    getLopByEmid: (data, callBack) => {
        pool.query(
            `select ifnull(total_lop,0)lop from hrm_attendance_marking
            where attendance_marking_month=? and em_id=? `,
            [
                data.month,
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
    getTotalGrosssalaryById: (id, callBack) => {
        pool.query(
            ` SELECT 
            ernded_slno,em_id,
            ifnull(sum(em_amount),0)gross_salary
             FROM medi_hrm.hrm_emp_earn_deduction
			WHERE em_id =?  and em_earning_type IN(1,2)`,
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
    GetPfStatus: (id, callBack) => {
        pool.query(
            `select em_id from hrm_emp_pfesi
            where em_pf_status=1 and em_id=?`,
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
    getPFcalcalculatingamt: (id, callBack) => {
        pool.query(
            `SELECT em_id,sum(em_amount)em_amount
         FROM medi_hrm.hrm_emp_earn_deduction
          LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
          LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
          WHERE em_id =? and em_earning_type IN (1,2) and include_pf=1`,
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
    GetEsiStatus: (id, callBack) => {
        pool.query(
            `select em_id from hrm_emp_pfesi
            where em_esi_status=1 and em_id=?`,
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
    getESIcalculatingamt: (id, callBack) => {
        pool.query(
            `SELECT em_id,sum(em_amount)em_amount
         FROM medi_hrm.hrm_emp_earn_deduction
          LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
          LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
          WHERE em_id =? and em_earning_type IN (1,2) and include_esi=1`,
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