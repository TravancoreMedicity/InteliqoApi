const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_mast_course (
                cour_desc,
                edu_slno,
                cour_status,
                cour_created
            )
            VALUES (?,?,?,?)`,
            [
                data.cour_desc,
                data.edu_slno,
                data.cour_status,
                data.cour_created
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
            `SELECT cour_desc,
            cour_status
                FROM hrm_mast_course
                WHERE cour_desc = ?`,
            [
                data.cour_desc,
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
            `UPDATE hrm_mast_course
                SET cour_desc =?,
                    edu_slno =?,
                    cour_status =?,
                    cour_edit=?
                WHERE cour_slno =?`,
            [
                data.cour_desc,
                data.edu_slno,
                data.cour_status,
                data.cour_edit,
                data.cour_slno
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
            `SELECT cour_desc,
                cour_slno
                FROM hrm_mast_course
                WHERE cour_desc = ?  AND cour_slno != ?`,
            [
                data.cour_desc,

                data.cour_slno
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
            `UPDATE hrm_mast_course SET cour_status = 0 WHERE cour_slno = ?`,
            [
                data.relg_slno
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
            `SELECT cour_slno,
            cour_desc,
            hrm_mast_education.edu_desc, 
            if(cour_status = 1 , 'Yes','No') cour_status,
            cour_created
      FROM hrm_mast_course
       LEFT JOIN hrm_mast_education ON hrm_mast_course.edu_slno = hrm_mast_education.edu_slno`,
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
            `SELECT 
                cour_slno,
                cour_desc,
                edu_slno,
                cour_status
            FROM hrm_mast_course
            WHERE cour_slno = ?`,
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
                cour_slno
                cour_desc
            FROM hrm_mast_course 
            WHERE cour_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}