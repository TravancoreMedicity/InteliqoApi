const pool = require('../../config/database');
module.exports = {
    insertalert: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_alert 
                (alert_branch,
                    alert_department,
                    aler_deptsec,
                    emp_category,
                    designation,
                    alert,
                    alert_expr_date,
                    create_date,
                    create_user)
                VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.alert_branch,
                data.alert_department,
                data.aler_deptsec,
                data.emp_category,
                data.designation,
                data.alert,
                data.alert_expr_date,
                data.create_date,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAlert: (callBack) => {
        pool.query(
            `select * from hrm_alert
            where alert_expr_date >=CURDATE();`,
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