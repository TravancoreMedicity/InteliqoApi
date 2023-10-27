const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO employee_type (
                emptype_name,
                status,
                is_type,
                create_user
                )
            VALUES (?,?,?,?)`,
            [
                data.emptype_name,
                data.el_aplicable,
                data.is_type,
                data.create_user,
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
            `UPDATE employee_type 
                SET emptype_name = ?,
                    status = ?,
                    is_type=?,
                    edit_user = ?
                WHERE emptype_slno = ?`,
            [
                data.emptype_name,
                data.el_aplicable,
                data.is_type,
                data.edit_user,
                data.emptype_slno
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
            `DELETE FROM employee_type WHERE emptype_slno = ?`,
            [
                data.emptype_slno
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
            `SELECT emptype_name,
             status,
             if(status = 1 ,'Yes','No') Astatus,
             is_type,
             emptype_slno
            FROM employee_type `,
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
            `SELECT emptype_name,
            status,
                    emptype_slno
                FROM employee_type 
                WHERE emptype_slno = ?`,
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
            `SELECT emptype_name, emptype_slno
                FROM employee_type
                WHERE emptype_name = ?`,
            [
                data.emptype_name,
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
            `SELECT emptype_name,               
            emptype_slno
            FROM employee_type
            WHERE emptype_name =?  AND emptype_slno != ?`,
            [
                data.emptype_name,
                data.emptype_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}