const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_university (unver_name,unver_status,unver_alias,create_user)
                VALUES (?,?,?,?)`,
            [
                data.unver_name,
                data.unver_status,
                data.unver_alias,
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
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT unver_name,
            unver_slno     
                FROM hrm_university
                WHERE unver_name = ?`,
            [
                data.unver_name
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
            `UPDATE hrm_university 
                SET unver_name = ?,
                    unver_status = ?,
                    unver_alias=?,
                    edit_user = ?
                WHERE unver_slno = ?`,
            [
                data.unver_name,
                data.unver_status,
                data.unver_alias,
                data.edit_user,
                data.unver_slno,

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
            `DELETE FROM hrm_university WHERE unver_slno = ?`,
            [
                data.unver_slno
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
            `SELECT unver_slno,
                unver_name,
                unver_alias,
                if(unver_status = 1 ,'Yes','No') unver_status
            FROM hrm_university`,
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
            `SELECT unver_slno,
                unver_name,
                unver_status,
                unver_alias
            FROM hrm_university
            WHERE unver_slno = ?`,
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