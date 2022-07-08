const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO designation (desg_name,desg_notice_prd,desg_status,create_user)
            VALUES (?,?,?,?)`,
            [
                data.desg_name,
                data.desg_notice_prd,
                data.desg_status,
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
            `UPDATE designation 
                SET desg_name = ?,
                    desg_notice_prd=?,
                    desg_status = ?,
                    edit_user =?
                WHERE desg_slno = ?`,
            [
                data.desg_name,
                data.desg_notice_prd,
                data.desg_status,
                data.edit_user,
                data.desg_slno
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
            `DELETE FROM designation WHERE desg_slno = ?`,
            [
                data.desg_slno
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
            `SELECT desg_slno,
                desg_name,
                desg_notice_prd,
                desg_status,
                if(desg_status = 1 ,'Yes','No') status
            FROM designation`,
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
            `SELECT desg_slno,
                    desg_name,
                    desg_notice_prd,
                    desg_status
                FROM designation 
                WHERE desg_slno = ?`,
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
    getNoticePeriod: (id, callBack) => {
        pool.query(
            `select desg_notice_prd
            from designation
            where desg_slno=?`,
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
}