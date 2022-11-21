const pool = require('../../config/database');

module.exports = {
    getProbationEndList: (callBack) => {
        pool.query(
            `select 
            em_id,
            em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj,
            sect_name,
            sect_id,
            em_prob_end_date,
             ecat_name,
             em_contract_end_date
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
			LEFT JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
			where des_type=1 and emp_type!=1 and em_prob_end_date<=curdate() and em_prob_end_date!="2000-01-01" and em_status=1 and em_id!=1 and probation_status=1;`,
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
            `select 
            em_id,
            em_no,
            em_name,
            dept_name,
            desg_name,
            sect_id,
            em_doj,
            hod,
            incharge,
            ecat_name
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            LEFT JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            where em_category=1 and DATE_ADD(em_doj, INTERVAL 12 MONTH) <=curdate() and em_status=1 ;`,
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
            em_id,
            em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj,
            ecat_name,
            sect_id,
            em_prob_end_date as training_end
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where des_type=2 and emp_type!=1 and em_prob_end_date<=curdate() and em_prob_end_date!="2000-01-01" and em_status=1 and em_id!=1 and probation_status=1; `,
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
    getLevel2Hierarchy: (id, callBack) => {
        pool.query(
            `SELECT 
            level2_slno, 
            highlevel_slno, 
            hrm_hierarchy_level2.sect_id, 
            level2_sect_id ,
            authorization_incharge,
            authorization_hod
            FROM medi_hrm.hrm_hierarchy_level2
            left join hrm_dept_section on hrm_hierarchy_level2.sect_id=hrm_dept_section.sect_id 
            where level2_sect_id=?;`,
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
    getLevel1Hierarchy: (id, callBack) => {
        pool.query(
            `SELECT 
            hierarchylevel_slno, 
            highlevel_slno,
            hrm_hierarchylevel_master.sect_id,
            authorization_incharge,
            authorization_hod
            FROM medi_hrm.hrm_hierarchylevel_master 
            left join hrm_dept_section on hrm_hierarchylevel_master.sect_id=hrm_dept_section.sect_id
            where hrm_hierarchylevel_master.sect_id=?;	`,
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

    getIdOnly: (callBack) => {
        pool.query(
            `select level2_sect_id from hrm_hierarchy_level2;`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createAppraisal: (data, callBack) => {
        pool.query(
            `INSERT INTO appraisal_rights_detl (
                em_id, 
                em_no,
                appraisal_start_date,
                appraisal_type,
                incharge_required,
                hod_required,
                ed_required,
                md_required,
                trustiee_required,
                ceo_required
                )
              VALUES (?,?,?,?,?,?,?,?,?,?);`,
            [
                data.em_id,
                data.em_no,
                data.appraisal_start_date,
                data.appraisal_type,
                data.incharge_required,
                data.hod_required,
                data.ed_required,
                data.md_required,
                data.trustiee_required,
                data.ceo_required
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getInchargeAppraisalList: (data, callBack) => {
        pool.query(
            `SELECT appraisal_rights_detl.em_id,appraisal_rights_detl.em_no,em_name,hrm_dept_section.sect_name,appraisal_type FROM medi_hrm.appraisal_rights_detl
            left join hrm_emp_master on appraisal_rights_detl.em_id=hrm_emp_master.em_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_hierarchylevel_master on hrm_dept_section.sect_id=hrm_hierarchylevel_master.sect_id
            left join hrm_hierarchy_level2 on hrm_dept_section.sect_id=hrm_hierarchy_level2.level2_sect_id
            where hrm_hierarchylevel_master.sect_id=? or hrm_hierarchy_level2.level2_sect_id=? and incharge_required=1`,
            [
                data.sect_id,
                data.level2_sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getHODAppraisalList: (data, callBack) => {
        pool.query(
            `SELECT appraisal_rights_detl.em_id,appraisal_rights_detl.em_no,em_name,hrm_dept_section.sect_name,appraisal_type FROM medi_hrm.appraisal_rights_detl
            left join hrm_emp_master on appraisal_rights_detl.em_id=hrm_emp_master.em_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_hierarchylevel_master on hrm_dept_section.sect_id=hrm_hierarchylevel_master.sect_id
            left join hrm_hierarchy_level2 on hrm_dept_section.sect_id=hrm_hierarchy_level2.level2_sect_id
            where hrm_hierarchylevel_master.sect_id=? or hrm_hierarchy_level2.level2_sect_id=? and hod_required=1`,
            [
                data.sect_id,
                data.level2_sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getCEODepartments: (callBack) => {
        pool.query(
            `select hrm_hierarchylevel_master.sect_id,
            hrm_dept_section.sect_name 
            FROM medi_hrm.hrm_hierarchylevel_master
            left join hrm_dept_section on hrm_hierarchylevel_master.sect_id=hrm_dept_section.sect_id
            where highlevel_slno=4;`,
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
            `select hrm_emp_contract_detl.em_id,
            hrm_emp_contract_detl.em_no,
            em_name,
            sect_name,
            desg_name,
            em_status,
            em_doj,
            em_cont_start,
            em_cont_end ,
            ecat_name,
            dept_name
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
             LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            LEFT JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            where em_cont_close is null and em_cont_renew is null and em_status=1 and contract_renew_appr!=1  
            and em_cont_end<=CURDATE() or (em_cont_end between DATEDIFF(CURDATE(),30) and  ADDDATE(CURDATE(),30)) ;`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}
