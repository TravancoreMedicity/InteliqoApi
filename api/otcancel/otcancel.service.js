const pool = require('../../config/database');
module.exports = {
    inchargecancel: (data, callBack) => {
        pool.query(
            `UPDATE hrm_ot_master 
                SET ot_reson = ?,
                    ot_remarks = ?                    
                WHERE ot_slno= ?`,
            [
                data.ot_reson,
                data.ot_remarks,
                data.ot_slno
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