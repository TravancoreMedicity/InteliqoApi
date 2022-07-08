const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_gross_salary (em_no, em_id, gross_salary, updated_user)
             VALUES (?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.gross_salary,
                data.updated_user
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