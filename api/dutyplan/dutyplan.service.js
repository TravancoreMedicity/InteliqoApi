const pool = require('../../config/database');

module.exports = {
    getData: (data, callBack) => {
        pool.query(
            `SELECT 
                    plan_slno, emp_id, shift_id, duty_day,attendance_update_flag
                FROM
                    hrm_duty_plan
                WHERE
                    emp_id =?
                        AND DATE(duty_day) BETWEEN ? AND ?
                        ORDER BY DATE(duty_day) ASC`,
            [
                data.emp_id,
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmpdetl: (data, callBack) => {
        pool.query(
            `select em_no,em_name,em_id,em_doj,desg_name
            FROM hrm_emp_master
            left join designation on hrm_emp_master.em_designation=designation.desg_slno
            where em_department=? and em_dept_section=? and em_branch=?
            and em_status=1 and em_id!=1 and em_no!=2 `,
            [
                data.em_department,
                data.em_dept_section,
                data.em_branch
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertDutyplan: (data, callBack) => {
        pool.query(
            `insert  into hrm_duty_plan(
                duty_day, 
                emp_id,
                shift_id
            ) values ?`,
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
    updateDutyPlan: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update hrm_duty_plan
                        set shift_id=?,
                        offday_flag=?
                        where plan_slno=?
                        and attendance_update_flag!=1`,
                    [
                        val.shiftId,
                        val.offday,
                        val.shiftSlno
                    ],
                    (error, results, fields) => {


                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
    },
    CheckInsertVal: (data, callBack) => {
        pool.query(
            `SELECT 
            plan_slno, emp_id, shift_id, duty_day
        FROM
            hrm_duty_plan
        WHERE
            DATE(duty_day) BETWEEN ? AND ? 
            AND emp_id IN (?)
                ORDER BY DATE(duty_day) ASC`,
            [
                data.start_date,
                data.end_date,
                data.empData
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateDefaultShift: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update hrm_duty_plan
                    set shift_id=?
                    where emp_id=?
                     and date(duty_day) between ? and ?`,
                    [
                        val.shiftid,
                        val.emp_id,
                        val.startdate,
                        val.enddate
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
    },
    updateWoffShift: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update hrm_duty_plan
                    set shift_id=4,
                    offday_flag=1
                    where emp_id=?
                     and date(duty_day) IN (?)`,
                    [
                        val.emp_id,
                        val.dutydate,
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
    },
    updateholiday: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update punch_master
                    set holiday_flag=1
                    where date(duty_day) IN (?)`,
                    [
                        val.hld_date
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
    },
}