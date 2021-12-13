const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO institution_type (inst_emp_type,inst_emp_status,create_user) 
            VALUES(?,?,?)`,
            [
                data.inst_emp_type,
                data.inst_emp_status,
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
            `UPDATE institution_type
                SET inst_emp_type = ?,
                    inst_emp_status = ?,
                    edit_user = ?
                WHERE inst_slno = ?`,
            [
                data.inst_emp_type,
                data.inst_emp_status,
                data.edit_user,
                data.inst_slno
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
            `DELETE FROM institution_type WHERE inst_slno = ?`,
            [
                data.inst_slno
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
            `SELECT inst_slno,
                inst_emp_type,
                inst_emp_status,
                if(inst_emp_status = 1 ,'Yes','No') status
            FROM institution_type`,
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
            `SELECT inst_slno,
                inst_emp_type,
                inst_emp_status
            FROM institution_type
            WHERE inst_slno = ?`,
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