const pool = require('../../config/database');

module.exports = {
    employeeinsert: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_employee
            (
                emp_email,
                emp_username,
                emp_password,
                emp_status,
                emp_create_user, 
                emp_id, 
                emp_no
           )
            VALUES(?,?,?,?,?,?,?)`,
            [data.emp_email,
            data.emp_no,
            data.emp_password,
            data.emp_status,
            data.create_user,
            data.emp_id,
            data.emp_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    employeeupdate: (data, callBack) => {
        pool.query(
            `UPDATE hrm_employee
                SET
                    emp_no = ?,
                    emp_name = ?,
                    emp_gender = ?,
                    emp_dob = ?,
                    emp_permanent = ?,
                    emp_pincode_pres =  ?,
                    emp_present = ?,
                    emp_pincode_perm = ?,
                    emp_mob = ?,
                    emp_phone = ?,
                    emp_email = ?,
                    emp_doj = ?,
                    emp_username = ?,
                    emp_password = ?,
                    emp_dept_id = ?,
                    emp_sect_id = ?,
                    emp_branch_slno = ?,
                    emp_status = ?,
                    emp_updated = ?
                WHERE emp_slno = ?`,
            [
                data.emp_no,
                data.emp_name,
                data.emp_gender,
                data.emp_dob,
                data.emp_permanent,
                data.emp_pincode_pres,
                data.emp_present,
                data.emp_pincode_perm,
                data.emp_mob,
                data.emp_phone,
                data.emp_email,
                data.emp_doj,
                data.emp_username,
                data.emp_password,
                data.emp_dept_id,
                data.emp_sect_id,
                data.emp_branch_slno,
                data.emp_status,
                data.emp_updated,
                data.emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getemplpyee: (callBack) => {
        pool.query(
            `SELECT e.emp_slno,
                e.emp_no,
                e.emp_username,
                if(e.emp_gender = 'F','Female','Male') emp_gender,
                e.emp_dob,
                e.emp_permanent,
                e.emp_pincode_pres,
                e.emp_present,
                e.emp_pincode_perm,
                e.emp_mob,
                e.emp_phone,
                e.emp_email,
                e.emp_doj,
                e.emp_username,
                d.dept_name,
                s.sect_name,
                b.branch_name,
                if(e.emp_status= 'Y','Active','Inactive') emp_status
            FROM hrm_employee e
                LEFT JOIN hrm_department d ON d.dept_id = e.emp_dept_id
                LEFT JOIN hrm_dept_section s ON s.sect_id = e.emp_sect_id
                LEFT JOIN hrm_branch b ON b.branch_slno = e.emp_branch_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    employeeGetById: (id, callBack) => {
        pool.query(
            `SELECT e.emp_slno,
                e.emp_no,
                e.emp_username,
                if(e.emp_gender = 'F','Female','Male') emp_gender,
                e.emp_dob,
                e.emp_permanent,
                e.emp_pincode_pres,
                e.emp_present,
                e.emp_pincode_perm,
                e.emp_mob,
                e.emp_phone,
                e.emp_email,
                e.emp_doj,
                e.emp_username,
                d.dept_name,
                s.sect_name,
                b.branch_name,
                if(e.emp_status= 'Y','Active','Inactive') emp_status
            FROM hrm_employee e
                LEFT JOIN hrm_department d ON d.dept_id = e.emp_dept_id
                LEFT JOIN hrm_dept_section s ON s.sect_id = e.emp_sect_id
                LEFT JOIN hrm_branch b ON b.branch_slno = e.emp_branch_slno
            WHERE e.emp_slno = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results[0]);
            }
        );
    },
    employeedelete: (data, callBack) => {
        pool.query(
            `UPDATE hrm_employee set emp_status = 'N' WHERE emp_slno = ? `,
            [
                data.emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmployeeByUserName: (userName, callBack) => {
        pool.query(
            `SELECT * FROM hrm_employee WHERE emp_username = ? AND emp_status = '1'`,
            [userName],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }

}