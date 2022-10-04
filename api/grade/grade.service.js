const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO grade (grade_desc,grade_status,create_user)
                VALUES (?,?,?)`,
            [
                data.grade_desc,
                data.grade_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT grade_desc,
            grade_slno     
                FROM grade
                WHERE grade_desc = ?`,
            [
                data.grade_desc
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    update: (data, callBack) => {
        pool.query(
            `UPDATE grade 
                SET grade_desc = ?,
                    grade_status = ?,
                    edit_user = ?
                WHERE grade_slno = ?`,
            [
                data.grade_desc,
                data.grade_status,
                data.edit_user,
                data.grade_slno
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
            `UPDATE grade  SET grade_status = '0' WHERE grade_slno = ?`,
            [
                data.emstats_slno
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
            `SELECT grade_slno,grade_desc,grade_status,
                    if(grade_status = 1 ,'Yes','No') status
                FROM grade`,
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
            `SELECT grade_desc,grade_status,grade_slno,
                    if(grade_status = 1 ,'Yes','No') status
                FROM grade 
                WHERE grade_slno = ?`,
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