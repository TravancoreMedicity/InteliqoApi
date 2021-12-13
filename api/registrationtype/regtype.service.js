const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_registrationtype (registration_name,registration_status,create_user)
                VALUES (?,?,?)`,
            [
                data.registration_name,
                data.registration_status,
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
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT registration_name,
            registration_status
                FROM hrm_emp_registrationtype
                WHERE registration_name = ?`,
            [
                data.registration_name,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    update: (data, callBack) => {

        pool.query(
            `UPDATE hrm_emp_registrationtype 
                SET registration_name = ?,
                    registration_status = ? ,
                    edit_user = ?
                WHERE reg_id = ?`,
            [
                data.registration_name,
                data.registration_status,
                data.edit_user,
                data.reg_id,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT registration_name,
            reg_id
                FROM hrm_emp_registrationtype
                WHERE registration_name = ?  AND reg_id != ?`,
            [
                data.registration_name,
                data.reg_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_registrationtype SET registration_status = 0 WHERE reg_id = ?`,
            [
                data.reg_id
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
            `SELECT reg_id,
                registration_name,
                if(registration_status   = 1 ,'Yes','No') registration_status                         
            FROM hrm_emp_registrationtype`,
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
            `SELECT reg_id,
                    registration_name,
                    registration_status
                FROM hrm_emp_registrationtype
                WHERE reg_id = ?`,
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
    getSelect: (callBack) => {
        pool.query(
            `SELECT 
                reg_id,
                registration_name
            FROM hrm_emp_registrationtype
            WHERE registration_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
}