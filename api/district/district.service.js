const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_district (dist_name,dist_state_slno,dist_status,create_user)
             VALUES (?,?,?,?)`,
            [
                data.dist_name,
                data.dist_state_slno,
                data.dist_status,
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
            `UPDATE hrm_district
                SET dist_name = ?,
                    dist_state_slno = ?,
                    dist_status = ?,
                    edit_user = ? 
                WHERE dist_slno = ?`,
            [
                data.dist_name,
                data.dist_state_slno,
                data.dist_status,
                data.edit_user,
                data.dist_slno
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
            `UPDATE hrm_district SET dist_status = '0' WHERE dist_slno = ?`,
            [
                data.dist_slno
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
            `SELECT dist_slno,
            dist_name,
            dist_status,
            dist_state_slno,
           hrm_state.state_name,                      
                if(dist_status = 1 , 'Yes','No') status  
                   FROM hrm_district
                LEFT JOIN hrm_state ON hrm_district.dist_state_slno = hrm_state.state_slno`,
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
            `SELECT dist_slno,
                        dist_name,
                        dist_state_slno,
                        dist_status
                FROM hrm_district 
                WHERE dist_slno = ?`,
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
            `SELECT dist_slno,
                    dist_name
            FROM hrm_district 
            WHERE dist_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
}