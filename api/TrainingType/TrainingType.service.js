const pool = require('../../config/database');

module.exports = {
    TrainingTypeInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO training_type (
                trainingtype_slno, type_name,count_day, type_status,create_user
            )
            VALUES (?,?,?,?,?)`,
            [
                data.trainingtype_slno,
                data.type_name,
                data.count_day,
                data.type_status,
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

    TrainingTypeGet: (callback) => {
        pool.query(`
        SELECT trainingtype_slno, type_name,count_day, type_status FROM training_type WHERE type_status=1`, [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }

        )
    },
    TrainingTypeUpdate: (data, callback) => {
        pool.query(`UPDATE training_type SET 
         type_name=?,
         count_day=?,
          type_status=?,
          edit_user=?
         WHERE trainingtype_slno=?`,
            [
                data.type_name,
                data.count_day,
                data.type_status,
                data.edit_user,
                data.trainingtype_slno,

            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },
    TrainingTypeDelete: (data, callback) => {
        pool.query(
            `UPDATE training_type 
            SET type_status=0
             WHERE trainingtype_slno=?`,
            [
                data.trainingtype_slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },

    //validation
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT type_name
                FROM training_type
                WHERE type_name = ?`,
            [
                data.type_name,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    //update
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT type_name,               
            trainingtype_slno
            FROM training_type
            WHERE type_name =?  AND trainingtype_slno != ?`,
            [
                data.type_name,
                data.trainingtype_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    }

}