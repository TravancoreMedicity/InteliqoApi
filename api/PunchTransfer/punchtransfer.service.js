const zkpool = require('../../config/zkdatabase')
const pool = require('../../config/database')
module.exports = {
    getpunchdataZtech: (data, callBack) => {
        zkpool.query(
            `select * FROM iclock_transaction where 
            date(punch_time)           
                      BETWEEN ? AND ?`,
            [
                data.from,
                data.to
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getpunchDataHr: (data, callBack) => {
        pool.query(
            `select * FROM punch_data where 
            date(punch_time)           
                      BETWEEN ? AND ?`,
            [
                data.from,
                data.to
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    InsertPunchdata: (data, callBack) => {
        pool.query(
            `INSERT INTO punch_data
            (id,
                emp_code,
                punch_time,
                punch_state            
            )
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getActiveEmployee: (callBack) => {
        pool.query(
            `SELECT  em_id,em_no FROM hrm_emp_master where em_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    employeePunch: (data, callBack) => {
        zkpool.query(
            `select * FROM zkteco.iclock_transaction where 
            date(punch_time) BETWEEN ? AND ? AND emp_code IN (?)`,
            [
                data.from,
                data.to,
                data.em_no
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