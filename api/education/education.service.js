const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_mast_education (
                edu_desc,
                edu_status,
                edu_create
            )
            VALUES (?,?,?)`,
            [
                data.edu_desc,
                data.edu_status,
                data.edu_create
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
            `SELECT edu_desc,
            edu_status
                FROM hrm_mast_education
                WHERE edu_desc = ?`,
            [
                data.edu_desc,
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
            `UPDATE hrm_mast_education
                SET edu_desc =?,
                    edu_status =?,
                    edu_edit = ?
                WHERE edu_slno = ? `,
            [
                data.edu_desc,
                data.edu_status,
                data.edu_edit,
                data.edu_slno
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
            `SELECT edu_desc,
               
                 edu_slno
                FROM hrm_mast_education
                WHERE edu_desc = ?  AND edu_slno != ?`,
            [
                data.edu_desc,

                data.edu_slno
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
            `UPDATE hrm_mast_education SET edu_status = 0 WHERE edu_slno =?`,
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
            `SELECT 
                edu_slno,
                edu_desc,
                edu_create,
                if(edu_status = 1 ,'Yes','No') edu_status
            FROM hrm_mast_education`,
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
                edu_slno,
                edu_desc,
                edu_status
            FROM hrm_mast_education
            WHERE edu_slno = ?`,
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
                edu_slno,
                edu_desc
            FROM hrm_mast_education 
            WHERE edu_status = 1`,
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