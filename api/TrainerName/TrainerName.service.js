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

    TrainerNameInsert: (data, callback) => {
        pool.query(
            `INSERT INTO training_trainername (
                trainer_name,trainer_dept,trainer_desig,trainer_status,create_user             
               )
                VALUES(?,?,?,?,?)`,
            [
                data.trainer_name,
                data.trainer_dept,
                data.trainer_desig,
                data.trainer_status,
                data.create_user
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    TrainerNameGet: (callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as slno,trainer_slno, trainer_name, trainer_dept, training_trainername.trainer_desig, trainer_status,
            hrm_emp_master.em_id,hrm_emp_master.em_no,hrm_emp_master.em_name,hrm_emp_master.em_status,hrm_emp_master.hod,hrm_emp_master.incharge,
             hrm_department.dept_name,hrm_dept_section.sect_name,designation.desg_name,
             hrm_department.dept_id,hrm_dept_section.sect_id,designation.desg_slno
            FROM training_trainername   
                      LEFT JOIN hrm_department ON hrm_department.dept_id=training_trainername.trainer_dept
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_trainername.trainer_name
                       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
                       LEFT JOIN designation ON designation.desg_slno=training_trainername.trainer_desig
                       where em_status=1 AND trainer_status=1
                       `,
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
        pool.query(`UPDATE training_trainername
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
            `UPDATE training_trainername SET trainer_status=0 WHERE trainer_slno=?`,
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
                FROM training_trainername
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
            FROM training_trainername
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
    GetTrainerDetails: (id, callback) => {
        pool.query(
            `
            SELECT em_id as employee_id,em_no,em_name,em_department,em_dept_section,em_designation,em_status,
            hrm_department.dept_name,hrm_dept_section.sect_name,designation.desg_name,hrm_authorization_assign.auth_post,
            hrm_department.dept_id,hrm_dept_section.sect_id,designation.desg_slno
            FROM hrm_emp_master
            LEFT JOIN hrm_authorization_assign ON hrm_authorization_assign.emp_id=hrm_emp_master.em_id
            LEFT JOIN hrm_department ON hrm_department.dept_id=hrm_emp_master.em_department
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            where em_status=1 AND em_no=?
                       
           `, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    TrainerNameDeptSecWise: (data, callBack) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as slno,trainer_slno, trainer_name, trainer_dept, training_trainername.trainer_desig, trainer_status,
            hrm_emp_master.em_id,hrm_emp_master.em_no,hrm_emp_master.em_name,hrm_emp_master.em_status,hrm_emp_master.hod,hrm_emp_master.incharge,
             hrm_department.dept_name,hrm_dept_section.sect_name,designation.desg_name,
             hrm_department.dept_id,hrm_dept_section.sect_id,designation.desg_slno
            FROM training_trainername   
                      LEFT JOIN hrm_department ON hrm_department.dept_id=training_trainername.trainer_dept
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_trainername.trainer_name
                       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
                       LEFT JOIN designation ON designation.desg_slno=training_trainername.trainer_desig
                       where em_status=1 AND trainer_status=1 AND hrm_department.dept_id=? AND hrm_dept_section.sect_id=?`,
            [
                data.em_department,
                data.em_dept_section

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