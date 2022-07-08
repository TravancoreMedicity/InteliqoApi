const pool = require('../../config/database');
module.exports = {
    insertannouncement: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_announcement 
                (Announcement,
                    expr_days,
                    created_user
                    )
                VALUES (?,?,?)`,
            [
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
}