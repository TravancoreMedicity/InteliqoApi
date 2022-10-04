const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_qualification (qual_name,qual_status,create_user)
            VALUES (?,?,?)`,
            [
                data.qual_name,
                data.qual_status,
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
            `SELECT qual_name,
            qual_slno     
                FROM hrm_qualification
                WHERE qual_name = ?`,
            [
                data.qual_name
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
            `UPDATE hrm_qualification 
                SET qual_name = ?,
                    qual_status = ?,
                    edit_user =?
                WHERE qual_slno = ?`,
            [
                data.qual_name,
                data.qual_status,
                data.edit_user,
                data.qual_slno
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
            `DELETE FROM hrm_qualification WHERE qual_slno = ?`,
            [
                data.qual_slno
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
            `SELECT qual_slno,
                qual_name,
                qual_status,
                if(qual_status = 1 ,'Yes','No') status
            FROM hrm_qualification`,
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
            `SELECT qual_slno,
                qual_name,
                qual_status
            FROM hrm_qualification
            WHERE qual_slno = ?`,
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