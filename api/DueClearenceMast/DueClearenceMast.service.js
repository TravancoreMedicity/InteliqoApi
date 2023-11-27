const pool = require('../../config/database');
module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO due_clearence_mastrer (
                due_desc,
                due_shortname,
                due_status,
                create_user)
            VALUES (?,?,?,?)`,
            [
                data.due_desc,
                data.due_shortname,
                data.due_status,
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
            `SELECT due_desc,
            duemast_slno     
                FROM due_clearence_mastrer
                WHERE due_desc = ?`,
            [
                data.due_desc
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
            `UPDATE due_clearence_mastrer
                SET due_desc = ?,
                due_shortname = ?,
                due_status =?,
                edit_user = ?
                WHERE duemast_slno =?`,
            [
                data.due_desc,
                data.due_shortname,
                data.due_status,
                data.edit_user,
                data.duemast_slno
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
            `DELETE FROM due_clearence_mastrer WHERE duemast_slno = ?`,
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
            `SELECT duemast_slno,
            due_desc,due_shortname,
            due_status,
            if(due_status = 1 ,'Yes','No') status
            FROM due_clearence_mastrer`,
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
            `SELECT duemast_slno,
            due_desc,
            due_shortname,
            due_status
            FROM due_clearence_mastrer
            WHERE duemast_slno = ?`,
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