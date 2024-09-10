const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO designation (desg_name,desg_notice_prd,desg_status,create_user,desg_grade)
            VALUES (?,?,?,?,?)`,
            [
                data.desg_name,
                data.desg_notice_prd,
                data.desg_status,
                data.create_user,
                data.grade
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
            `UPDATE designation 
                SET desg_name = ?,
                    desg_notice_prd=?,
                    desg_status = ?,
                    edit_user =?,
                    desg_grade=?
                WHERE desg_slno = ?`,
            [
                data.desg_name,
                data.desg_notice_prd,
                data.desg_status,
                data.edit_user,
                data.grade,
                data.desg_slno
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
            `DELETE FROM designation WHERE desg_slno = ?`,
            [
                data.desg_slno
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
            ROW_NUMBER() OVER () as slno,
            desg_slno,
                desg_name,
                desg_notice_prd,
                desg_status,
                desg_grade,
                grade_desc,
                if(desg_status = 1 ,'Yes','No') status
            FROM designation 
            LEFT JOIN grade ON grade.grade_slno = designation.desg_grade
            order by desg_name ASC`,
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
            `SELECT desg_slno,
                    desg_name,
                    desg_notice_prd,
                    desg_status
                FROM designation 
                WHERE desg_slno = ?`,
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
    },
    getNoticePeriod: (id, callBack) => {
        pool.query(
            `select desg_notice_prd
            from designation
            where desg_slno=?`,
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
    },
}