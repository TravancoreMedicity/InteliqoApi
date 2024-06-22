const zkpool = require('../../config/zkdatabase')
const pool = require('../../config/database')
module.exports = {
    getpunchdataZtech: (data, callBack) => {
        zkpool.query(
            `select * FROM zkteco.iclock_transaction where 
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

}