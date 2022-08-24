const pool = require('../../config/database');

module.exports = {
    createJobDesc: (data, callBack) => {
        pool.query(
            `INSERT INTO job_description (
                 designation,
                 department,
                  job_desription,
                  job_Summary,
                   created_user)
            VALUES (?,?,?,?,?)`,
            [
                data.designation,
                data.department,
                data.job_desription,
                data.job_Summary,
                data.created_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateJobDesc: (data, callBack) => {
        pool.query(
            `UPDATE job_description
                SET designation = ?,
                department=?,
                job_desription =?,
                job_Summary=?,
                edit_user = ?
                WHERE description_slno = ?`,
            [
                data.designation,
                data.department,
                data.job_desription,
                data.job_Summary,
                data.edit_user,
                data.description_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteJobDesc: (data, callBack) => {
        pool.query(
            `
            delete  from job_description
            where description_slno=?`,
            [
                data.description_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getJobDesc: (callBack) => {
        pool.query(
            `SELECT 
            description_slno,
            designation,
            department,
            job_desription,
            job_Summary
            FROM job_description`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getJobDescById: (data, callBack) => {
        pool.query(
            `SELECT 
            description_slno,
            designation,
            job_desription,
            job_Summary
            FROM job_description
            WHERE designation = ?
            AND department=?`,
            [
                data.designation,
                data.department
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getJobDescBySlno: (id, callBack) => {
        pool.query(
            `SELECT 
            description_slno,
            designation,
            department,
            job_desription,
            job_Summary
            FROM job_description
            WHERE description_slno = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },




}