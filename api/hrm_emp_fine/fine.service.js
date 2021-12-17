const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_fine_mast (
                fine_slno,
                fine_emp_no,
                fine_emp_id,
                fine_type,
                fine_descp,
                fine_amount,
                fine_start,
                fine_end,
                fine_period,
                fine_remark,
                fine_create_user,
                fine_status            
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.fine_slno,
                data.fine_emp_no,
                data.fine_emp_id,
                data.fine_type,
                data.fine_descp,
                data.fine_amount,
                data.fine_start,
                data.fine_end,
                data.fine_period,
                data.fine_remark,
                data.fine_create_user,
                data.fine_status
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
            `SELECT  
               fine_type,
               fine_slno
             FROM hrm_emp_fine_mast
             WHERE  fine_type = ?  AND fine_slno=?`,
            [
                data.fine_type,
                data.fine_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    createdetl: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_fine_detl(
                fine_slno,
                fine_emp_no,
                fine_emp_id,
                fine_amount,
                create_user ,
                fine_status                         
            )
            VALUES (?,?,?,?,?,?)`,
            [
                data.fine_slno,
                data.fine_emp_no,
                data.fine_emp_id,
                data.fine_amount,
                data.fine_create_user,
                data.fine_status
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
            `SELECT 
                fine_type,               
                fine_slno
             FROM hrm_emp_fine_mast
             WHERE  fine_type!= ?  AND fine_slno =?`,
            [
                data.fine_type,
                data.fine_slno
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
            `UPDATE hrm_emp_fine_mast
                SET 
                  fine_descp = ?,
                  fine_amount = ?,
                  fine_start =?,
                  fine_end =?,
                  fine_period =?,
                  fine_remark =?,
                  fine_edit_user =?                    
                WHERE fine_slno = ?`,
            [
                data.fine_descp,
                data.fine_amount,
                data.fine_start,
                data.fine_end,
                data.fine_period,
                data.fine_remark,
                data.fine_edit_user,
                data.fine_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    updatefineslno: (id, callBack) => {
        pool.query(
            `update master_serialno set serial_current=serial_current+1 where serial_slno=3`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getFineByID: (id, callBack) => {
        pool.query(
            `SELECT 
                hrm_emp_fine_mast.fine_slno,
                hrm_fine_master.fine_desc,
                fine_descp,
                fine_amount,
                fine_remark,
                if(fine_status  = 0 ,'Pending','Collected')  fine_status 
            FROM hrm_emp_fine_mast
            LEFT JOIN hrm_fine_master ON  hrm_emp_fine_mast.fine_type =hrm_fine_master.fine_slno                   
            WHERE hrm_emp_fine_mast.fine_emp_no = ?`,
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
    getFineBySlno: (id, callBack) => {
        pool.query(
            `SELECT
            fine_type,
            fine_descp,
            fine_amount,
            fine_start,
            fine_end,
            fine_period,
            fine_remark,
            fine_status
            FROM hrm_emp_fine_mast
            LEFT JOIN hrm_fine_master ON hrm_fine_master.fine_slno = hrm_emp_fine_mast.fine_type
            WHERE hrm_emp_fine_mast.fine_slno = ?`,
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
    getFineByIDStatus: (data, callBack) => {
        pool.query(
            `SELECT 
                hrm_emp_fine_mast.fine_slno,
                hrm_fine_master.fine_desc,
                fine_descp,
                fine_amount,
                fine_remark,
                if(fine_status  = 0 ,'Pending','Collected')  fine_status 
            FROM hrm_emp_fine_mast
            LEFT JOIN hrm_fine_master ON  hrm_emp_fine_mast.fine_type =hrm_fine_master.fine_slno                   
            WHERE hrm_emp_fine_mast.fine_emp_no = ? AND fine_status=?` ,
            [
                data.id,
                data.collected
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