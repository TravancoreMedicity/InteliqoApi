const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_exp (
                em_no,
                em_id,
                em_institution,
                em_designation,
                em_from,
                em_to,
                em_total_year,
                em_salary,
                is_tmch,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.em_institution,
                data.em_designation,
                data.em_from,
                data.em_to,
                data.em_total_year,
                data.em_salary,
                data.tmch_exp,
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
            `UPDATE hrm_emp_exp
                SET em_no = ?,
                em_id =?,
                em_institution = ?,
                is_tmch=?,
                    em_designation =?,
                    em_from =?,
                    em_to =?,
                    em_total_year =?,
                    em_salary =?,
                    edit_user =?
                WHERE emexp_slno = ?`,
            [
                data.em_no,
                data.em_id,
                data.em_institution,
                data.tmch_exp,
                data.em_designation,
                data.em_from,
                data.em_to,
                data.em_total_year,
                data.em_salary,
                data.edit_user,
                data.emexp_slno,
            ],
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
                emexp_slno, 
                em_no,
                em_institution,
                em_designation,
                em_from,
                is_tmch,
                em_to,
                em_total_year,
                em_salary
            FROM hrm_emp_exp
            WHERE emexp_slno = ?`,
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
    getSelectAllDataById: (id, callBack) => {
        pool.query(
            `SELECT
            emexp_slno, 
            em_no,
            em_institution,
            is_tmch,
            em_designation,
            em_from,
            em_to,
            TIMESTAMPDIFF( YEAR, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day',
            em_total_year,
            em_salary,
        desg_name
        FROM hrm_emp_exp
        left join designation
        on designation.desg_slno=hrm_emp_exp.em_designation
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
    getDataByEmpno: (id, callBack) => {
        pool.query(
            `SELECT
                em_no,
                em_id,
                em_institution,
                em_designation,
                em_from,
                em_to,
                em_total_year,
                em_salary,
                is_tmch,
                create_user
            FROM hrm_emp_exp
            WHERE em_no = ?`,
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