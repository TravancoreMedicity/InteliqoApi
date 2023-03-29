const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {

        pool.query(
            `INSERT INTO hrm_authorization_assign (dept_section,auth_post,dept_section_post,emp_id,create_user)
            VALUES (?,?,?,?,?)`,
            [
                data.dept_section,
                data.auth_post,
                data.dept_section_post,
                data.emp_id,
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
    checkInsertValauth: (data, callBack) => {
        pool.query(
            `SELECT auth_post,
            dept_section
          FROM hrm_authorization_assign
          WHERE auth_post =?  AND dept_section = ?`,
            [
                data.auth_post,
                data.dept_section

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    deleteByID: (id, callBack) => {
        pool.query(
            `DELETE FROM hrm_authorization_assign WHERE auth_slno  = ?`,
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
    getData: (callBack) => {
        pool.query(
            `SELECT auth_slno,dept_section, dept_name, auth_post,post, dept_name_post, name_emp  FROM(
                SELECT 
                            auth_slno AS auth_slno,
                            dept_section AS dept_section,
                           D.sect_name AS dept_name,
                           auth_post AS post,
                            if(auth_post=1,'HOD','Incharge'  ) auth_post  ,
                            P.sect_name AS dept_name_post,
                            em_name AS name_emp              
                            FROM hrm_authorization_assign
                            LEFT JOIN hrm_dept_section D ON D.sect_id = hrm_authorization_assign.dept_section
                            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=hrm_authorization_assign.emp_id
                             LEFT JOIN hrm_dept_section P ON P.sect_id = hrm_authorization_assign.dept_section_post) a`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getHod: (callBack) => {
        pool.query(
            `SELECT  
            sect_name,
            auth_post,
            hrm_authorization_assign.emp_id,
             co_assign AS coassign,
            em_name
            FROM hrm_authorization_assign 
            LEFT JOIN hrm_dept_section  ON hrm_dept_section.sect_id = hrm_authorization_assign.dept_section_post
             LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=hrm_authorization_assign.emp_id
             LEFT JOIN hrm_co_assign ON hrm_co_assign.emp_id=hrm_authorization_assign.emp_id
            WHERE auth_post=1 group by sect_name,
            auth_post,
            emp_id,
            em_name `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getIncharge: (callBack) => {
        pool.query(
            `SELECT  
            sect_name,
            auth_post,
            hrm_authorization_assign.emp_id,
             co_assign AS coassign,
            em_name
            FROM hrm_authorization_assign 
            LEFT JOIN hrm_dept_section  ON hrm_dept_section.sect_id = hrm_authorization_assign.dept_section_post
             LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=hrm_authorization_assign.emp_id
             LEFT JOIN hrm_co_assign ON hrm_co_assign.emp_id=hrm_authorization_assign.emp_id
            WHERE auth_post=2 group by sect_name,
            auth_post,
            emp_id,
            em_name`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createCoAssign: (data, callBack) => {

        pool.query(
            `INSERT INTO hrm_co_assign (emp_id,co_assign,create_user)
            VALUES (?,?,?)`,
            [
                data.emp_id,
                data.co_assign,
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

    updatecoassign: (data, callBack) => {
        pool.query(
            `UPDATE hrm_co_assign
                SET co_assign = ?                                       
                WHERE emp_id=?`,
            [
                data.co_assign,
                data.emp_id
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
            `SELECT emp_id       
                FROM hrm_co_assign
                WHERE emp_id = ? `,
            [
                data.emp_id

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getAuthorizationDetls: (data, callBack) => {

        pool.query(
            `SELECT * FROM 
            medi_hrm.hrm_authorization_assign 
            where dept_section=?;`,
            [
                data.dept_section

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getAuthorizationDeptSect: (id, callBack) => {
        pool.query(
            `select 
            dept_section, 
            sect_name 
        from hrm_authorization_assign
            left join hrm_dept_section on hrm_dept_section.sect_id = hrm_authorization_assign.dept_section
        where emp_id =?`,
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