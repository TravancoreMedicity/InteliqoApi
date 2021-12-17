const pool = require('../../config/database');

module.exports = {

    insertProfile: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master
                SET hrm_profile = 1
                WHERE em_id = ?`,
            [
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getProfilePic: (data, callBack) => {
        pool.query(
            `SELECT hrm_profile
                FROM hrm_emp_master
                WHERE em_id = ?`,
            [
                data.em_id
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