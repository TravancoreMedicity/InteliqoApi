const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_professional_tax (prof_tax_desc,salary_from,salary_to,tax_amt,prof_status)
                VALUES(?,?,?,?,?)`,
            [
                data.prof_tax_desc,
                data.salary_from,
                data.salary_to,
                data.tax_amt,
                data.prof_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_professional_tax
                SET prof_tax_desc = ?,                   
                    salary_from = ?,
                    salary_to = ?,
                    tax_amt = ?,
                    prof_status = ?
                WHERE proftax_id = ?`,
            [
                data.prof_tax_desc,
                data.salary_from,
                data.salary_to,
                data.tax_amt,
                data.prof_status,
                data.proftax_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_professional_tax SET prof_status = 0 WHERE proftax_id = ?`,
            [
                data.earnded_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getData: (callBack) => {
        pool.query(
            `SELECT 
                proftax_id,
                prof_tax_desc,
                salary_from,
                salary_to,
                tax_amt,
                if(prof_status = 1 ,'Yes','No' ) status
            FROM hrm_professional_tax`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDataById: (id, callBack) => {
        pool.query(
            `SELECT 
                proftax_id,
                prof_tax_desc,
                salary_from,
                salary_to,
                tax_amt,
                prof_status
            FROM hrm_professional_tax
            WHERE proftax_id = ?`,
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
    getempMaster: (data, callBack) => {
        pool.query(
            `select em_id,em_no, em_name ,em_category,emp_type,gross_salary FROM hrm_emp_master 
            LEFT JOIN hrm_emp_category ON hrm_emp_category.category_slno=hrm_emp_master.em_category
            where em_branch=? and em_department=? and em_dept_section=? and emp_type=?`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section,
                data.emp_type
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    InsertEmpProTax: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_pro_tax (pro_emp_id,pro_emp_no,pro_emp_name,pro_gross_salary,pro_tax)
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

    getempProfTaxData: (data, callBack) => {
        pool.query(
            `select * from hrm_emp_pro_tax where date(pro_tax_date) between DATE_SUB(CURDATE(), INTERVAL 6 MONTH) and CURDATE()`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section,
                data.emp_type
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