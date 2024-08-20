const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO duty_off_request (
                em_no,
                em_id,
                duty_date,
                required_date,
                create_user,
                reason
                )
            VALUES (?,?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.duty_date,
                data.required_date,
                data.create_user,
                data.reason
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    punchMasterUpdate: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET duty_status = 1,
            lvereq_desc = 'DOFF',
            duty_desc = 'DOFF',
            lve_tble_updation_flag=1,
            noff_flag=1,
            leave_status=1
        WHERE duty_day=? and emp_id=?`,
            [
                data.duty_day,
                data.emp_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmpwiseDoff: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_id,
            em_name,
            hrm_emp_master.em_no,
            duty_date,
            required_date,
            delete_status,
            duty_off_slno
            FROM duty_off_request
            left join hrm_emp_master on hrm_emp_master.em_id=duty_off_request.em_id
            where hrm_emp_master.em_id=? and delete_status=0 order by required_date desc`,
            [
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deletedoff: (data, callBack) => {
        pool.query(
            `UPDATE duty_off_request
            SET delete_status=1,
            delete_comments=?,
            delete_date=curdate(),
            delete_user=?
            WHERE duty_off_slno=?`,
            [
                data.delete_comments,
                data.delete_user,
                data.duty_off_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    disableDutyplanData: (data, callBack) => {
        pool.query(
            `UPDATE hrm_duty_plan
                SET attendance_update_flag = 1
                WHERE plan_slno=?`,
            [
                data.plan_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    disableDoffDutyplanData: (data, callBack) => {
        pool.query(
            `UPDATE hrm_duty_plan
                SET attendance_update_flag = 1,
                shift_id=?
                WHERE plan_slno=?`,
            [
                data.shift_id,
                data.doffPlanSlno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateDelStatDutyPlan: (data, callBack) => {
        pool.query(
            `UPDATE hrm_duty_plan
                SET attendance_update_flag = 0
                WHERE plan_slno =?`,
            [
                data.plan_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    enableDoffDutyplanData: (data, callBack) => {
        pool.query(
            `UPDATE hrm_duty_plan
                SET attendance_update_flag = 0,
                shift_id=?
                WHERE plan_slno=?`,
            [
                data.shift_id,
                data.doffPlanSlno
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
