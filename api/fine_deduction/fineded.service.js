const pool = require('../../config/database');

module.exports = {
    createFineDed: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_fine_master (fine_desc,create_user)
            VALUES (?,?)`,
            [
                data.fine_desc,
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
            `SELECT fine_desc
                FROM hrm_fine_master
                WHERE fine_desc = ?`,
            [
                data.fine_desc,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getData: (callBack) => {
        pool.query(
            `SELECT 
                fine_slno,
                fine_desc
            FROM hrm_fine_master `,
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