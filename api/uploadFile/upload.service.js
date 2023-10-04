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
    },
    insertPersonalRecord: (data, callBack) => {
        pool.query(
            `INSERT INTO  file_checklist 
                SET emid = ?,
                em_name=?,
                department=?,
                dept_section=?,
                personal_record_id=?,
                record_name=?,
                upload_status=1
                `,
            [
                data.em_id,
                data.em_name,
                data.dept_name,
                data.sect_name,
                data.checklistid,
                data.itemname,
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