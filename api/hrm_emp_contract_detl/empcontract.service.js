const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_contract_detl (
                em_no,
                em_id,
                em_cont_start,
                em_cont_end,
                em_prob_end_date,
                create_user
                                                    
            )
            VALUES (?,?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.em_cont_start,
                data.em_cont_end,
                data.em_prob_end_date,
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
            `UPDATE hrm_emp_contract_detl
                SET em_id = ?,
                    em_cont_start =?,
                    em_cont_end =?,
                    em_cont_renew =?,
                    create_user = ?,
                    edit_user =?,
                    create_date =?,
                    update_date =?
                WHERE em_no =?`,
            [
                data.em_id,
                data.em_cont_start,
                data.em_cont_end,
                data.em_cont_renew,
                data.create_user,
                data.edit_user,
                data.create_date,
                data.update_date,
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
    updatecontractclose: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_contract_detl
                SET em_cont_close=?,
                    em_cont_close_date=?,
                    edit_user=?,
                    status=?
                WHERE em_no =?`,
            [
                data.em_cont_close,
                data.em_cont_close_date,
                data.edit_user,
                data.status,
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
    getDataById: (id, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_contract_detl.em_no,
            hrm_emp_contract_detl.em_id,
            hrm_emp_master.em_name,
			em_cont_start,
            em_cont_end,
            em_cont_compl_status,
            em_cont_renew,
            ecat_name,
            em_cont_renew_date,
            em_cont_close,cont_grace,
            em_cont_close_date,em_category,
            dept_name,sect_name,desg_name,
            hrm_emp_contract_detl.em_prob_end_date as 'pro_end_date'
        FROM hrm_emp_contract_detl
        left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
        left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
        left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
		left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
        left join designation on designation.desg_slno=hrm_emp_master.em_designation
		WHERE hrm_emp_contract_detl.em_id=?`,
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
    updateContractComplete: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_contract_detl
                SET 
                em_cont_close=?,
                em_cont_compl_status = ?,
                em_cont_renew=?,
                em_cont_close_date=?,
                em_cont_renew_date=?,
                status=?,
                edit_user=?
                WHERE em_no =?`,
            [
                data.em_cont_close,
                data.em_cont_compl_status,
                data.em_cont_renew,
                data.em_cont_close_date,
                data.em_cont_renew_date,
                data.status,
                data.edit_user,
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
    // updateEmpMaster: (data, callBack) => {
    //     pool.query(
    //         `update hrm_emp_master
    //             set em_no=?,
    //             em_category=?,
    //             em_contract_end_date=?,
    //             em_prob_end_date=?,
    //             probation_status=?,
    //             contract_status=?,
    //             em_doj=?,
    //             actual_doj=?,
    //             em_designation=?
    //         where em_id=?`,
    //         [
    //             data.em_no,
    //             data.em_category,
    //             data.em_contract_end_date,
    //             data.em_prob_end_date,
    //             data.probation_status,
    //             data.contract_status,
    //             data.em_doj,
    //             data.actual_doj,
    //             data.em_designation,
    //             data.em_id
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     )
    // },

    getContractCloseDetl: (callBack) => {
        pool.query(
            `select 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_contract_detl.em_id,
            hrm_emp_contract_detl.em_no,
            dept_name,
            em_cont_start,
            em_designation,
            desg_name,
            em_cont_close_date,
            em_cont_close,
            em_department,
            em_dept_section,
            em_name,
            sect_name
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
			left join designation on designation.desg_slno=hrm_emp_master.em_designation
			where em_cont_close='C' and em_cont_renew is null and contract_close_hr_appr is null`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractCloseDetlById: (id, callBack) => {
        pool.query(
            `select hrm_emp_contract_detl.em_id,hrm_emp_contract_detl.em_no,dept_name,em_cont_start,em_designation,desg_name,
            em_cont_close_date,em_cont_close,em_department,em_dept_section,em_name,sect_name
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
			left join designation on designation.desg_slno=hrm_emp_master.em_designation
            where em_cont_close='C' and em_cont_renew is null and hrm_emp_contract_detl.em_id=?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //create contract log
    createContractlog: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emplog_contract (
                em_id,
                em_no,
                em_salutation,
                em_name,
                em_gender,
                em_dob,
                em_age_year,
                em_age_month,
                em_age_day,
                em_doj,
                em_mobile,
                em_phone,
                em_email,
                em_branch,
                em_department,
                em_dept_section,
                em_institution_type,
                em_designation,
                em_doc_type,
                em_category,
                em_prob_end_date,
                em_conf_end_date,
                em_retirement_date,
                em_contract_end_date,
                em_status,
                create_user,
                addressPermnt1,
                addressPermnt2, 
                hrm_pin1,
                em_region,
                addressPresent1,
                addressPresent2,
                hrm_pin2, 
                hrm_region2, 
                blood_slno,
                hrm_religion,
                contract_status
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.em_salutation,
                data.em_name,
                data.em_gender,
                data.em_dob,
                data.em_age_year,
                data.em_age_month,
                data.em_age_day,
                data.em_doj,
                data.em_mobile,
                data.em_phone,
                data.em_email,
                data.em_branch,
                data.em_department,
                data.em_dept_section,
                data.em_institution_type,
                data.em_designation,
                data.em_doc_type,
                data.em_category,
                data.em_prob_end_date,
                data.em_conf_end_date,
                data.em_retirement_date,
                data.em_contract_end_date,
                data.em_status,
                data.create_user,
                data.addressPermnt1,
                data.addressPermnt2,
                data.perPincode,
                data.em_region,
                data.addressPresent1,
                data.addressPresent2,
                data.presPincode,
                data.hrm_region2,
                data.blood_slno,
                data.hrm_religion,
                data.contractflag
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    InsertArrearSalaryContractRenew: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_arrear (
                em_id,
                em_no,
                arrear_amount,
                arrear_month,
                create_user                                        
            )
            VALUES (?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.arrear_amount,
                data.arrear_month,
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
    updateConreactrenewAppr: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_contract_detl
                SET status=1
                WHERE em_no =?`,
            [
                data.old_emno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractRenewApprovalList: (callBack) => {
        pool.query(
            `select 
                hrm_emp_contract_detl.em_id,hrm_emp_contract_detl.em_no,em_name,
                sect_name,desg_name,em_status,contract_renew_appr,
                em_doj,em_cont_start,em_cont_end from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
                where em_cont_close is null and em_cont_renew is null and contract_renew_appr=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateQualEmpId: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_qual
            SET em_no=?
            WHERE em_id =?`,
            [
                data.em_no,
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
    EmpIDExpUpdate: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_exp
            SET em_no=?
            WHERE em_id =?`,
            [
                data.em_no,
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
    UpdateEMpIdEarnDeduction: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_earn_deduction
            SET em_no=?
            WHERE em_id =?`,
            [
                data.em_no,
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
    UpdateEMpIdPersonal: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_personal
            SET em_no=?
            WHERE em_id =?`,
            [
                data.em_no,
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
    getContractByEmno: (id, callBack) => {
        pool.query(
            `SELECT em_cont_start,em_cont_end,
            hrm_emp_master.em_id,
                       hrm_emp_master.em_no, 
                       em_name,
                       em_name as emp_name,
                       hrm_branch.branch_name,
                       IF(em_gender = 1, 'Male', 'Female') gender,
                       em_age_year,
                       em_doj,
                       dept_name, 
                       sect_name,
                       em_mobile,
                       designation.desg_name,
                       em_department,
                       em_dept_section,
                       contract_status,
                        em_cont_start,
                           em_cont_end,
                       IF(em_status = 1, 'Yes', 'No') emp_status,
                       recomend_salary  FROM hrm_emp_contract_detl 
           inner join hrm_emp_master on hrm_emp_master.em_no=hrm_emp_contract_detl.em_no
             inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
                       inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
                       inner join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
                       inner join  designation ON designation.desg_slno = hrm_emp_master.em_designation
           where  hrm_emp_contract_detl.em_no=? and em_status=1`,
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
    getContractDetlId: (id, callBack) => {
        pool.query(
            `SELECT * FROM hrm_emp_contract_detl where em_id=?;`,
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
    updateEmpmastSatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master
                SET 
                em_status=?
                WHERE em_id =?`,
            [
                data.em_status,
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
    updatePunchmstEmno: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` UPDATE punch_master 
                    SET em_no=?
                    WHERE duty_day = ? and punch_slno=?`,
                    [val.em_no, val.duty_day, val.punch_slno],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })

        })
    },
    getEmployeeByUserName: (userName, callBack) => {
        pool.query(
            `SELECT * FROM hrm_employee WHERE emp_username = ? AND emp_status = '1'`,
            [userName],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    inactiveLoginNewPromise: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_employee set emp_status = 0 WHERE emp_slno = ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    updateEmpMaster: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `update hrm_emp_master
                set em_no=?,
                em_category=?,
                em_contract_end_date=?,
                em_prob_end_date=?,
                contract_status=?,
                em_doj=?,
                actual_doj=?,
                em_designation=?
            where em_id=?`,
                [
                    data.em_no,
                    data.em_category,
                    data.em_contract_end_date,
                    data.em_prob_end_date,
                    data.contract_status,
                    data.em_doj,
                    data.actual_doj,
                    data.em_designation,
                    data.em_id
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'sucess' })
                    }
                }
            )
        }).catch((error) => {
            return { status: 0 }
        })
    },
    activeLoginNewPromise: async (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_employee set emp_status = 1 WHERE emp_slno = ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0 })
                    }
                    if (results) {
                        resolve({ status: 1 })
                    }
                }
            )
        })
    },
    newLoginInsert: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO hrm_employee
            (
                emp_email,
                emp_username,
                emp_password,
                emp_status,
                emp_create_user, 
                emp_id, 
                emp_no
           )
            VALUES(?,?,?,?,?,?,?)`,
                [data.emp_email,
                data.emp_no,
                data.emp_password,
                data.emp_status,
                data.create_user,
                data.emp_id,
                data.emp_no,
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).catch((error) => {
            return { status: 0 }
        })
    },
    updateQualEmpno: async (data) => {
        const updateQual = new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_emp_qual
                SET em_no=?
                WHERE em_id =?`,
                [
                    data.em_no,
                    data.em_id
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0 })
                    }
                    if (results) {
                        resolve({ status: 1 })
                    }
                }
            )
        })

        const updateExp = new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_emp_exp
                SET em_no=?
                WHERE em_id =?`,
                [
                    data.em_no,
                    data.em_id
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0 })
                    }
                    if (results) {
                        resolve({ status: 1 })
                    }
                }
            )
        })

        const updatePersonal = new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_emp_personal
                SET em_no=?
                WHERE em_id =?`,
                [
                    data.em_no,
                    data.em_id
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0 })
                    }
                    if (results) {
                        resolve({ status: 1 })
                    }
                }
            )
        })

        const SalaryUpdation = new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_emp_earn_deduction
                SET em_no=?
                WHERE em_id =?`,
                [
                    data.em_no,
                    data.em_id
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0 })
                    }
                    if (results) {
                        resolve({ status: 1 })
                    }
                }
            )
        })

        return await Promise.all([updateQual, updateExp, updatePersonal, SalaryUpdation]).then((result) => {
            const updationStatus = result?.find((e) => e.status === 0)
            if (updationStatus === undefined) {
                return { status: 1, message: 'success' }
            } else {
                return { status: 0, message: error }
            }
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },
    reverseUpdateQualEmpno: async (data) => {

        const updateQual = new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_emp_qual
                SET em_no=?
                WHERE em_id =?`,
                [
                    data.em_no,
                    data.em_id
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0 })
                    }
                    if (results) {
                        resolve({ status: 1 })
                    }
                }
            )
        })

        const updateExp = new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_emp_exp
                SET em_no=?
                WHERE em_id =?`,
                [
                    data.em_no,
                    data.em_id
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0 })
                    }
                    if (results) {
                        resolve({ status: 1 })
                    }
                }
            )
        })

        const updatePersonal = new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_emp_personal
                SET em_no=?
                WHERE em_id =?`,
                [
                    data.em_no,
                    data.em_id
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0 })
                    }
                    if (results) {
                        resolve({ status: 1 })
                    }
                }
            )
        })

        const SalaryUpdation = new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_emp_earn_deduction
                SET em_no=?
                WHERE em_id =?`,
                [
                    data.em_no,
                    data.em_id
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0 })
                    }
                    if (results) {
                        resolve({ status: 1 })
                    }
                }
            )
        })

        return await Promise.all([updateQual, updateExp, updatePersonal, SalaryUpdation]).then((result) => {
            const updationStatus = result?.find((e) => e.status === 0)
            if (updationStatus === undefined) {
                return { status: 1 }
            } else {
                return { status: 0 }
            }
        }).catch((error) => {
            return { status: 0 }
        })
    },
    updateDutyPlanData: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_duty_plan
                SET em_no = ?
                WHERE plan_slno IN (?)`,
                [
                    data.em_no,
                    data.dutyplanData
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).catch((e) => { return { status: 0 } })
    },
    updatePunchmstEmno: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE punch_master SET em_no=? where punch_slno IN (?)`,
                [
                    data.em_no,
                    data.punchmast
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({
                            status: 1, message: 'success'
                        })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((e) => { return { status: 0 } })
    },
    newEntryContract: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO hrm_emp_contract_detl (
                em_no,
                em_id,
                em_cont_start,
                em_cont_end,
                em_prob_end_date,
                create_user
                                                    
            )
            VALUES (?,?,?,?,?,?)`,
                [
                    data.em_no,
                    data.em_id,
                    data.em_cont_start,
                    data.em_cont_end,
                    data.em_prob_end_date,
                    data.create_user

                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'sucess' })
                    }
                }
            )
        }).catch((e) => { return { status: 0 } })
    },
    deleteNewLoginEntry: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE FROM hrm_employee WHERE emp_username=?`,
                [
                    data,
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0 })
                    }
                    if (results) {
                        resolve({ status: 1 })
                    }
                }
            )
        }).catch((e) => { return { status: 0 } })
    },
    updatePunchEmno: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE punch_data SET emp_code=? where slno IN (?)`,
                [
                    data.em_no,
                    data.punchslno
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({
                            status: 1, message: 'success'
                        })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((e) => { return { status: 0 } })
    },
    registerUpdate: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_contract_detl
                SET 
                em_cont_start =?,
                em_cont_end =?,
                edit_user =?
                WHERE em_id =?`,
            [
                data.em_cont_start,
                data.em_cont_end,
                data.edit_user,
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
}