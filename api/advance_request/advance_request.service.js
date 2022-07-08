const pool = require('../../config/database');

module.exports = {
    InsertAdvanceRequest: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_advance_request 
                    (
                    advance_id,
                    em_id,
                    em_no,
                    dept_id,
                    dept_sect,
                    requested_amount,
                    allowable_amount,
                    noof_installment,
                    incharge_level,
                    hod_level,
                    ceo_level,
                    adv_req_date
                    ) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.advance_id,
                data.em_id,
                data.em_no,
                data.dept_id,
                data.dept_sect,
                data.requested_amount,
                data.allowable_amount,
                data.noof_installment,
                data.incharge_level,
                data.hod_level,
                data.ceo_level,
                data.adv_req_date
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
