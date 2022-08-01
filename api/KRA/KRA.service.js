const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_kra (
                kra_desc,
                kra_status
                )
            VALUES (?,?)`,
            [
                data.kra_desc,
                data.krastatus,
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
            `UPDATE hrm_kra
                SET kra_desc = ?,
                kra_status = ?
                WHERE kra_slno =?`,
            [
                data.kra_desc,
                data.kra_status,
                data.kra_slno
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
            `DELETE FROM hrm_kra WHERE kra_slno = ?`,
            [
                data.reg_slno
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
            `SELECT kra_slno,
            kra_desc,
             if(kra_status = 1 ,'Yes','No') kra_status
        FROM hrm_kra`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDataByStatus: (callBack) => {
        pool.query(
            `SELECT kra_slno,
            kra_desc
          FROM hrm_kra where kra_status=1`,
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
            `SELECT kra_slno,
            kra_desc,
            kra_status
            WHERE kra_slno = ?`,
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