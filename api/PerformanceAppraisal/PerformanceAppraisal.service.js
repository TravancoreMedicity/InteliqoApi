const pool = require('../../config/database');

module.exports = {
    getProbationEndList: (callBack) => {
        pool.query(
            `select 
            hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj,
            sect_name,
            hrm_dept_section.sect_id,
            em_prob_end_date,
             ecat_name,
             em_contract_end_date,
             hod,
             incharge
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
			LEFT JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            LEFT JOIN hrm_performance_apprsl ON hrm_emp_master.em_id=hrm_performance_apprsl.em_id
			where des_type=1 and em_prob_end_date<=curdate() and em_prob_end_date!="2000-01-01" 
            and em_status=1 and hrm_emp_master.em_id!=1 and probation_status=1 and appraisal_status is null`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAnnualList: (callBack) => {
        pool.query(
            `SELECT
            ROW_NUMBER() OVER () as slno,
             hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            dept_name,
            desg_name,
            em_doj,
            sect_name,
            ecat_name,
            incharge,
            hod,
            hrm_department.dept_id as dept_id,
            hrm_dept_section.sect_id as sect_id
            FROM medi_hrm.hrm_emp_master
            inner join hrm_emp_category on hrm_emp_master.em_category=hrm_emp_category.category_slno
            inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            inner join designation ON hrm_emp_master.em_designation=designation.desg_slno
            inner join hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_performance_apprsl on hrm_emp_master.em_id = hrm_performance_apprsl.em_id
            where (em_status=1 and emp_type=1) and hrm_emp_master.last_appraisal_date<=curdate() and appraisal_status is null ;`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getTrainingList: (callBack) => {
        pool.query(
            `select 
            hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj,
            ecat_name,
            sect_name,
            em_prob_end_date as training_end,
            incharge,
            hod,
            hrm_department.dept_id as dept_id,
            hrm_dept_section.sect_id as sect_id
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            LEFT JOIN hrm_performance_apprsl ON hrm_emp_master.em_id=hrm_performance_apprsl.em_id
            where des_type=2 and emp_type!=1 and em_prob_end_date<=curdate() and em_prob_end_date!="2000-01-01" 
            and hrm_emp_master.em_status=1 and hrm_emp_master.em_id!=1 and probation_status=1 and appraisal_status is null;  `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractEndList: (callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_id,
            hrm_emp_master.em_no, 
            em_name,
            dept_name,
            desg_name ,
            sect_id,
            em_doj
            FROM medi_hrm.hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_emp_contract_detl ON hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where em_cont_end<=curdate() and contract_renew_appr=1 and em_status=1 ;`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractRenewList: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            dept_name,
            sect_name,
            desg_name,
            sect_id,
            hrm_department.dept_id,
            em_doj
             FROM medi_hrm.hrm_emp_master
             INNER JOIN hrm_emp_contract_detl on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
             INNER JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
             INNER JOIN hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
             INNER JOIN designation on hrm_emp_master.em_designation=designation.desg_slno
             WHERE em_cont_close='C' and em_status=0;  `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_performance_apprsl (
                em_id,
                em_no,
                dept_id,
                sect_id,
                incharge_id,
                incharge_status,
                hod_id,
                hod_status,
                ceo_flag,
                ceo_status,
                appraisal_status,
                last_appraisal_date
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`,
            [
                data.em_id,
                data.em_no,
                data.dept_id,
                data.sect_id,
                data.incharge_id,
                data.incharge_status,
                data.hod_id,
                data.hod_status,
                data.ceo_flag,
                data.ceo_status,
                data.appraisal_status,
                data.last_appraisal_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkIdExist: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_performance_apprsl.em_id,
            hrm_performance_apprsl.em_no,
            hrm_performance_apprsl.dept_id,
            hrm_performance_apprsl.sect_id,
            incharge_id,
            hod_id,
            ceo_id,
            incharge_appraisal_date,
            hod_apprasial_date,
            ceo_appraisal_time,
            hrm_performance_apprsl.create_date,
            CONCAT(UPPER(SUBSTRING(a1.em_name,1,1)),LOWER(SUBSTRING(a1.em_name,2)))  as 'hod_name',
           CONCAT(UPPER(SUBSTRING( a2.em_name,1,1)),LOWER(SUBSTRING( a2.em_name,2)))  as 'incahrge_name',
            CONCAT(UPPER(SUBSTRING(a3.em_name,1,1)),LOWER(SUBSTRING(a3.em_name,2)))  as 'ceo_name',
           CONCAT(UPPER(SUBSTRING(a4.desg_name ,1,1)),LOWER(SUBSTRING(a4.desg_name ,2)))  'hod_desg',
          CONCAT(UPPER(SUBSTRING(a5.desg_name,1,1)),LOWER(SUBSTRING(a5.desg_name,2)))    'incharge_desg',
            CONCAT(UPPER(SUBSTRING(a6.desg_name ,1,1)),LOWER(SUBSTRING(a6.desg_name ,2))) 'ceo_desg'
            FROM medi_hrm.hrm_performance_apprsl
            inner join hrm_emp_master a1 on a1.em_id=hrm_performance_apprsl.hod_id
            inner join hrm_emp_master a2 on a2.em_id=hrm_performance_apprsl.incharge_id
            inner join hrm_emp_master a3 on a3.em_id=hrm_performance_apprsl.ceo_id
            inner join designation a4 on a1.em_designation=a4.desg_slno
			inner join designation a5 on a2.em_designation=a5.desg_slno
            inner join designation a6 on a3.em_designation=a6.desg_slno
            where hrm_performance_apprsl.em_id=?;
            `,
            [
                data.em_id
                //id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatePerformanceAppraisal: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_apprsl
                SET  em_no=?,
                dept_id=?,
                em_id=?,
                incharge_id=?,
                hod_id=?,
                ceo_id=?
            WHERE sect_id = ?; `,
            [
                data.em_no,
                data.dept_id,
                data.em_id,
                data.incharge_id,
                data.hod_id,
                data.ceo_id,
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
    getDataAll: (callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.hrm_performance_apprsl;`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getHodData: (id, callBack) => {
        pool.query(
            `SELECT 
            hrm_performance_apprsl.em_id,
            hrm_performance_apprsl.em_no,
            hrm_emp_master.em_name ,
            dept_name,
            sect_name,
            desg_name,
            em_department,
            em_dept_section,
            em_designation,
            em_doj
            FROM medi_hrm.hrm_performance_apprsl 
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_performance_apprsl.em_id
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where hod_id=? and hod_status=0`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getInchargeData: (id, callBack) => {
        pool.query(
            `SELECT 
            hrm_performance_apprsl.em_id,
            hrm_performance_apprsl.em_no,
            hrm_emp_master.em_name ,
            dept_name,
            sect_name,
            desg_name,
            em_department,
            em_dept_section,
            em_designation,
            em_doj
            FROM medi_hrm.hrm_performance_apprsl 
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_performance_apprsl.em_id
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where incharge_id=? and incharge_status=0`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getExistDetails: (id, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_id,
            CONCAT(UPPER(SUBSTRING( em_name,1,1)),LOWER(SUBSTRING( em_name,2))) as  em_name ,
            CONCAT(UPPER(SUBSTRING( dept_name,1,1)),LOWER(SUBSTRING( dept_name,2))) as dept_name,
            CONCAT(UPPER(SUBSTRING( sect_name,1,1)),LOWER(SUBSTRING( sect_name,2))) as sect_name,
           CONCAT(UPPER(SUBSTRING( desg_name,1,1)),LOWER(SUBSTRING( desg_name,2))) as  desg_name,
            em_doj,
            em_amount,
            sum(em_total_year) as exp_year,
            last_appraisal_date
            FROM medi_hrm.hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            left join hrm_emp_earn_deduction on hrm_emp_master.em_no=hrm_emp_earn_deduction.em_no
            left join hrm_emp_exp on hrm_emp_master.em_id=hrm_emp_exp.em_id
            where hrm_emp_master.em_no=?;`,
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
    createCompetencyAssessment: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_performance_comp_assessment (
                key_result_area,
                kra_desc,
                competency_slno,
                competency_desc,
                em_id
                )
            VALUES ?;`,
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
    getCompetencyAll: (id, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER() as slno,
            assessment_slno,
            key_result_area,
            kra_desc,
            competency_slno,
            competency_desc,
            actual_comp,
            competency_score
             FROM medi_hrm.hrm_performance_comp_assessment where em_id=?`,
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
    updateComptencyAssessment: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_comp_assessment 
            SET actual_comp=?,
            competency_score=?
            WHERE assessment_slno = ?`,
            [
                data.actual_comp,
                data.competency_score,
                data.assessment_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getTrainingNeed: (id, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER() as no,
            kra_desc,
            competency_desc
            FROM medi_hrm.hrm_performance_comp_assessment 
            where competency_score<=2 and em_id=?;`,
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
    createPerformanceAssessment: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_performance_assessment (
                key_result_area,
                kra_desc,
                specification_slno,
                kpi,
                em_id
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
    getPerfAssById: (id, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            p_assessment_slno,
            key_result_area,
            kra_desc,
            kpi,
            specification_slno,
            kpi_score,
            justitfication_score,
            em_id,
            performance_status
            FROM medi_hrm.hrm_performance_assessment where em_id=?`,
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
    updatePerformanceAssessment: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` UPDATE hrm_performance_assessment 
                    SET kpi_score=?,
                    justitfication_score=?
                    WHERE p_assessment_slno = ?`,
                    [val.kpi_score, val.justitfication_score, val.p_assessment_slno],
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
    getCeoData: (callBack) => {
        pool.query(
            `SELECT 
            hrm_performance_apprsl.em_id,
            hrm_performance_apprsl.em_no,
            hrm_emp_master.em_name ,
            dept_name,
            sect_name,
            desg_name,
            em_department,
            em_dept_section,
            em_designation,
            em_doj
            FROM medi_hrm.hrm_performance_apprsl 
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_performance_apprsl.em_id
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where ceo_flag=1  and ceo_status=0 `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    inchargeCareerAdvancement: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_performance_career_advancement (
                em_id,
                incharge_data,
                incharge_res,
                incharge_comment,
                incharge_status
                )
            VALUES (?,?,?,?,?);`,
            [
                data.em_id,
                data.incharge_data,
                data.incharge_res,
                data.incharge_comment,
                data.incharge_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateInchargeStatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_apprsl 
            SET 
            incharge_status=?,
            incharge_appraisal_date=?
            WHERE em_id = ?`,
            [
                data.incharge_status,
                data.incharge_appraisal_date,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateInchargeRemark: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_career_advancement 
            SET incharge_data=?,
            incharge_res=?,
            incharge_comment=?,
            incharge_status=?
            WHERE em_id = ?`,
            [
                data.incharge_data,
                data.incharge_res,
                data.incharge_comment,
                data.incharge_status,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    careerEmpIdExist: (id, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.hrm_performance_career_advancement where (incharge_status=1 or hod_status=1) and em_id=?`,
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
    hodCareerAdvancement: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_performance_career_advancement (
                em_id,
                hod_data,
                hod_res,
                hod_comment,
                hod_status
                )
            VALUES (?,?,?,?,?);`,
            [
                data.em_id,
                data.hod_data,
                data.hod_res,
                data.hod_comment,
                data.hod_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateHodStatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_apprsl 
            SET  hod_status=?,
            hod_apprasial_date=?
            WHERE em_id = ?`,
            [
                data.hod_status,
                data.hod_apprasial_date,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateHodCareer: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_career_advancement 
            SET hod_data=?,
            hod_res=?,
            hod_comment=?,
            hod_status=?
            WHERE em_id = ?`,
            [
                data.hod_data,
                data.hod_res,
                data.hod_comment,
                data.hod_status,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    ceoCareerAdvancement: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_performance_career_advancement (
                em_id,
                ceo_data,
                ceo_res,
                ceo_comment,
                ceo_status
                )
            VALUES (?,?,?,?,?);`,
            [
                data.em_id,
                data.ceo_data,
                data.ceo_res,
                data.ceo_comment,
                data.ceo_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateCeoCareer: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_career_advancement 
            SET ceo_data=?,
            ceo_res=?,
            ceo_comment=?,
            ceo_status=?
            WHERE em_id = ?`,
            [
                data.ceo_data,
                data.ceo_res,
                data.ceo_comment,
                data.ceo_status,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateCeoStatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_apprsl 
            SET  ceo_status=?,
            ceo_id=?,
            ceo_appraisal_time=?
            WHERE em_id = ?`,
            [
                data.ceo_status,
                data.ceo_id,
                data.ceo_appraisal_time,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createExistDetl: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_performance_appraisal_detl (
                em_name,
                em_id,
                total_exp,
                doj,
                present_salary,
                last_appraisal_date
                )
            VALUES (?,?,?,?,?,?);`,
            [
                data.em_name,
                data.em_id,
                data.total_exp,
                data.doj,
                data.present_salary,
                data.last_appraisal_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateEmpStatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_apprsl 
            SET employee_status=?
            WHERE em_id = ?`,
            [
                data.employee_status,
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
    getHRAPpraisalList: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            dept_name,
            sect_name,
            desg_name,
            ecat_name
            FROM medi_hrm.hrm_performance_apprsl
            LEFT JOIN hrm_emp_master on hrm_performance_apprsl.em_id=hrm_emp_master.em_id
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            LEFT JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            where appraisal_status=1`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    completedAppraisal: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            dept_name,
            sect_name,
            desg_name,
			ecat_name
            FROM medi_hrm.hrm_performance_apprsl
            inner JOIN hrm_emp_master on hrm_performance_apprsl.em_id=hrm_emp_master.em_id
            inner JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            inner JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            inner JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            inner JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            where appraisal_status=1 and employee_status=1 and incharge_status=1 and ceo_status=1 and hod_status=1`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    pendigAppraisal: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            dept_name,
            desg_name,
			ecat_name, 
            sect_name,
            case when employee_status is null then 'Employee Approval' when incharge_status is null then 'Incharge Approval' when hod_status is null then "Hod Approval" when ceo_status is null then 'Ceo Approval' end as 'status'
            FROM medi_hrm.hrm_performance_apprsl
            LEFT JOIN hrm_emp_master on hrm_performance_apprsl.em_id=hrm_emp_master.em_id
            INNER JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            INNER JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            INNER JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            INNER JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
			where appraisal_status=1 and  ceo_status is null or employee_status is null or incharge_status is null or hod_status is null`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createPerformanceScore: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_performance_score_detl (
                em_id,
                max_score,
                given_score,
                performance_score,
                performance_grade,
                performance_category
                )
            VALUES (?,?,?,?,?,?);`,
            [
                data.em_id,
                data.max_score,
                data.given_score,
                data.performance_score,
                data.performance_grade,
                data.performance_category
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateLastAppraisalDate: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master 
            SET last_appraisal_date=?
            WHERE em_id = ?`,
            [
                data.last_appraisal_date,
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
    trainingPending: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,dept_name,
            sect_name,desg_name,em_doj,ecat_name,em_prob_end_date as training_end,
            incharge,hod,hrm_department.dept_id as dept_id,hrm_dept_section.sect_id as sect_id,
            case when employee_status is null then 'Employee Approval' when incharge_status is null then 'Incharge Approval' when hod_status is null then "Hod Approval" when ceo_status is null then 'Ceo Approval' end as 'status'
             FROM medi_hrm.hrm_performance_apprsl
            inner join hrm_emp_master on hrm_performance_apprsl.em_id=hrm_emp_master.em_id
            INNER JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            INNER JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            INNER JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            INNER JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where des_type=2 and emp_type=2 and (employee_status is null or ceo_status is null or incharge_status is null or hod_status is null);
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    probationPending: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,dept_name,
            sect_name,desg_name,em_doj,ecat_name,em_prob_end_date as training_end,
            incharge,hod,hrm_department.dept_id as dept_id,hrm_dept_section.sect_id as sect_id,
            case when employee_status is null then 'Employee Approval' when incharge_status is null then 'Incharge Approval' when hod_status is null then "Hod Approval" when ceo_status is null then 'Ceo Approval' end as 'status'
             FROM medi_hrm.hrm_performance_apprsl
            inner join hrm_emp_master on hrm_performance_apprsl.em_id=hrm_emp_master.em_id
            INNER JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            INNER JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            INNER JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            INNER JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where des_type=1  and (employee_status is null or ceo_status is null or incharge_status is null or hod_status is null)
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    permanentPending: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_master.em_id, hrm_emp_master.em_no,em_name,
            dept_name, sect_name, desg_name, em_doj,
            ecat_name,hod,hrm_department.dept_id as dept_id,
            hrm_dept_section.sect_id as sect_id,
            case when employee_status is null then 'Employee Approval' when incharge_status is null then 'Incharge Approval' when hod_status is null then "Hod Approval" when ceo_status is null then 'Ceo Approval' end as 'status'
            FROM medi_hrm.hrm_performance_apprsl
            left join hrm_emp_master on hrm_performance_apprsl.em_id=hrm_emp_master.em_id
            INNER JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            INNER JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            INNER JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            INNER JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where emp_type=1 and (employee_status is null or ceo_status is null or incharge_status is null or hod_status is null)
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    contractPending: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,dept_name,
            sect_name,desg_name,em_doj,ecat_name,em_prob_end_date as training_end,
            incharge,hod,hrm_department.dept_id as dept_id,hrm_dept_section.sect_id as sect_id,
            case when employee_status is null then 'Employee Approval' when incharge_status is null then 'Incharge Approval' when hod_status is null then "Hod Approval" when ceo_status is null then 'Ceo Approval' end as 'status'
             FROM medi_hrm.hrm_performance_apprsl
            inner join hrm_emp_master on hrm_performance_apprsl.em_id=hrm_emp_master.em_id
            INNER JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            INNER JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            INNER JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            INNER JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where emp_type=2 and (employee_status is null or ceo_status is null or incharge_status is null or hod_status is null)
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    empCareerAdvancement: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_performance_career_advancement (
                em_id,
                employee_comment,
                employee_status
                )
            VALUES (?,?,?);`,
            [
                data.em_id,
                data.employee_comment,
                data.employee_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    empIdExistCareerAdvance: (id, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.hrm_performance_career_advancement where em_id=? `,
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
    updateEmployeeStatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_career_advancement 
            SET employee_comment=?,
            employee_status=?
            WHERE em_id = ?`,
            [
                data.employee_comment,
                data.employee_status,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getScoreDtails: (id, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.hrm_performance_score_detl where em_id=?`,
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
    updateScoreDetl: (data, callBack) => {
        pool.query(
            `UPDATE hrm_performance_score_detl 
            SET max_score=?,
            given_score=?,
            performance_score=?,
            performance_grade=?,
            performance_category=?
            WHERE em_id = ?`,
            [
                data.max_score,
                data.given_score,
                data.performance_score,
                data.performance_grade,
                data.performance_category,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmployeeStatus: (id, callBack) => {
        pool.query(
            `SELECT * 
            FROM medi_hrm.hrm_performance_career_advancement 
            inner join hrm_performance_apprsl on hrm_performance_career_advancement.em_id=hrm_performance_apprsl.em_id
            where hrm_performance_career_advancement.employee_status=1 and hrm_performance_apprsl.employee_status=1 and hrm_performance_apprsl.em_id=?`,
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
}
