const pool = require('../../config/database');

module.exports = {

    createInterview: (data, callBack) => {
        pool.query(
            `INSERT INTO interview_question_mast (department_id,designation_no,question,choice1,choice2,choice3,choice4,correct_answer,mark,status)
            VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.dept,
                data.designation,
                data.Question,
                data.optionA,
                data.optionB,
                data.optionC,
                data.optionD,
                data.Answer,
                data.Mark,
                data.status,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getInterview: (callBack) => {
        pool.query(
            `SELECT
            ROW_NUMBER() OVER () as slno,
            department_id,
                designation_no,
                question,
                choice1,
                choice2,
                choice3,
                choice4,
                correct_answer,
                mark,
                status,
				dept_name,
                desg_name,
                question_slno
            FROM interview_question_mast 
            LEFT JOIN hrm_department ON hrm_department.dept_id = interview_question_mast.department_id
            LEFT JOIN designation ON designation.desg_slno = interview_question_mast.designation_no`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatedInterview: (data, callBack) => {
        console.log(data);
        pool.query(
            `UPDATE interview_question_mast 
                SET department_id = ?,
                designation_no=?,
                question = ?,
                choice1 =?,
                choice2=?,
                choice3=?,
                choice4=?,
                correct_answer=?,
                mark=?,
                status=?
                WHERE question_slno = ?`,
            [
                data.dept,
                data.designation,
                data.Question,
                data.optionA,
                data.optionB,
                data.optionC,
                data.optionD,
                data.Answer,
                data.Mark,
                data.status,
                data.slno
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