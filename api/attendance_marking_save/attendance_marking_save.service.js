const pool = require('../../config/database');

module.exports = {
    createAttendanceMarking: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_attendance_marking 
            (em_id, 
            em_no,
            attendance_marking_month,
            attnd_mark_startdate,
            attnd_mark_enddate,
            total_working_days,
            tot_days_present,
            total_leave,
            total_lop,
            total_days,
            contract_renew_date,
            updated_user)
            VALUES ?`,
            [
                data
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
            `SELECT attendance_marking_month,
                 em_id
                FROM hrm_attendance_marking
                WHERE attendance_marking_month = ?
                and em_id=?`,
            [

                data[0].month,
                data[0].em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkAttendanceMarking: (data, callBack) => {
        pool.query(
            `SELECT 
                em_id,
                em_no,
                attendance_marking_month,
                attnd_mark_enddate
            FROM hrm_attendance_marking 
            WHERE em_no = ? AND attendance_marking_month BETWEEN ? AND ? `,
            [
                data.empNo,
                data.fromDate,
                data.toDate,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    attendanceMarkingSaveContract: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_attendance_marking 
                (
                em_id, 
                em_no,
                attendance_marking_month,
                attnd_mark_startdate,
                attnd_mark_enddate,
                total_working_days,
                tot_days_present,
                total_leave,
                total_lop,
                total_days,
                contract_renew_date,
                updated_user
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.attendance_marking_month,
                data.attnd_mark_startdate,
                data.attnd_mark_enddate,
                data.total_working_days,
                data.tot_days_present,
                data.total_leave,
                data.total_lop,
                data.total_days,
                data.contract_renew_date,
                data.updated_user,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //ATTENDANCE MARKING CHECK FOR LEAVE REQUEST 
    attMarkingExcistFrLveReq: (data, callBack) => {
        pool.query(
            `SELECT 
                month(attendance_marking_month) month,
                year(attendance_marking_month) year
            FROM hrm_attendance_marking 
            WHERE em_no = ?
            AND month(attendance_marking_month) = month(?)
            AND year(attendance_marking_month) = year(?)`,
            [
                data.empNo,
                data.fromDate,
                data.fromDate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, JSON.stringify(results));
            }
        )
    },
}