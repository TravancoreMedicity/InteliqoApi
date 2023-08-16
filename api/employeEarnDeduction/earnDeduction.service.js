const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_earn_deduction (
                em_no,
                em_id,
                em_salary_desc,
                em_earning_type,
                em_amount,
                em_start_date,
                em_end_date,
                create_user               
            )
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.em_salary_desc,
                data.em_earning_type,
                data.em_amount,
                data.em_start_date,
                data.em_end_date,
                data.create_user
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
            `UPDATE hrm_emp_earn_deduction 
                SET em_amount =?,
                    em_start_date =?,
                    em_end_date=?,
                    edit_user =?                    
                WHERE ernded_slno = ?`,
            [
                data.em_amount,
                data.em_start_date,
                data.em_end_date,
                data.edit_user,
                data.ernded_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT  em_salary_desc,
                     em_no
              FROM hrm_emp_earn_deduction 
              WHERE  em_salary_desc = ?  AND em_no=?`,
            [
                data.em_salary_desc,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT  em_salary_desc,               
                     ernded_slno
                FROM hrm_emp_earn_deduction 
                WHERE  em_salary_desc!= ?  AND ernded_slno =?`,
            [
                data.em_salary_desc,
                data.ernded_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDataById: (id, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            ernded_slno,
            hrm_earning_deduction.earnded_name,
            hrm_earning_type.earning_type_name,
            em_salary_desc,
            em_status,
            em_id,
            em_no,
            em_earning_type,
            em_salary_desc,
            hrm_earning_deduction.include_esi,
            hrm_earning_deduction.include_pf,
            hrm_earning_deduction.include_lwf,
            hrm_earning_deduction.include_protax,
            em_amount,
            em_start_date,
            em_end_date
            FROM hrm_emp_earn_deduction
            LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
            LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
            WHERE em_no  = ?`,
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
    getDataBySlno: (id, callBack) => {
        pool.query(
            `SELECT 
               em_salary_desc,
               hrm_earning_type.earning_type_name,
               hrm_earning_deduction.include_esi,
               hrm_earning_deduction.include_pf,
               hrm_earning_deduction.include_lwf,
               hrm_earning_deduction.include_protax,
               em_amount,
               em_start_date,
               em_end_date
            FROM hrm_emp_earn_deduction
               LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
               LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id
            WHERE ernded_slno =?`,
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
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_earn_deduction SET em_status = 0 WHERE em_no = ?`,
            [
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createWageLog:
        (data, callBack) => {
            pool.query(
                `INSERT INTO hrm_emp_wage_log(
                    em_salary_desc,
                    earning_type,
                    emp_id ,
                    new_wage                        
            )
            VALUES (?,?,?,?)`,
                [
                    data.em_salary_desc,
                    data.em_earning_type,
                    data.em_id,
                    data.em_amount
                ],
                (error, results, feilds) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, results);
                }
            )
        },
    updateWageLog: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_wage_log
                    SET last_wage =?,
                        new_wage=?                                      
                    WHERE em_salary_desc= ? AND emp_id = ?`,
            [
                data.last_wage,
                data.em_amount,
                data.em_salary_desc,
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
    GetFixedAndEarningWage: (data, callBack) => {
        pool.query(
            `call medi_hrm.GET_FIXED_EARNING_SLARY(?);`,
            [
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDataByEmpno: (id, callBack) => {
        pool.query(
            `SELECT 
            em_no,
            em_id,
            em_salary_desc,
            em_earning_type,
            em_amount,
            em_start_date,
            em_end_date,
            create_user
            FROM hrm_emp_earn_deduction
            WHERE em_no =?`,
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
    createEmpsalRyContractRenew: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_earn_deduction (
                em_no,
                em_id,
                em_salary_desc,
                em_earning_type,
                em_amount,
                em_start_date,
                em_end_date,
                create_user               
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
    getFixedWage: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_earn_deduction.em_no,
            earning_type_name,
            earnded_name,
            em_salary_desc,
            em_amount,
            ernded_slno
             from hrm_emp_earn_deduction
             inner join hrm_earning_deduction on hrm_emp_earn_deduction.em_salary_desc=hrm_earning_deduction.earnded_id
             inner join hrm_earning_type on hrm_earning_deduction.erning_type_id=hrm_earning_type.erning_type_id
             inner join hrm_emp_master on hrm_emp_earn_deduction.em_no=hrm_emp_master.em_no
             where  hrm_earning_deduction.erning_type_id=1 and hrm_emp_earn_deduction.em_id=?`,
            [
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
    getEarning: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_earn_deduction.em_no,
            earning_type_name,
            earnded_name,
            em_salary_desc,
            em_amount,
            ernded_slno
             from hrm_emp_earn_deduction
             inner join hrm_earning_deduction on hrm_emp_earn_deduction.em_salary_desc=hrm_earning_deduction.earnded_id
             inner join hrm_earning_type on hrm_earning_deduction.erning_type_id=hrm_earning_type.erning_type_id
             inner join hrm_emp_master on hrm_emp_earn_deduction.em_no=hrm_emp_master.em_no
             where  hrm_earning_deduction.erning_type_id=2 and hrm_emp_earn_deduction.em_id=?`,
            [
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
    getDeduction: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_earn_deduction.em_no,
            earning_type_name,
            earnded_name,
            em_salary_desc,
            em_amount,
            ernded_slno
             from hrm_emp_earn_deduction
             inner join hrm_earning_deduction on hrm_emp_earn_deduction.em_salary_desc=hrm_earning_deduction.earnded_id
             inner join hrm_earning_type on hrm_earning_deduction.erning_type_id=hrm_earning_type.erning_type_id
             inner join hrm_emp_master on hrm_emp_earn_deduction.em_no=hrm_emp_master.em_no
             where  hrm_earning_deduction.erning_type_id=3 and hrm_emp_earn_deduction.em_id=?`,
            [
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
    getEmpDataByEmno: (id, callBack) => {
        pool.query(
            `SELECT 
            em_id,
            em_no, 
            em_name,
            em_name as emp_name,
             hrm_branch.branch_name,
             IF(em_gender = 1, 'Male', 'Female') gender,
             em_age_year,
              em_doj,
            dept_name, 
            sect_name,
              em_mobile,
              designation.desg_name,
              IF(em_status = 1, 'Yes', 'No') emp_status,
            recomend_salary
             FROM medi_hrm.hrm_emp_master 
             inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
             inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
             inner join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
             inner join  designation ON designation.desg_slno = hrm_emp_master.em_designation
             where em_no=?`,
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
    getALLData: (data, callBack) => {
        pool.query(
            `SELECT 
            em_id,
            em_no, 
            em_name,
            dept_name, 
            sect_name,recomend_salary
             FROM medi_hrm.hrm_emp_master 
             inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
             inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
             where em_no=? and em_department=? and em_dept_section=?;`,
            [
                data.em_no,
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
    updateEmpGrossSalary: (data, callBack) => {
        pool.query(
            `UPDATE medi_hrm.hrm_emp_master
            SET gross_salary =? ,
            salary_split_flag=?                                 
            WHERE em_id = ?;`,
            [
                data.gross_salary,
                data.salary_split_flag,
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

    newRecommended: (callBack) => {
        pool.query(
            `SELECT 
            em_id,
            em_no, 
            em_name,
            dept_name, 
            sect_name,recomend_salary
             FROM medi_hrm.hrm_emp_master 
             inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
             inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
             where salary_split_flag=0 and em_status=1  and em_no!=1`,
            [],
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
			WHERE em_no =?  and em_earning_type IN(1,2)`,
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
    createNewWageLog: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_wage_log(
                    emp_id,
                    em_no,
                    em_salary_desc,
                    earning_type,
                    last_wage,
                    new_wage,
                    entry_desc                      
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
    deleteEarntype: (id, callBack) => {
        pool.query(
            `DELETE FROM hrm_emp_earn_deduction WHERE ernded_slno = ?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}