const pool = require('../../config/database');


module.exports = {
    createSect: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_dept_section
            (sect_name,
            dept_id,
            sect_status,
            create_user)
            VALUES(?,?,?,?)`,
            [
                data.sect_name,
                data.dept_id,
                data.sect_status,
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
    updateSect: (data, callBack) => {
        pool.query(
            `UPDATE hrm_dept_section 
                SET sect_name = ?,
                    dept_id = ?,
                    sect_status = ?,
                    edit_user = ?
                WHERE sect_id = ?`,
            [
                data.sect_name,
                data.dept_id,
                data.sect_status,
                data.edit_user,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteSect: (data, callBack) => {
        pool.query(
            `DELETE FROM hrm_dept_section WHERE sect_id = ?`,
            [
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSect: (callBack) => {
        pool.query(
            `SELECT sect_id,
                sect_name,
                hrm_department.dept_name,
                if(sect_status = 1,'Yes','No') status
            FROM hrm_dept_section
            LEFT JOIN hrm_department ON hrm_dept_section.dept_id = hrm_department.dept_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSectById: (id, callBack) => {
        pool.query(
            `SELECT sect_id,
                sect_name,
                dept_id,
                sect_status status
            FROM hrm_dept_section
            WHERE sect_id = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSelectedSectionByDept: (id, callback) => {
        pool.query(
            `SELECT 
                sect_id,
                sect_name
            FROM hrm_dept_section 
            WHERE dept_id = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    }
}