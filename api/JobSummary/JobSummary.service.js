const { log } = require('winston');
const { Console } = require('winston/lib/winston/transports');
const pool = require('../../config/database');

module.exports = {
    createJobSummary: (data, callBack) => {
        pool.query(
            `INSERT INTO job_summary (
                summary_slno,
                dept_id,
                designation,
                objective,
                scope,
                work_place,
                working_hour,
                reporting_dept,
                reporting_designation,
                equipment_used,
                create_user,
                created_date
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.summary_slno,
                data.dept_id,
                data.designation,
                data.objective,
                data.scope,
                data.work_place,
                JSON.stringify(data.working_hour),
                data.reporting_dept,
                data.reporting_designation,
                data.equipment_used,
                data.create_user,
                data.created_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CheckInsertValue: (data, callBack) => {
        pool.query(
            `select summary_slno
            from job_summary
            where dept_id=? and designation=?`,
            [
                data.dept_id,
                data.designation
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createJobDuties: (data, callBack) => {
        pool.query(
            `INSERT INTO job_duties (
                job_id,
                dept_id,
                designation,
                duties_and_resp)
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
    getjobId: (callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.master_serialno where serial_slno=7`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    createJobSpecification: (data, callBack) => {
        pool.query(
            `INSERT INTO job_specification (
                job_id,
                key_result_area,
                kpi,
                kpi_score,
                dept_id,
                designation)
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
    createJobQualification: (data, callBack) => {
        pool.query(
            `INSERT INTO job_qualification (
                job_id,
                course,
                specialization,
                dept_id,
                designation
            )
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
    createJobGeneric: (data, callBack) => {
        pool.query(
            `INSERT INTO job_generic (
             job_id,
            experience,
            experience_year,
            age_from,
            age_to,
            is_female,
            is_male,
            special_comment,
            dep_id,
            designation
                )
            VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.job_id,
                data.experience,
                data.experience_year,
                data.age_from,
                data.age_to,
                data.is_female,
                data.is_male,
                data.special_comment,
                data.dept_id,
                data.designation
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getJobSummary: (data, callBack) => {
        pool.query(
            `select job_summary.dept_id,job_summary.designation,objective,
            scope,branch_name,dept_name as 'report_dept',desg_name as 'reportingdesignation',equipment_used,working_hour
            from job_summary
            left join hrm_department on hrm_department.dept_id=job_summary.reporting_dept
            left join designation on designation.desg_slno=job_summary.reporting_designation
            left join hrm_branch on hrm_branch.branch_slno=job_summary.work_place
            where job_summary.dept_id=? and job_summary.designation=?`,
            [
                data.dept_id,
                data.designation
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getJobDuties: (data, callBack) => {
        pool.query(
            `select duties_slno,job_id,duties_and_resp from job_duties
            where dept_id=? and designation=?`,
            [
                data.dept_id,
                data.designation
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getJobSpecification: (data, callBack) => {
        pool.query(
            `select key_result_area,kra_desc,kpi,kpi_score
            from job_specification
            left join hrm_kra on hrm_kra.kra_slno=job_specification.key_result_area
            where dept_id=? and designation=?`,
            [
                data.dept_id,
                data.designation
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getJobGeneric: (data, callBack) => {
        pool.query(
            `
            select * from job_generic
            where dep_id=? and designation=?`,
            [
                data.dept_id,
                data.designation
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getJobQualification: (data, callBack) => {
        pool.query(
            `
            select course,cour_desc,specialization,spec_desc from job_qualification
            left join hrm_mast_course on hrm_mast_course.cour_slno=job_qualification.course
            left join hrm_mast_specializtion on hrm_mast_specializtion.spec_slno=job_qualification.specialization
            where dept_id=? and designation=?`,
            [
                data.dept_id,
                data.designation
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createJobCompetency: (data, callBack) => {
        pool.query(
            `INSERT INTO job_competency (
                job_id,
                key_result_area,
                competency_desc,
                dept_id,
                designation
                )
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                console.log(results);
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getJobSummarydetl: (id, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.job_summary
            where summary_slno=?`,
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
    updatejobsummarydetl: (data, callBack) => {
        pool.query(
            `UPDATE medi_hrm.job_summary
        set 
        objective= ?,
        scope=?,
        work_place=?,
        reporting_dept=?,
        reporting_designation=?,
        equipment_used =?,
        working_hour = ?
        where summary_slno=?`,
            [
                data.objective,
                data.scope,
                data.work_place,
                data.reporting_dept,
                data.reporting_designation,
                data.equipment_used,
                JSON.stringify(data.working_hour),
                data.summary_slno
            ],

            (error, results, feilds) => {
                if (error) {

                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getjobcompetency: (data, callBack) => {
        pool.query(
            `select competency_desc,kra_desc from job_competency
            left join hrm_kra on job_competency.key_result_area = hrm_kra.kra_slno
                    where dept_id = ? and designation = ?`,
            [
                data.dept_id,
                data.designation
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