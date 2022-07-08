const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_qual (
                em_no,
                em_id,               
                em_education,
                em_course,
                em_specialization,
                em_univ_institute,
                em_board,
                em_year,
                em_mark_grade,
                em_reg_type,
                em_reg_no,
                em_exp_date,
                em_chellan,
                em_chellan_exp_date,
                create_user                
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.em_education,
                data.em_course,
                data.em_specialization,
                data.em_univ_institute,
                data.em_board,
                data.em_year,
                data.em_mark_grade,
                data.em_reg_type,
                data.em_reg_no,
                data.em_exp_date,
                data.em_chellan,
                data.em_chellan_exp_date,
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
    // checkInsertVal: (data, callBack) => {
    //     pool.query(
    //         `SELECT em_education,em_course
    //          FROM hrm_emp_qual
    //          WHERE em_education= ? AND em_no=? AND em_course=?`,
    //         [
    //             data.em_education,
    //             data.em_no,
    //             data.em_course
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error)
    //             }
    //             return callBack(null, results)
    //         }
    //     )
    // },

    update: (data, callBack) => {

        pool.query(
            `UPDATE hrm_emp_qual
                SET em_education = ?,
                    em_course = ?,
                    em_specialization = ?,
                    em_univ_institute = ?,
                    em_board=?,
                    em_year = ?,
                    em_mark_grade = ?,
                    em_reg_type = ?,
                    em_reg_no = ?,
                    em_exp_date=?,
                em_chellan=?,
                em_chellan_exp_date=?, 
                    edit_user = ?                                      
                WHERE emqual_slno = ?`,
            [
                data.em_education,
                data.em_course,
                data.em_specialization,
                data.em_univ_institute,
                data.em_board,
                data.em_year,
                data.em_mark_grade,
                data.em_reg_type,
                data.em_reg_no,
                data.em_exp_date,
                data.em_chellan,
                data.em_chellan_exp_date,
                data.edit_user,
                data.emqual_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDataById: (id, callBack) => {
        pool.query(
            `SELECT emqual_slno,
            em_no,
            edu_desc,   
            IFNULL(unver_name,"NILL" ) unver_name,            
            IFNULL( cour_desc, "NILL") cour_desc,                    
            IFNULL( spec_desc, "NILL") spec_desc
          FROM hrm_emp_qual
          LEFT JOIN hrm_mast_education ON  hrm_mast_education.edu_slno =hrm_emp_qual.em_education
          LEFT JOIN hrm_mast_course ON  hrm_mast_course.cour_slno = hrm_emp_qual.em_course 
          LEFT JOIN hrm_mast_specializtion ON hrm_mast_specializtion.spec_slno= hrm_emp_qual.em_specialization
           LEFT JOIN hrm_university ON hrm_university.unver_slno= hrm_emp_qual.em_univ_institute
          WHERE em_no= ?`,
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
    getDataBySlno: (id, callBack) => {
        pool.query(
            `SELECT 
                emqual_slno,
                em_no,
                em_education,
                em_course,
                em_specialization,
                em_univ_institute,
                em_board,
                em_year,
                em_mark_grade,
                em_reg_type,
                em_reg_no,
                em_exp_date,
                em_chellan,
                em_chellan_exp_date
            FROM hrm_emp_qual
            WHERE emqual_slno = ?`,
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
    getQualification: (callBack) => {
        pool.query(
            `SELECT emqual_slno,
                    em_no,
                    edu_desc,
                    cour_desc,
                    em_course,
                    spec_desc
             FROM hrm_emp_qual
             LEFT JOIN hrm_mast_education ON  hrm_mast_education.edu_slno =hrm_emp_qual.em_education
             LEFT JOIN hrm_mast_course ON  hrm_mast_course.cour_slno = hrm_emp_qual.em_course 
             LEFT JOIN hrm_mast_specializtion ON hrm_mast_specializtion.spec_slno= hrm_emp_qual.em_specialization`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    InsertMessage: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_message 
                (message_dept,
                    message_deptsec,
                    emp_id,
                    message,
                    created_date,
                    expr_date,
                    created_user
                  )
                VALUES (?,?,?,?,?,?,?)`,
            [
                data.message_dept,
                data.message_deptsec,
                data.emp_id,
                data.message,
                data.created_date,
                data.expr_date,
                data.created_user,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}