
const pool = require('../../config/database');

module.exports = {
    getdeptSec: (callBack) => {
        pool.query(
            `SELECT 	
                doctype_slno,
                doctype_desc
            FROM doctor_type 
            WHERE doctype_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}