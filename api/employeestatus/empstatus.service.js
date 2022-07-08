const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO employee_status (
                empstat_name,
                status,
                create_user
            )
            VALUES (?,?,?)`,
            [
                data.empstat_name,
                data.desigstatus,
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
            `UPDATE employee_status 
                SET empstat_name = ?,
                status = ?,            
                update_user = ?
                WHERE emstats_slno = ?`,
            [
                data.empstat_name,
                data.desigstatus,
                data.emstats_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteByID: (data, callBack) => {
        pool.query(
            `DELETE FROM employee_status WHERE emstats_slno = ?`,
            [
                data.emstats_slno
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
            `SELECT 
                empstat_name,emstats_slno,
                if(status = 1 ,'Yes','No') status          
            FROM employee_status`,
            [],
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
            `SELECT 
                emstats_slno,
                empstat_name,             
                status
            FROM employee_status
            WHERE emstats_slno = ?`,
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
    }
}