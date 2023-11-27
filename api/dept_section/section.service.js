const pool = require('../../config/database');


module.exports = {
    createSect: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_dept_section
            (sect_name,
            dept_id,
            dept_sub_sect,
            authorization_incharge,
            authorization_hod,
            sect_status,
            create_user)
            VALUES(?,?,?,?,?,?,?)`,
            [
                data.sect_name,
                data.dept_id,
                data.dept_sub_sect,
                data.authorization_incharge,
                data.authorization_hod,
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
                    dept_sub_sect=?,
                    authorization_incharge = ?,
                    authorization_hod = ?,
                    sect_status = ?,
                    edit_user = ?
                WHERE sect_id = ?`,
            [
                data.sect_name,
                data.dept_id,
                data.dept_sub_sect,
                data.authorization_incharge,
                data.authorization_hod,
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
            hrm_dept_section.dept_id,
            dept_sub_sect,
            sect_status,
            (case when dept_sub_sect=1 then 'General'when dept_sub_sect=2 then 'OT' when dept_sub_sect=3 then 'ICU' when dept_sub_sect=4 then 'ER' else 'Nil' end) as sub_sect_name,
            hrm_department.dept_name,
            if(authorization_incharge=1,'Yes','No')incharge,
            if(authorization_hod=1,'Yes','No')hod,
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
                dept_sub_sect,
                authorization_incharge,
                authorization_hod,
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
            WHERE dept_id = ? ORDER BY sect_name ASC`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },
    getSectionselect: (callBack) => {
        pool.query(
            `SELECT 
            sect_id,
            sect_name
        FROM hrm_dept_section order by sect_name asc; `
            ,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAuthorization: (id, callback) => {
        pool.query(
            `select authorization_incharge,
            authorization_hod
            from hrm_dept_section
            where sect_id= ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },
    getSectEmp: (id, callBack) => {
        pool.query(
            `select em_id,em_no,em_name
            from hrm_emp_master
            where em_dept_section=? and em_status=1`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT sect_name
                FROM hrm_dept_section
                WHERE sect_name = ?`,
            [
                data.sect_name,
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