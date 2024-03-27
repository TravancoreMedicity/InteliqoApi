const pool = require('../../config/database');

module.exports = {

    TrainingNameInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.training_name 
            (
                training_name, 
                type_slno,
                cate_slno,
                name_status,
                create_user
            )
            VALUES (?,?,?,?,?)`,
            [
                data.training_name,
                data.type_slno,
                data.cate_slno,
                data.name_status,
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

    TrainingNameGet: (callback) => {
        pool.query(
            `select name_slno,training_name,name_status, training_type.type_name,training_type.trainingtype_slno,training_category.trin_cat_name,training_category.cat_slno from training_name 
            left join training_type on training_type.trainingtype_slno=training_name.type_slno
            left join training_category on training_category.cat_slno=training_name.cate_slno WHERE name_status=1`, [],


            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }

        )
    },

    TrainingNameUpdate: (data, callback) => {
        pool.query(`UPDATE medi_hrm.training_name
         SET
          training_name=?,
           type_slno=?,
            cate_slno=?,
             name_status=?,
             edit_user=?
        WHERE name_slno=?`,
            [
                data.training_name,
                data.type_slno,
                data.cate_slno,
                data.name_status,
                data.edit_user,
                data.name_slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },
    TrainingNameDelete: (data, callback) => {
        pool.query(
            `UPDATE medi_hrm.training_name SET name_status=0 WHERE name_slno=?`,
            [
                data.name_slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },
    //insert
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT training_name
                FROM medi_hrm.training_name
                WHERE training_name = ?`,
            [
                data.training_name
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
            `SELECT training_name,
            name_slno
            FROM medi_hrm.training_name
            WHERE training_name =? AND name_slno = ?`,
            [
                data.training_name,
                data.name_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}


