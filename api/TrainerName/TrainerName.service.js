const pool = require('../../config/database');

module.exports = {

    getEmpNameByID: (id, callback) => {
        pool.query(
            `SELECT em_id,em_name 
            FROM hrm_emp_master 
            WHERE em_department=? and em_status=1 and em_id!=1`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    TrainerNameInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.training_trainername (trainer_name, trainer_dept,trainer_desig,trainer_status,create_user)
            VALUES (?,?,?,?,?)`,
            [
                data.trainer_name,
                data.trainer_dept,
                data.trainer_desig,
                data.trainer_status,
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

    TrainerNameGet: (callback) => {
        pool.query(
            `SELECT training_trainername.trainer_slno,training_trainername.trainer_status,
            designation.desg_slno,medi_hrm.designation.desg_name,
            hrm_department.dept_id,hrm_department.dept_name,
            hrm_emp_master.em_id,hrm_emp_master.em_name
            FROM training_trainername LEFT JOIN designation ON 
            training_trainername.trainer_desig=designation.desg_slno
            LEFT JOIN hrm_department ON training_trainername.trainer_dept=hrm_department.dept_id
             LEFT JOIN hrm_emp_master ON training_trainername.trainer_name=hrm_emp_master.em_id WHERE trainer_status=1`,
            [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }

        )
    },

    TrainerNameUpdate: (data, callback) => {
        pool.query(`UPDATE medi_hrm.training_trainername
         SET
         trainer_name=?,
         trainer_dept=?,
         trainer_desig=?,
         trainer_status=?,
         edit_user=?
        WHERE trainer_slno=?`,
            [
                data.trainer_name,
                data.trainer_dept,
                data.trainer_desig,
                data.trainer_status,
                data.edit_user,
                data.trainer_slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },
    TrainerNameDelete: (data, callback) => {
        pool.query(
            `UPDATE medi_hrm.training_trainername SET trainer_status=0 WHERE trainer_slno=?`,
            [
                data.trainer_slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },

    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT  trainer_name
                FROM medi_hrm.training_trainername
                WHERE trainer_name=?`,
            [
                data.trainer_name

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
            FROM medi_hrm.training_trainername
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
    }

}