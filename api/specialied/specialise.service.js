const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_specialized (spec_name,spec_status)
            VALUES (?,?)`,
            [
                data.spec_name,
                data.spec_status
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
            `UPDATE hrm_specialized
                SET spec_name = ? ,
                    spec_status = ? 
                WHERE spec_slno = ? `,
            [
                data.spec_name,
                data.spec_status,
                data.spec_slno
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
            `DELETE FROM hrm_specialized WHERE spec_slno = ?`,
            [
                data.spec_slno
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
            `SELECT spec_slno,
                spec_name,
                spec_status,
                if(spec_status = 1 ,'Active','Inactive') status
            FROM hrm_specialized`,
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
            `SELECT spec_slno,
                spec_name,
                spec_status
            FROM hrm_specialized
            WHERE spec_slno = ?`,
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