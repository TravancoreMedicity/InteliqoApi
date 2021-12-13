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
                em_year,
                em_mark_grade,
                em_reg_type,
                em_reg_no,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.em_education,
                data.em_course,
                data.em_specialization,
                data.em_univ_institute,
                data.em_year,
                data.em_mark_grade,
                data.em_reg_type,
                data.em_reg_no,
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
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_qual
                SET em_education = ?,
                    em_course = ?,
                    em_specialization = ?,
                    em_univ_institute = ?,
                    em_year = ?,
                    em_mark_grade = ?,
                    em_reg_type = ?,
                    em_reg_no = ?,
                    edit_user = ?
                WHERE emqual_slno = ?`,
            [
                data.em_education,
                data.em_course,
                data.em_specialization,
                data.em_univ_institute,
                data.em_year,
                data.em_mark_grade,
                data.em_reg_type,
                data.em_reg_no,
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
                    edu_desc,cour_desc
                    em_course,
                    spec_desc
                FROM hrm_emp_qual
                   LEFT JOIN hrm_mast_education ON  hrm_mast_education.edu_slno =hrm_emp_qual.em_education
                   LEFT JOIN hrm_mast_course ON  hrm_mast_course.cour_slno = hrm_emp_qual.em_course 
                   LEFT JOIN hrm_mast_specializtion ON hrm_mast_specializtion.spec_slno= hrm_emp_qual.em_specialization
                WHERE em_no = ?`,
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
                em_year,
                em_mark_grade,
                em_reg_type,
                em_reg_no
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
                    edu_desc,cour_desc
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
}