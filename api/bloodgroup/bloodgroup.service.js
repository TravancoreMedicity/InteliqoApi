const pool = require('../../config/database');

module.exports = {

    create: (data, callback) => {
        pool.query(
            `INSERT INTO bloodgroup (group_name,group_status)
            VALUES(?,?)`,
            [
                data.group_name,
                data.group_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    update: (data, callBack) => {
        pool.query(
            `UPDATE bloodgroup
                SET group_name = ?
                    group_status = ?
            WHERE group_slno = ?`,
            [
                data.group_slno,
                data.group_name,
                data.group_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteByid: (data, callBack) => {
        pool.query(
            `UPDATE bloodgroup
                SET group_status = '1'
                WHERE group_slno = ?`,
            [
                data.group_slno
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
            `SELECT group_slno,group_name,
                    if(group_status = 1 , 'Yes', 'No') group_status
            FROM bloodgroup`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDataselect: (callBack) => {
        pool.query(
            `SELECT group_slno,group_name FROM bloodgroup where group_status='0'`,
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
            `SELECT group_slno,group_name,
                if(group_status = 1 , 'Yes', 'No') group_status
                FROM bloodgroup
                WHERE group_slno = ?`,
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