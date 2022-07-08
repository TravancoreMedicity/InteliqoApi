const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_leave_request_type (lrequest_type,lrequest_short,lrequest_status,create_user)
            VALUES (?,?,?,?)`,
            [
                data.lrequest_type,
                data.lrequest_short,
                data.lrequest_status,
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
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_request_type
                SET lrequest_type = ?,
                lrequest_short=?,
                lrequest_status = ?,
                    edit_user = ?
                WHERE lrequest_slno = ?`,
            [
                data.lrequest_type,
                data.lrequest_short,
                data.lrequest_status,
                data.edit_user,
                data.lrequest_slno
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
            `SELECT lrequest_type,
            lrequest_status
                FROM hrm_leave_request_type
                WHERE lrequest_type = ?`,
            [
                data.lrequest_type,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT lrequest_type,               
                lrequest_slno
                FROM hrm_leave_request_type
                WHERE lrequest_type = ?  AND lrequest_slno != ?`,
            [
                data.lrequest_type,
                data.lrequest_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_request_type SET lrequest_status = 0 WHERE lrequest_slno = ?`,
            [
                data.lrequest_slno
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
            lrequest_slno,
             lrequest_type,
             lrequest_short,
                if(lrequest_status = 1 ,'Yes','No')lrequest_status
            FROM hrm_leave_request_type `,
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
            lrequest_slno,
                lrequest_type,
                lrequest_short,
                lrequest_status
            FROM hrm_leave_request_type
            WHERE lrequest_slno = ?`,
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
            lrequest_slno,
            lrequest_short,
            lrequest_type
            FROM hrm_leave_request_type
            WHERE lrequest_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    emplv_list: (data, callBack) => {
        pool.query(
            `call medi_hrm.GET_LEAVEDETL(?)`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}