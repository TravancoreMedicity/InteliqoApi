const pool = require('../../config/database');
module.exports = {
    insertmessage: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_message 
                (message_dept,
                    message_deptsec,
                    emp_id,
                    message,
                    expr_date,
                    created_user
                  )
                VALUES (?,?,?,?,?,?)`,
            [
                data.message_dept,
                data.message_deptsec,
                data.emp_id,
                data.message,
                data.expr_date,
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
    getMesssage: (id, callBack) => {
        pool.query(
            `select * from hrm_message
            where expr_date >=CURDATE() 
            and emp_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

}