const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_salary_increment
             (
                em_id,
                em_no,
                em_salary_desc,
                last_amount,
                incr_start_date,
                incre_type,
                incre_amount,
                incre_last_changed_date,
                incre_process_status,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.em_salary_desc,
                data.last_amount,
                data.incr_start_date,
                data.incre_type,
                data.incre_amount,
                data.incre_last_changed_date,
                'N',
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
            `UPDATE hrm_salary_increment
                SET em_salary_desc = ?,
                em_no =?,
                last_amount = ?,
                incr_start_date =?,
                incre_type =?,
                incre_amount =?,                   
                edit_user=?
                WHERE incre_slno = ?`,
            [
                data.em_salary_desc,
                data.em_no,
                data.last_amount,
                data.incr_start_date,
                data.incre_type,
                data.incre_amount,
                data.edit_user,
                data.incre_slno
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
            incre_slno, 
            em_salary_desc,
            em_id,
            em_no,
            incr_start_date,
            incre_type,
            incre_amount,
            incre_process_status,
            incre_process_date,
            incre_process_user,
            incre_last_changed_date,
            create_user
            FROM hrm_salary_increment
            WHERE incre_slno = ?`,
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
            incre_slno, 
            em_salary_desc,
            em_id,
            em_no,
            DATE_FORMAT(incr_start_date, '%d-%m-%Y')incr_start_date,
            incre_type,
            incre_amount,
            incre_process_status,
            incre_process_date,
            incre_process_user,
            incre_last_changed_date,
            create_user
            FROM hrm_salary_increment
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
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT em_salary_desc,em_no,incre_amount,incre_process_status
            from hrm_salary_increment
            where incre_process_status!='Y' 
            and em_salary_desc=? 
            and em_no=?`,
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
    createSalary: (data, callBack) => {
        pool.query(
            `SELECT
            incre_slno,
            em_id,
            em_no, 
            hrm_salary_increment.em_salary_desc,
            hrm_salary_increment.em_id,
            hrm_salary_increment.em_no,
			incr_start_date,hrm_earning_deduction.earnded_name,
            last_amount,
            incre_type,
            incre_amount,
            incre_process_status,
            incre_process_date,
            incre_process_user,
            incre_last_changed_date,
            hrm_salary_increment.create_user
            FROM hrm_salary_increment
            LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_salary_increment.em_salary_desc
              WHERE em_no =? AND em_salary_desc=?`,
            [
                data.em_no,
                data.em_salary_desc

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    createNewArray: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_salary_increment
             (
                em_id,
                em_no,
                em_salary_desc,
                incr_start_date,
                incre_amount
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