const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_religion (relg_name,relg_status,create_user)
            VALUES (?,?,?)`,
            [
                data.relg_name,
                data.relg_status,
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
            `UPDATE hrm_religion
                SET relg_name = ?,
                    relg_status =?,
                    edit_user = ?
                WHERE relg_slno = ?`,
            [
                data.relg_name,
                data.relg_status,
                data.edit_user,
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
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_religion SET relg_status = 0 WHERE relg_slno = ?`,
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
                relg_slno,
                relg_name,
                relg_status
            FROM hrm_religion`,
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
                relg_slno,
                relg_name,
                relg_status
            FROM hrm_religion
            WHERE relg_slno = ?`,
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
                relg_slno,
                relg_name
            FROM hrm_religion
            WHERE relg_status = 1`,
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