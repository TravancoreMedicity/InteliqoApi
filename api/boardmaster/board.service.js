const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_board (
                board_name,
                education_slno,
                board_status,
                create_user
            )
            VALUES (?,?,?,?)`,
            [
                data.board_name,
                data.education_slno,
                data.board_status,
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
            `SELECT board_name,
            board_status
                FROM hrm_board
                WHERE board_name = ? and education_slno=?`,
            [
                data.board_name,
                data.education_slno,
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
            `UPDATE hrm_board
                SET board_name =?,
                education_slno =?,
                board_status =?,
                edit_user=?
                WHERE board_slno =?`,
            [
                data.board_name,
                data.education_slno,
                data.board_status,
                data.edit_user,
                data.board_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT board_name,
            board_slno
                FROM hrm_board
                WHERE board_name = ?  AND board_slno != ?`,
            [
                data.board_name,
                data.board_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getData: (callBack) => {
        pool.query(
            `SELECT board_slno,
            board_name,
            hrm_mast_education.edu_desc, 
            if(board_status = 1 , 'Yes','No') board_status,
            create_user
      FROM hrm_board
       LEFT JOIN hrm_mast_education ON hrm_board.education_slno = hrm_mast_education.edu_slno`,
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
            board_slno,
                board_name,
                education_slno,
                board_status
            FROM hrm_board
            WHERE board_slno = ?`,
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
    getSelect: (callBack) => {
        pool.query(
            `SELECT 
            board_slno
                board_name
            FROM hrm_board 
            WHERE board_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}