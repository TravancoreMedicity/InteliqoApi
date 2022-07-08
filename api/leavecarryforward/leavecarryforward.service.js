const pool = require('../../config/database');

module.exports = {
    insertcarry: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_leave_carry_forward (
                emp_id,
                cl_carry,
                hdl_carry,
                el_carry,
                sl_carry,
                carry_year,
                create_user            
            )
            VALUES (?,?,?,?,?,?,?)`,
            [
                data.emp_id,
                data.cl_carry,
                data.hdl_carry,
                data.el_carry,
                data.sl_carry,
                data.carry_year,
                data.create_user,
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
            emp_id           
          FROM hrm_leave_carry_forward
          WHERE  emp_id = ?  `,
            [
                data.emp_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    insertcarrycount: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_leave_carry_count (
                emp_id,
                carry_cl,
                carry_el,
               carry_sl,
                carry_hdl           
            )
            VALUES (?,?,?,?,?)`,
            [
                data.emp_id,
                data.carry_cl,
                data.carry_el,
                data.carry_sl,
                data.carry_hdl,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getCarrysettingById: (id, callBack) => {
        pool.query(
            `SELECT 
            emp_type,
            carry_hl,
            carry_cl,
            carry_el,
            carry_sl 
          FROM hrm_carryforward_leave
          WHERE dept_sec = ?`,
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