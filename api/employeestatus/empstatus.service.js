const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO employee_status (
                empstat_name,
                empstat_cl,
                empstat_el,
                empstat_hd,
                empstat_esi,
                empstat_pf,
                empstat_period,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.empstat_name,
                data.empstat_cl,
                data.empstat_el,
                data.empstat_hd,
                data.empstat_esi,
                data.empstat_pf,
                data.empstat_period,
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
                    empstat_cl = ?,
                    empstat_el = ?,
                    empstat_hd = ?,
                    empstat_esi =?,
                    empstat_pf = ?,
                    empstat_period=?,
                    update_user = ?
                WHERE emstats_slno = ?`,
            [
                data.empstat_name,
                data.empstat_cl,
                data.empstat_el,
                data.empstat_hd,
                data.empstat_esi,
                data.empstat_pf,
                data.empstat_period,
                data.update_user,
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
                empstat_name,emstats_slno,empstat_period,
                if(empstat_cl = 1 ,'Yes','No') empstat_cl ,
                if(empstat_el = 1 ,'Yes','No') empstat_el ,
                if(empstat_hd = 1 ,'Yes','No') empstat_hd ,
                if(empstat_esi = 1 ,'Yes','No') empstat_esi,
                if(empstat_pf = 1 ,'Yes','No') empstat_pf 
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
                empstat_cl,
                empstat_el,
                empstat_hd,
                empstat_esi,
                empstat_pf,
                ifnull(empstat_period,0)empstat_period
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