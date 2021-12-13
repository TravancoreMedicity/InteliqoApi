const pool = require('../../config/database');

module.exports = {
    createDept: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_department
            (dept_name,
            dept_alias,
            dept_status,
            create_user)
            VALUES(?,?,?,?)`,
            [
                data.dept_name,
                data.dept_alias,
                data.dept_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateDept: (data, callBack) => {

        pool.query(
            `UPDATE hrm_department 
                SET dept_name = ?,
                    dept_alias = ?,
                    dept_status = ?,
                    edit_user = ?
                WHERE dept_id = ?`,
            [
                data.dept_name,
                data.dept_alias,
                data.dept_status,
                data.edit_user,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteDept: (data, callBack) => {
        pool.query(
            `DELETE FROM hrm_department WHERE dept_id = ?`,
            [
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDept: (callBack) => {
        pool.query(
            `SELECT dept_id,
                dept_name,
                dept_alias,
                if(dept_status = 1 ,'Yes','No') status
            FROM hrm_department`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDeptById: (id, callBack) => {
        pool.query(
            `SELECT dept_id,
                dept_name,
                dept_alias,
                dept_status
            FROM hrm_department
            WHERE dept_id = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}