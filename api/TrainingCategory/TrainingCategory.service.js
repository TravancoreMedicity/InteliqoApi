const pool = require('../../config/database');

module.exports = {

    TrainingCategoryInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.training_category (trning_typeslno, trin_cat_name, cat_status,create_user)
            VALUES (?,?,?,?)`,
            [
                data.trning_typeslno,
                data.trin_cat_name,
                data.cat_status,
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

    TrainingCategoryGet: (callback) => {
        pool.query(
            `SELECT training_category.cat_slno,training_type.type_name,training_category.trin_cat_name,training_category.cat_status,training_type.trainingtype_slno
            FROM training_category LEFT JOIN training_type ON training_category. trning_typeslno=training_type.trainingtype_slno WHERE cat_status=1`, [],


            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }

        )
    },


    TrainingCategoryUpdate: (data, callback) => {
        pool.query(`UPDATE medi_hrm.training_category
         SET
         trning_typeslno=?,
        trin_cat_name=?,
        cat_status=?,
        edit_user=?
        WHERE cat_slno=?`,
            [
                data.trning_typeslno,
                data.trin_cat_name,
                data.cat_status,
                data.edit_user,
                data.cat_slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },
    TrainingCategoryDelete: (data, callback) => {
        pool.query(
            `UPDATE medi_hrm.training_category SET cat_status=0 WHERE cat_slno=? `,
            [
                data.cat_slno
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
            `SELECT trning_typeslno,trin_cat_name
                FROM medi_hrm.training_category
                WHERE trin_cat_name = ?`,
            [
                data.trning_typeslno,
                data.trin_cat_name
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
            `SELECT trning_typeslno,trin_cat_name
            FROM medi_hrm.training_category
            WHERE trin_cat_name =?  AND cat_slno != ?`,
            [
                data.type_name,
                data.trainingtype_slno,
                data.cat_slno
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