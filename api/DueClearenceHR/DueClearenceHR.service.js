const pool = require('../../config/database');
module.exports = {
    createDueHrApproval: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_due_clearence_hr (
                duehr_empid,
                due_hr_deptsec,
                due_mast_id,
                hr_due_desc,
                due_status
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
        )
    },
}