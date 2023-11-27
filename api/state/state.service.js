const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_state (state_name,state_nat_slno,state_status,create_user)
             VALUES (?,?,?,?)`,
            [
                data.state_name,
                data.state_nat_slno,
                data.state_status,
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
            `UPDATE hrm_state
                SET state_name = ?,
                state_nat_slno = ?,
                state_status = ? ,
                edit_user =?
                WHERE state_slno = ?`,
            [
                data.state_name,
                data.state_nat_slno,
                data.state_status,
                data.edit_user,
                data.state_slno
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
            `UPDATE hrm_state SET state_status = '0' WHERE state_slno = ?`,
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
            `SELECT state_slno,
            state_name,
             hrm_nation.nat_name,
             state_nat_slno,
             state_status,
            if(state_status = 1 , 'Yes','No') status  
                FROM hrm_state                
            LEFT JOIN hrm_nation ON hrm_state.state_nat_slno = hrm_nation.nat_slno`,
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
            `SELECT state_slno,
                        state_name,
                        state_nat_slno,
                        state_status
                FROM hrm_state 
                WHERE state_slno = ?`,
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
            `SELECT state_slno,
                    state_name
            FROM hrm_state 
            WHERE state_status = 1`,
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