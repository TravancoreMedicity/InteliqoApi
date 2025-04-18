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
    getPlanDetl: (data, callBack) => {
        pool.query(
            `SELECT 
                    plan_slno,em_no, emp_id, shift_id, duty_day,attendance_update_flag,holiday,doff_updation_flag
                FROM
                    hrm_duty_plan
                WHERE  DATE(duty_day) BETWEEN ? AND ?
                ORDER BY DATE(duty_day) ASC`,
            [
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
    /****
     * 
     * `select em_no,em_name,em_id,em_doj,desg_name
            FROM hrm_emp_master
            left join designation on hrm_emp_master.em_designation=designation.desg_slno
            where em_department=? and em_dept_section=? and em_branch=?
            and em_status=1 and em_id!=1 and em_no!=2 `,
     * `select hrm_emp_master.em_no,
                    hrm_emp_master.em_name,
                    hrm_emp_master.em_id,
                    hrm_emp_master.em_doj,
                    designation.desg_name,
                    hrm_emp_contract_detl.em_cont_start,
                    hrm_emp_master.contract_status
            FROM hrm_emp_master
            left join designation on hrm_emp_master.em_designation=designation.desg_slno
            left join hrm_emp_contract_detl on hrm_emp_contract_detl.em_no = hrm_emp_master.em_no
            where hrm_emp_master.em_department=? 
                and hrm_emp_master.em_dept_section=?
                and hrm_emp_master.em_branch=?
                and hrm_emp_master.em_status=1
                and hrm_emp_master.em_id!=1 
                and hrm_emp_master.em_no!=2`
     * 
     */
    getEmpdetl: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_id,
            hrm_emp_master.em_doj,
            hrm_emp_contract_detl.em_cont_start,
            hrm_emp_master.contract_status,
            hrm_emp_master.gross_salary,
            hrm_department.dept_id,
            hrm_dept_section.sect_id,
            em_department,
            em_dept_section,
            dept_name, 
            sect_name,
            desg_name,
            ecat_name,
            unauthorized_absent_status
            FROM hrm_emp_master
            left join hrm_emp_contract_detl on hrm_emp_contract_detl.em_no = hrm_emp_master.em_no and hrm_emp_contract_detl.status = 0
            inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            inner join designation on hrm_emp_master.em_designation=designation.desg_slno
            inner join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where hrm_emp_master.em_department=?
                and hrm_emp_master.em_dept_section=?
                and hrm_emp_master.em_status=1
                and hrm_emp_master.em_no not in (1 ,2) `,
            [
                data.em_department,
                data.em_dept_section,
                // data.em_branch
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
                em_no,
                shift_id,
                holiday,
                holiday_name,
                holiday_slno,
                plan_user
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
                            offday_flag=?,
                            edit_user=?
                        where plan_slno=?
                        and attendance_update_flag!=1`,
                    [
                        val.shift_id,
                        val.offday,
                        val.edit_user,
                        val.plan_slno
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
                     and date(duty_day) between ? and ? and shift_id != ? `,
                    [
                        val.shiftid,
                        val.emp_id,
                        val.startdate,
                        val.enddate,
                        val.notApplicable
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
                    set shift_id=?,
                    offday_flag=1
                    where emp_id=?
                     and date(duty_day) IN (?) and shift_id != ? `,
                    [
                        val.weekOffShiftId,
                        val.emp_id,
                        val.dutydate,
                        val.notApplicable
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
    updateMultiShift: (data) => {
        const { newPlan, naShift } = data;
        return new Promise((resolve, reject) => {
            newPlan.map((val) => {
                pool.query(
                    `UPDATE hrm_duty_plan SET shift_id = ?,edit_user=? WHERE plan_slno = ? AND shift_id  != ?`,
                    [
                        val.shift_id,
                        val.edit_user,
                        val.plan_slno,
                        naShift
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
    checkDutyPlanExcist: (data, callBack) => {
        pool.query(
            `SELECT
                count(punch_slno) plan
            FROM punch_master
            WHERE duty_day BETWEEN ? AND ?
            AND emp_id = ?`,
            [
                data.fromDate,
                data.toDate,
                data.empId
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    getdeptEmpdetl: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_id,
            hrm_emp_master.em_doj,
            hrm_emp_contract_detl.em_cont_start,
            hrm_emp_master.contract_status,
            hrm_emp_master.gross_salary,
            hrm_department.dept_id,
            hrm_dept_section.sect_id,
            em_department,
            em_dept_section,
            dept_name, 
            sect_name,
            desg_name,
            unauthorized_absent_status,
            holiday_type
            FROM hrm_emp_master
            left join hrm_emp_contract_detl on hrm_emp_contract_detl.em_no = hrm_emp_master.em_no and hrm_emp_contract_detl.status = 0
            inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            inner join designation on hrm_emp_master.em_designation=designation.desg_slno
            where  hrm_emp_master.em_dept_section=?
                and hrm_emp_master.em_status=1 and hrm_emp_master.doctor_status=0
                and hrm_emp_master.em_no not in (1 ,2) ; `,
            [
                data.em_dept_section,
                // data.em_branch
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkDutyPlanExcistNew: (data, callBack) => {
        pool.query(
            `SELECT
                count(punch_slno) plan
            FROM punch_master
            WHERE duty_day >= ? and duty_day <= ?
            AND em_no = ?`,
            [
                data.fromDate,
                data.toDate,
                data.emno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    getDutyPlanAboveselectedDate: (data, callBack) => {
        pool.query(
            `SELECT plan_slno, emp_id, shift_id, duty_day,attendance_update_flag  FROM  hrm_duty_plan
            WHERE emp_id =? AND DATE(duty_day) >=? ORDER BY DATE(duty_day) ASC`,
            [
                data.emp_id,
                data.start_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmployeeDutyplan: (data, callBack) => {
        pool.query(
            `SELECT  plan_slno, emp_id, shift_id, duty_day ,shft_desc,  shft_cross_day
            FROM hrm_duty_plan 
            left join hrm_shift_mast on hrm_shift_mast.shft_slno=hrm_duty_plan.shift_id
            WHERE  DATE(duty_day) BETWEEN ? AND ?
            AND emp_id IN (?) ORDER BY DATE(duty_day) ASC`,
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
    dutyplanExitorNot: (data, callBack) => {
        pool.query(
            ` SELECT * FROM hrm_duty_plan WHERE duty_day =? AND em_no=?   `,
            [
                data.duty_day,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertDutyplanLog: (data, callBack) => {
        pool.query(
            `insert  into hrm_duty_plan_log(
                plan_slno, 
                emp_id,
                em_no,
                new_shift_id,
                duty_day,
                edit_user
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
    getEmployeeDutyplanLog: (data, callBack) => {
        pool.query(
            `SELECT  plan_slno, emp_id, new_shift_id, duty_day ,shft_desc,  shft_cross_day
            FROM hrm_duty_plan_log 
            left join hrm_shift_mast on hrm_shift_mast.shft_slno=hrm_duty_plan_log.new_shift_id
            WHERE  DATE(duty_day) BETWEEN ? AND ?
            AND emp_id IN (?) ORDER BY DATE(duty_day) ASC`,
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
}