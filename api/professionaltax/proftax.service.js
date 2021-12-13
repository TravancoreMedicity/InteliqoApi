const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_professional_tax (prof_tax_desc,prof_status,salary_from,salary_to,tax_amt)
                VALUES(?,?,?,?,?)`,
            [
                data.prof_tax_desc,
                data.prof_status,
                data.salary_from,
                data.salary_to,
                data.tax_amt
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_professional_tax
                SET prof_tax_desc = ?
                    prof_status = ?,
                    salary_from = ?,
                    salary_to = ?,
                    tax_amt = ?
                WHERE proftax_id = ?`,
            [
                data.prof_tax_desc,
                data.prof_status,
                data.salary_from,
                data.salary_to,
                data.tax_amt,
                data.proftax_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_professional_tax SET prof_status = 0 WHERE proftax_id = ?`,
            [
                data.earnded_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getData: (callBack) => {
        pool.query(
            `SELECT 
                proftax_id,
                prof_tax_desc,
                salary_from,
                salary_to,
                tax_amt,
                if(prof_status = 1 ,'Yes','No' ) status
            FROM hrm_professional_tax`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDataById: (id, callBack) => {
        pool.query(
            `SELECT 
                proftax_id,
                prof_tax_desc,
                salary_from,
                salary_to,
                tax_amt,
                prof_status
            FROM hrm_professional_tax
            WHERE proftax_id = ?`,
            [
                id
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