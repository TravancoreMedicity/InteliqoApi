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
            `SELECT ernded_slno,
                    hrm_earning_deduction.earnded_name,
                    hrm_earning_type.earning_type_name,
                    em_amount
                FROM hrm_emp_earn_deduction
                LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
                LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
                WHERE em_no = ? `,
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
}