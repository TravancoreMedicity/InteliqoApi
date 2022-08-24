const pool = require("../../config/database");

module.exports = {

    createrights: (data, callBack) => {
        pool.query(
            `INSERT INTO performance_appriasal_rights (
                dept_id,
                em_id,
                rights_needed
            )
            VALUES ?`,
            [
                // data.dept_id,
                // data.em_id,
                // JSON.stringify(data.rights_needed),
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
    selectrights: (callBack) => {
        pool.query(
            `SELECT p_rights_slno,
            performance_appriasal_rights.dept_id ,
            dept_name,
            rights_needed
            FROM medi_hrm.performance_appriasal_rights
            left join hrm_department on hrm_department.dept_id=performance_appriasal_rights.dept_id
            group by performance_appriasal_rights.dept_id
            order by max(performance_appriasal_rights.dept_id) `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAppraisalRightByID: (id, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.performance_appriasal_rights where p_rights_slno= ?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }

                return callBack(null, results)
            }
        )

    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` UPDATE performance_appriasal_rights 
                                    SET rights_needed=?
                                    WHERE dept_id =?`,
                    [
                        // val.dept_id,
                        JSON.stringify(val.rights_needed),
                        val.dept_id
                    ],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(results);
                    }
                )
            })
        })
    },
    employeeByDepartment: (data, callBack) => {
        pool.query(
            ` SELECT em_id FROM medi_hrm.hrm_emp_master where em_department=?`,
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
    HodInchargeNames: (callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.hrm_emp_master where hod=1 and incharge=1; `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    employeeByID: (data, callBack) => {
        pool.query(
            ` SELECT *FROM medi_hrm.hrm_emp_master where em_id=?`,
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
    HODInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO performance_appriasal_rights (
                dept_id,
                em_id,
                rights_needed,
                hod_incharge
            )
            VALUES (?,?,?,1)`,
            [
                data.dept_id,
                data.em_id,
                JSON.stringify(data.rights_needed),

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    selecthod: (callBack) => {
        pool.query(`
            SELECT p_rights_slno,
            performance_appriasal_rights.dept_id ,
            dept_name,
            rights_needed
            FROM medi_hrm.performance_appriasal_rights
            left join hrm_department on hrm_department.dept_id=performance_appriasal_rights.dept_id
       where hod_incharge=1 ; `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAppraisalRightByHOD: (id, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.performance_appriasal_rights where hod_incharge=1 and p_rights_slno=? ;`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }

                return callBack(null, results)
            }
        )

    },
    updatehod: (data, callBack) => {
        pool.query(
            `UPDATE performance_appriasal_rights 
            SET rights_needed=?
            WHERE  hod_incharge=1 and p_rights_slno=?   `,
            [
                JSON.stringify(data.rights_needed),
                data.p_rights_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getUserRights: (id, callBack) => {
        pool.query(
            `SELECT dept_id, em_id, rights_needed FROM medi_hrm.performance_appriasal_rights where em_id=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }

                return callBack(null, results)
            }
        )

    },
    createPerformanceAppraisal: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_performance_appraisal (
                em_id, 
                em_no,
                appraisal_start_date,
                incharge_required,
                hod_required,
                gm_required,
                om_required,
                hr_required,
                ms_required,
                cno_required,
                acno_required,
                ed_required,
                md_required
                )
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`,
            [
                data.em_id,
                data.em_no,
                data.appraisal_start_date,
                data.incharge_required,
                data.hod_required,
                data.gm_required,
                data.om_required,
                data.hr_required,
                data.ms_required,
                data.cno_required,
                data.acno_required,
                data.ed_required,
                data.md_required
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