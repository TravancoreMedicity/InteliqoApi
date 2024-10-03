const pool = require('../../config/database');

module.exports = {

    TrainingSubTypeInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO training_subtype_master (training_type_no, subtype_name, subtype_count, subtype_status, create_user)
            VALUES (?,?,?,?,?)`,
            [
                data.training_type_no,
                data.subtype_name,
                data.subtype_count,
                data.subtype_status,
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

    TrainingSubTypeGet: (callback) => {
        pool.query(
            `	SELECT subtype_slno, training_type_no, subtype_name, subtype_count, subtype_status,training_type.trainingtype_slno,training_type.type_name
            FROM training_subtype_master
            LEFT JOIN training_type ON training_type.trainingtype_slno =training_subtype_master.training_type_no 
            WHERE subtype_status=1`, [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }

        )
    },

    TrainingSubTypeUpdate: (data, callBack) => {
        pool.query(
            `UPDATE training_subtype_master
        SET
        training_type_no=?,
        subtype_name=?,
        subtype_count=?,
        subtype_status=?,
        update_user=?
        WHERE subtype_slno=?`,
            [
                data.training_type_no,
                data.subtype_name,
                data.subtype_count,
                data.subtype_status,
                data.update_user,
                data.subtype_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    //validation
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT training_type_no,subtype_name
                FROM training_subtype_master
                WHERE training_type_no=? and subtype_name = ?`,
            [
                data.training_type_no,
                data.subtype_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    // //update
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT training_type_no,subtype_name
            FROM training_subtype_master
            WHERE training_type_no=? and subtype_name =?  AND subtype_slno != ?`,
            [
                data.training_type_no,
                data.subtype_name,
                data.subtype_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    TrainingSubTypeDelete: (data, callback) => {
        pool.query(
            `UPDATE training_subtype_master SET subtype_status=0 WHERE Subtype_slno=? `,
            [
                data.Subtype_slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },
}