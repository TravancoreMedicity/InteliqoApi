const pool = require('../../config/database');
module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO common_request_master (
                request_name,
                request_status,
                create_user,
                update_user  
                )
                VALUES (?,?,?,?)`,
            [

                data.request_name,
                data.request_status,
                data.create_user,
                data.update_user
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT * FROM common_request_master WHERE request_name = ?`,
            [
                data.request_name
            ],
            (error, results) => {
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
            ROW_NUMBER() OVER () as serialno,
            slno,
            request_name,
            request_status,
            if(request_status = 1 , 'Yes','No') status
            FROM common_request_master`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    update: (data, callBack) => {
        pool.query(
            `UPDATE common_request_master
                SET request_name =?,
                request_status =?
                WHERE slno =?`,
            [
                data.request_name,
                data.request_status,
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT request_name,
            slno
                FROM common_request_master
                WHERE request_name = ?  AND slno != ?`,
            [
                data.request_name,
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteReqstName: (id, callBack) => {
        pool.query(
            `DELETE FROM common_request_master WHERE slno = ?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}