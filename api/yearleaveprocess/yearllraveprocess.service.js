const pool = require('../../config/database');

module.exports = {

    checkTable: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_leave_process
            WHERE em_no = '8889'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }


        )

    }







}