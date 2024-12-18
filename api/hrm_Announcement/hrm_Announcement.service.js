const pool = require('../../config/database');
module.exports = {
    insertannouncement: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_announcement 
                (Announcementheading,
                    Announcement,
                    expr_days,
                    created_user
                    )
                VALUES (?,?,?,?)`,
            [
                data.Announcementheading,
                data.Announcement,
                data.expr_days,
                data.created_user,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAnnouncement: (callBack) => {
        pool.query(
            `select * from hrm_announcement
            where expr_days >=CURDATE();`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getBirthdayEmployee: (callBack) => {
        pool.query(
            `SELECT em_id,em_name,em_no, sect_name FROM hrm_emp_master
            inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            where DATE_FORMAT(em_dob, '%m-%d') = DATE_FORMAT(CURRENT_DATE() , '%m-%d') and em_status=1; `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
}