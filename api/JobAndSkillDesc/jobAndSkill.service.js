const pool = require('../../config/database');

module.exports = {
    getJobDescById: (data, callBack) => {
        pool.query(
            `SELECT
           ROW_NUMBER() OVER () as slno, 
           jobdiscription_skillsSlno,
            dept_id,
            desg_id,
            job_desc
            FROM jobdiscription_skills
            WHERE desg_id = ?
            AND dept_id=?`,
            [
                data.designation,
                data.Dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    createJobDuties: (data, callBack) => {
        pool.query(
            `INSERT INTO jobdiscription_skills (
                dept_id,
                desg_id,
                job_desc
                )
            VALUES (?,?,?)`,
            [
                data.Dept_id,
                data.designation,
                data.duties,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    updateDutiesEach: (data, callBack) => {
        pool.query(
            `UPDATE 
            jobdiscription_skills 
            set job_desc=?
            where  jobdiscription_skillsSlno=?;`,
            [
                data.duties_and_resp,
                data.duties_slno
            ],

            (error, results, feilds) => {
                if (error) {

                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    deleteduties: (id, callBack) => {
        pool.query(
            `delete from jobdiscription_skills where jobdiscription_skillsSlno =?`,
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


    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT skill_name
                FROM hrm_skills
                WHERE skill_name = ?`,
            [
                data.skillName,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    createSkill: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_skills
            (skill_name)
            VALUES(?)`,
            [
                data.skillName,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    createSkillJob: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_jobskills
            (skill,
            desig_id,
            dept_id
            )
            VALUES(?,?,?)`,
            [
                data.skillid,
                data.designation,
                data.Dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getJobSkill: (data, callBack) => {
        pool.query(
            `SELECT
           ROW_NUMBER() OVER () as slno, 
           hrm_jobskills.Skills_slNo,
            skill,
            skill_name
            FROM hrm_jobskills
            LEFT JOIN hrm_skills ON hrm_jobskills.skill = hrm_skills.skills_slno
            WHERE desig_id = ?
            AND hrm_jobskills.dept_id=?`,
            [
                data.designation,
                data.Dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    UpdateSkillJob: (data, callBack) => {
        pool.query(
            `UPDATE 
            hrm_jobskills 
            set skill=?
            where  Skills_slNo=?;`,
            [
                data.skillid,
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

    deleteSkillduties: (id, callBack) => {
        pool.query(
            `delete from hrm_jobskills where Skills_slNo =?`,
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