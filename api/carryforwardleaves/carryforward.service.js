const pool = require('../../config/database');

module.exports = {
    createCarry: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_carryforward_leave (
                dept_sec,
                emp_type,
                carry_hl,
                carry_cl,
                carry_el,
                carry_sl,
                create_user
            )
            VALUES (?,?,?,?,?,?,?)`,
            [
                data.dept_sec,
                data.emp_type,
                data.carry_hl,
                data.carry_cl,
                data.carry_el,
                data.carry_sl,
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
            `SELECT dept_sec,
                    emp_type
            FROM hrm_carryforward_leave
            WHERE dept_sec = ? and emp_type=?`,
            [
                data.dept_sec,
                data.emp_type,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateCarry: (data, callBack) => {
        pool.query(
            `UPDATE hrm_carryforward_leave
                SET dept_sec =?,
                emp_type =?,
                carry_hl =?,
                carry_cl =?,
                carry_el =?,
                carry_sl =?,
                edit_user=?
                WHERE carry_slno =?`,
            [
                data.dept_sec,
                data.emp_type,
                data.carry_hl,
                data.carry_cl,
                data.carry_el,
                data.carry_sl,
                data.edit_user,
                data.carry_slno
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
            `SELECT dept_sec,
            emp_type,
            carry_slno
                FROM hrm_carryforward_leave
                WHERE dept_sec = ? AND emp_type=? AND carry_slno != ?`,
            [
                data.dept_sec,
                data.emp_type,
                data.carry_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCarry: (callBack) => {
        pool.query(
            `SELECT carry_slno,    
                 hrm_dept_section.sect_name,
                 employee_type.emptype_name,
                 if(carry_hl = 1,'Yes','No')carry_hl,
                if(carry_cl = 1,'Yes','No')carry_cl,
                if(carry_el = 1,'Yes','No')carry_el,
                if(carry_sl = 1,'Yes','No')carry_sl
               FROM hrm_carryforward_leave
            LEFT JOIN hrm_dept_section ON hrm_carryforward_leave.dept_sec = hrm_dept_section.sect_id
            LEFT JOIN employee_type ON hrm_carryforward_leave.emp_type = employee_type.emptype_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getCarryById: (id, callBack) => {
        pool.query(
            `SELECT 
            carry_slno,
            dept_sec,
            emp_type,
            carry_hl,
            carry_cl,
            carry_el,
            carry_sl 
            FROM hrm_carryforward_leave
            WHERE carry_slno = ?`,
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