const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO employee_type (emptype_name,cont_period,cont_grace,el_aplicable,create_user)
            VALUES (?,?,?,?,?)`,
            [
                data.emptype_name,
                data.cont_period,
                data.cont_grace,
                data.el_aplicable,
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
            `UPDATE employee_type 
                SET emptype_name = ?,
                    cont_period = ? ,
                    cont_grace = ?,
                    el_aplicable = ?,
                    edit_user = ?
                WHERE emptype_slno = ?`,
            [
                data.emptype_name,
                data.cont_period,
                data.cont_grace,
                data.el_aplicable,
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
                cont_period,
                cont_grace,
                if(el_aplicable = 1 ,'Yes','No') status,
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
                    cont_period,
                    cont_grace,
                    el_aplicable,
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
    }
}