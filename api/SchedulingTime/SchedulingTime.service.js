const pool = require('../../config/database');

module.exports = {
    SchedulingTimeInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.scheduling_time (
                schedule_name, schedule_status, create_user
            )
            VALUES (?,?,?)`,
            [
                data.schedule_name,
                data.schedule_status,
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
    //validation
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT schedule_name
                FROM medi_hrm.scheduling_time
                WHERE schedule_name = ?`,
            [
                data.schedule_name,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    SchedulingTimeGet: (callback) => {
        pool.query(`
        SELECT slno, schedule_name, schedule_status FROM medi_hrm.scheduling_time WHERE schedule_status=1`, [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }

        )
    },
    SchedulingTimeUpdate: (data, callback) => {
        pool.query(`UPDATE medi_hrm.scheduling_time SET 
        schedule_name=?,
        schedule_status=?,
        edit_user=?
        WHERE slno=?`,
            [
                data.schedule_name,
                data.schedule_status,
                data.edit_user,
                data.slno,

            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },

    //update
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT schedule_name,               
            slno
            FROM medi_hrm.scheduling_time
            WHERE schedule_name =?  AND slno != ?`,
            [
                data.schedule_name,
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    SchedulingTimeDelete: (data, callback) => {
        console.log(data);
        pool.query(
            `UPDATE medi_hrm.scheduling_time 
            SET schedule_status=0
             WHERE slno=?`,
            [
                data.slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },





}