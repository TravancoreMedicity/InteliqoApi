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
                sect_id
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
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateserialnum: (callBack) => {
        pool.query(
            `update master_serialno set serial_current=serial_current+1 where serial_slno=7`,
            [],
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
            where dept_id=? and designation=? and sect_id=? `,
            [
                data.dept_id,
                data.designation,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // checkalreadyinsert: (data, callBack) => {
    //     pool.query(
    //         `select duties_id
    //         from job_duties
    //         where duties_id!=? `,
    //         [
    //             data.duties_id
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     )
    // },
    createJobDuties: (data, callBack) => {
        pool.query(
            `INSERT INTO job_duties (
                job_id,
                dept_id,
                designation,
                duties_and_resp,
                sect_id
                )
            VALUES (?,?,?,?,?)`,
            [
                data.job_id,
                data.dept_id,
                data.designation,
                data.duties_and_resp,
                data.sect_id
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
                designation,
                sect_id
                )
            VALUES (?,?,?,?,?,?,?)`,
            [
                data.job_id,
                data.key_result_area,
                data.kpi,
                data.kpi_score,
                data.dept_id,
                data.designation,
                data.sect_id
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
                designation,
                qualification_id,
                sect_id
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
            designation,
            sect_id
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.designation,
                data.sect_id
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
            `select job_summary.dept_id,
            job_summary.designation,
            job_summary.sect_id,
            objective,
			scope,
			branch_name,
			job_summary.reporting_dept,
			designation.desg_name as 'desig',
            hrm_department.dept_name as 'dept',
            hrm_dept_section.sect_name as 'sect',
			equipment_used,
			working_hour,
            summary_slno,
            LPAD(summary_slno,7,'0') 'docno'
			from job_summary           
			left join hrm_branch on hrm_branch.branch_slno=job_summary.work_place
            left join hrm_department on job_summary.dept_id=hrm_department.dept_id
            left join designation on job_summary.designation=designation.desg_slno
            left join hrm_dept_section on job_summary.sect_id=hrm_dept_section.sect_id
			where job_summary.dept_id=? and job_summary.designation=? and job_summary.sect_id=?;`,
            [
                data.dept_id,
                data.designation,
                data.sect_id
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
            `select
            ROW_NUMBER() OVER (ORDER BY duties_slno) as slno, 
            duties_slno,
            job_id,
            duties_and_resp,
            dept_name,
            desg_name
            from job_duties
            left join hrm_department on job_duties.dept_id=hrm_department.dept_id
            left join designation on job_duties.designation=designation.desg_slno
            where job_duties.dept_id=? and job_duties.designation=? and job_duties.sect_id=?`,
            [
                data.dept_id,
                data.designation,
                data.sect_id
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
            `select 
            ROW_NUMBER() OVER (ORDER BY specification_slno) as slno,
            key_result_area,
            kra_desc,
            kpi,
            kpi_score,
            specification_slno,
            dept_name,
            desg_name
            from job_specification
            left join hrm_kra on hrm_kra.kra_slno=job_specification.key_result_area
            left join hrm_department on job_specification.dept_id=hrm_department.dept_id
            left join designation on job_specification.designation=designation.desg_slno
            where job_specification.dept_id=? and job_specification.designation=? and job_specification.sect_id=?`,
            [
                data.dept_id,
                data.designation,
                data.sect_id
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
            where dep_id=? and designation=? and sect_id=?`,
            [
                data.dept_id,
                data.designation,
                data.sect_id
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
            `select 
            course,
            qualification_slno,
            qualification_id,
            cour_desc,
            specialization,
            spec_desc 
            from job_qualification
            left join hrm_mast_course on hrm_mast_course.cour_slno=job_qualification.course
            left join hrm_mast_specializtion on hrm_mast_specializtion.spec_slno=job_qualification.specialization
            where dept_id=? and designation=? and sect_id=?`,
            [
                data.dept_id,
                data.designation,
                data.sect_id
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
                designation,
                sect_id
                )
            VALUES (?,?,?,?,?,?)`,
            [
                data.job_id,
                data.key_result_area,
                data.competency_desc,
                data.dept_id,
                data.designation,
                data.sect_id
            ],
            (error, results, feilds) => {
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
            `select 
            ROW_NUMBER() OVER (ORDER BY competency_slno) as slno,
            competency_desc,
            kra_desc,
            job_id,
            key_result_area,
            competency_slno,
            desg_name,
            dept_name
            from job_competency
            left join hrm_kra on job_competency.key_result_area = hrm_kra.kra_slno
			left join hrm_department on job_competency.dept_id=hrm_department.dept_id
            left join designation on job_competency.designation=designation.desg_slno
            where job_competency.dept_id = ? and job_competency.designation = ? and job_competency.sect_id=?`,
            [
                data.dept_id,
                data.designation,
                data.sect_id

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getjobDescView: (callBack) => {
        pool.query(
            `select 
            ROW_NUMBER() OVER() as no,
            summary_slno,
            job_summary.dept_id,
            job_summary.designation,
            hrm_department.dept_name as dpname,
            designation.desg_name as dsname,
            objective,
            scope,
            job_summary.sect_id,
            hrm_dept_section.sect_name as dpsname
            from job_summary
            left join hrm_department on hrm_department.dept_id=job_summary.dept_id
            left join designation on designation.desg_slno=job_summary.designation
            left join hrm_dept_section on hrm_dept_section.sect_id=job_summary.sect_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateDutiesEach: (data, callBack) => {
        pool.query(
            `UPDATE 
            medi_hrm.job_duties 
            set duties_and_resp=?
            where  duties_slno=?;`,
            [
                data.duties_and_resp,
                data.duties_slno
            ],

            (error, results, feilds) => {
                if (error) {

                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteduties: (id, callBack) => {
        pool.query(
            `delete from job_duties where duties_slno =?`,
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
    updateCompeteEach: (data, callBack) => {
        pool.query(
            `UPDATE 
            medi_hrm.job_competency 
            set key_result_area=?,
            competency_desc=?
            where competency_slno=?;`,
            [
                data.key_result_area,
                data.competency_desc,
                data.competency_slno
            ],

            (error, results, feilds) => {
                if (error) {

                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deletecompetency: (id, callBack) => {
        pool.query(
            `delete from job_competency where competency_slno =?`,
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
    deletePerformance: (id, callBack) => {
        pool.query(
            `delete from job_specification where specification_slno =?;`,
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
    updatePerforEach: (data, callBack) => {
        pool.query(
            `UPDATE medi_hrm.job_specification 
            set key_result_area=?,
            kpi=?, 
            kpi_score=? 
            where specification_slno=?;`,
            [
                data.key_result_area,
                data.kpi,
                data.kpi_score,
                data.specification_slno
            ],

            (error, results, feilds) => {
                if (error) {

                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteQualifi: (id, callBack) => {
        pool.query(
            `delete from job_qualification where qualification_slno =?;`,
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
    updateGeneric: (data, callBack) => {
        pool.query(
            `UPDATE medi_hrm.job_generic
            set 
            experience= ?,
            experience_year=?,
            age_from=?,
            age_to=?,
            is_female=?,
            is_male =?,
            special_comment = ?
            where job_generic_slno=?`,
            [
                data.experience,
                data.experience_year,
                data.age_from,
                data.age_to,
                data.is_female,
                data.is_male,
                data.special_comment,
                data.job_generic_slno
            ],

            (error, results, feilds) => {
                if (error) {

                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateGeneric: (data, callBack) => {
        pool.query(
            `UPDATE medi_hrm.job_generic
            set 
            experience= ?,
            experience_year=?,
            age_from=?,
            age_to=?,
            is_female=?,
            is_male =?,
            special_comment = ?
            where job_generic_slno=?`,
            [
                data.experience,
                data.experience_year,
                data.age_from,
                data.age_to,
                data.is_female,
                data.is_male,
                data.special_comment,
                data.job_generic_slno
            ],

            (error, results, feilds) => {
                if (error) {

                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getKPIScore: (data, callBack) => {
        pool.query(
            `select sum(kpi_score) as 'total' from job_specification where job_specification.dept_id=? and job_specification.designation=? ;`,
            [
                data.designation,
                data.dept_id,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getJobDutiesById: (id, callBack) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER (ORDER BY duties_slno) as slno, 
            duties_slno,
            job_id,
            duties_and_resp,
            dept_name,
            desg_name
            from job_duties
            left join hrm_department on job_duties.dept_id=hrm_department.dept_id
            left join designation on job_duties.designation=designation.desg_slno where job_id=?;`,
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
    getJobCompetencyById: (id, callBack) => {
        pool.query(
            `select 
            ROW_NUMBER() OVER () as slno, job_comp.* from (SELECT 
                      group_concat(competency_desc) as competency_desc ,
                        kra_desc,
                        job_id,
                        key_result_area,
                        competency_slno,
                        desg_name,
                        dept_name
                        from job_competency
                        left join hrm_kra on job_competency.key_result_area = hrm_kra.kra_slno
                        left join hrm_department on job_competency.dept_id=hrm_department.dept_id
                        left join designation on job_competency.designation=designation.desg_slno where job_id=?
                        group by kra_desc
                        order by max(key_result_area)) as job_comp;`,
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
    getJobPerformanceById: (id, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.job_specification
            left join hrm_kra on hrm_kra.kra_slno=job_specification.key_result_area
            where job_id=?;`,
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
    getJobPerformanceById: (id, callBack) => {
        pool.query(
            `select ROW_NUMBER() OVER () as slno, job_spec.* from (SELECT 
                key_result_area,
                kra_desc,
                group_concat(kpi) as kpi, 
                kpi_score,
                specification_slno,
                dept_name,
                desg_name
                from job_specification
                left join hrm_kra on hrm_kra.kra_slno=job_specification.key_result_area
                left join hrm_department on job_specification.dept_id=hrm_department.dept_id
                left join designation on job_specification.designation=designation.desg_slno
                where job_id=? group by kra_desc
                order by max(key_result_area)) as job_spec;`,
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
    getJobGenericById: (id, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.job_generic where job_id=?;`,
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
    getJobQualifiById: (id, callBack) => {
        pool.query(
            `
            SELECT * FROM medi_hrm.job_qualification
            left join hrm_mast_course on hrm_mast_course.cour_slno=job_qualification.course
                        left join hrm_mast_specializtion on hrm_mast_specializtion.spec_slno=job_qualification.specialization
             where job_id=?;`,
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
    getJobSummaryById: (id, callBack) => {
        pool.query(
            `
            SELECT 
CONCAT(UCASE(LEFT(designation.desg_name,1)),LCASE(SUBSTRING(designation.desg_name,2))) as 'desig',
  CONCAT(UCASE(LEFT(hrm_department.dept_name,1)),LCASE(SUBSTRING(hrm_department.dept_name,2)))  as 'dept',
  CONCAT(UCASE(LEFT(hrm_dept_section.sect_name,1)),LCASE(SUBSTRING(hrm_dept_section.sect_name,2)))  as 'sect',
            objective,
            scope,
            reporting_dept,
            equipment_used,     
            branch_name,
            working_hour ,
            summary_slno ,
            DATE_FORMAT(job_summary.create_date, '%d-%m-%Y') as 'date',
            DATE_FORMAT(edit_date, '%d-%m-%Y')edit_date,
            LPAD(summary_slno,7,'0') 'Docno' 
            FROM medi_hrm.job_summary
            left join hrm_branch on hrm_branch.branch_slno=job_summary.work_place
            left join hrm_department on job_summary.dept_id=hrm_department.dept_id
            left join designation on job_summary.designation=designation.desg_slno
            left join hrm_dept_section on job_summary.sect_id=hrm_dept_section.sect_id where summary_slno=?;`,
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
    createSkills: (data, callBack) => {
        pool.query(
            `INSERT INTO job_skills (
                job_id,
                dept_id,
                designation,
                skill_desc,
                sect_id
                )
            VALUES (?,?,?,?,?)`,
            [
                data.job_id,
                data.dept_id,
                data.designation,
                data.skill_desc,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSkills: (data, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            skills_slno,
            job_id,
            skill_desc,
            dept_name,
            sect_name,
            desg_name
            FROM medi_hrm.job_skills
            inner join hrm_department on job_skills.dept_id=hrm_department.dept_id
            inner join hrm_dept_section on job_skills.sect_id=hrm_dept_section.sect_id
            inner join designation on job_skills.designation=designation.desg_slno
            where job_skills.dept_id=? and job_skills.sect_id=? and job_skills.designation=?`,
            [
                data.dept_id,
                data.sect_id,
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
    deleteskills: (id, callBack) => {
        pool.query(
            `delete from job_skills where skills_slno =?`,
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
    updateSkills: (data, callBack) => {
        pool.query(
            `UPDATE 
            medi_hrm.job_skills 
            set skill_desc=?
            where  skills_slno=?;`,
            [
                data.skill_desc,
                data.skills_slno
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