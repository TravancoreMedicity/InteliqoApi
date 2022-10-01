const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_highlevel_master (
                highlevel_name,
                highlevel_status
                )
            VALUES (?,?)`,
            [
                data.highlevel_name,
                data.highlevel_status,
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
            `SELECT highlevel_slno,
            highlevel_name,
            if(highlevel_status = 1 ,'Yes','No') highlevel_status
                    FROM hrm_highlevel_master;`,
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
            `SELECT highlevel_slno,
            highlevel_name,
            highlevel_status
            from hrm_highlevel_master
            WHERE highlevel_slno = ?;`,
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
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_highlevel_master
            SET highlevel_name =?,
                highlevel_status =?
            WHERE highlevel_slno = ?; `,
            [
                data.highlevel_name,
                data.highlevel_status,
                data.highlevel_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}