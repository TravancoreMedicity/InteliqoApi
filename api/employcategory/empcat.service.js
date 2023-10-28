const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_category (
                ecat_name,
                emp_type,
                ecat_cl,
                ecat_cl_max,
                ecat_sl,
                ecat_sl_max,
                ecat_confere,
                ecat_confere_max,
                ecat_lop,
                ecat_lop_max,
                ecat_mate,
                ecat_mate_max,
                ecat_el,
                ecat_el_max,
                ecat_cont,
                ecat_cont_period,
                ecat_esi_allow,
                ecat_doff_allow,
                ecat_woff_allow,
                ecat_status,
                ecat_training,
                ecat_training_max,
                ecat_prob,
                ecat_prob_period,
                ecat_holiday,
                cont_grace,
                ecate_pf,
                ecat_wwf,
                ecat_lwf,
                create_users
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.ecat_name,
                data.emp_type,
                data.ecat_cl,
                data.ecat_cl_max,
                data.ecat_sl,
                data.ecat_sl_max,
                data.ecat_confere,
                data.ecat_confere_max,
                data.ecat_lop,
                data.ecat_lop_max,
                data.ecat_mate,
                data.ecat_mate_max,
                data.ecat_el,
                data.ecat_el_max,
                data.ecat_cont,
                data.ecat_cont_period,
                data.ecat_esi_allow,
                data.ecat_doff_allow,
                data.ecat_woff_allow,
                data.ecat_status,
                data.ecat_training,
                data.ecat_training_max,
                data.ecat_prob,
                data.ecat_prob_period,
                data.ecat_holiday,
                data.cont_grace,
                data.ecate_pf,
                data.ecat_wwf,
                data.ecat_lwf,
                data.create_users
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
            `SELECT ecat_name,
            category_slno     
                FROM hrm_emp_category
                WHERE ecat_name = ?`,
            [
                data.ecat_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    update: (data, callBack) => {

        pool.query(
            `UPDATE hrm_emp_category
                SET 
                ecat_name=?,
                    emp_type = ?,
                    ecat_cont = ?,
                    ecat_cont_period = ?,
                    ecat_prob = ?,
                    ecat_prob_period =?,
                    ecat_cl =?,
                    ecat_cl_max =?,
                    ecat_el =?,
                    ecat_el_max =?,
                    ecat_sl =?,
                    ecat_sl_max =?,
                    ecat_woff_allow =?,
                    ecat_doff_allow =?,
                    ecat_esi_allow =?,
                    ecat_confere =?,
                    ecat_confere_max =?,
                    ecat_lop =?,
                    ecat_lop_max =?,
                    ecat_mate =?,
                    ecat_mate_max =?,
                    ecat_status = ?,
                    edit_user=?,
                    ecat_training=?,
                    ecat_training_max=?,
                    ecat_holiday=?,
                    cont_grace=?,
                    ecate_pf=?,
                    ecat_wwf=?,
                    ecat_lwf=?
                    WHERE category_slno = ?`,
            [

                data.ecat_name,
                data.emp_type,
                data.ecat_cont,
                data.ecat_cont_period,
                data.ecat_prob,
                data.ecat_prob_period,
                data.ecat_cl,
                data.ecat_cl_max,
                data.ecat_el,
                data.ecat_el_max,
                data.ecat_sl,
                data.ecat_sl_max,
                data.ecat_woff_allow,
                data.ecat_doff_allow,
                data.ecat_esi_allow,
                data.ecat_confere,
                data.ecat_confere_max,
                data.ecat_lop,
                data.ecat_lop_max,
                data.ecat_mate,
                data.ecat_mate_max,
                data.ecat_status,
                data.edit_user,
                data.ecat_training,
                data.ecat_training_max,
                data.ecat_holiday,
                data.cont_grace,
                data.ecate_pf,
                data.ecat_wwf,
                data.ecat_lwf,
                data.category_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_category SET ecat_status = 0 WHERE category_slno = ?`,
            [
                data.category_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getData: (callBack) => {
        pool.query(
            `SELECT category_slno,
            ecat_name,
            emptype_name,
            hrm_emp_category.emp_type,
            ecat_cont,
            ecat_cont_period,
            ecat_prob,
            ecat_prob_period,
            ecat_cl,
            ecat_el,
            ecat_sl,
            ecat_sl_max,
            ecat_woff_allow,
            ecat_doff_allow,
            ecat_esi_allow,
            ecat_confere,
            ecat_confere_max,
            ecat_lop,
            ecat_lop_max,
            ecat_mate,
            ecat_mate_max,
            ecat_status,
            empstat_grace,
            cont_period,
            ecat_cl_max,
            ecat_el_max,
            ecat_sl_max,
            cont_grace,
            if(ecat_status = 1 ,'Yes','No') status,
            ecat_holiday ,
            ecat_training,
            ecat_training_max,
            ecate_pf, ecat_wwf, ecat_lwf
            FROM medi_hrm_policy.hrm_emp_category
            inner join employee_type on hrm_emp_category.emp_type=employee_type.emptype_slno;`,
            [],
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
            category_slno,
            ecat_name,
            emp_type,
            des_type,
            ecat_cont,
            ecat_cont_period,
            ecat_prob,
            ecat_prob_period,
            ecat_cl,
            ecat_el,
            ecat_sl,
            ecat_sl_max,
            ecat_nh,
            ecat_fh,
            ecat_woff_allow,
            ecat_doff_allow,
            ecat_esi_allow,
            ecat_confere,
            ecat_confere_max,
            ecat_lop,
            ecat_lop_max,
            ecat_mate,
            ecat_mate_max,
            ecat_status,
            empstat_grace,
            cont_period,
            ecat_cl_max,
            ecat_el_max,
            ecat_sl_max,
            cont_grace,
            ecat_holiday ,
            ecat_training,
            ecat_training_max,
            ecate_pf, ecat_wwf, ecat_lwf
        FROM hrm_emp_category
        WHERE category_slno = ?`,
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
    getSelect: (callBack) => {
        pool.query(
            `SELECT 
                category_slno,
                ecat_name
            FROM hrm_emp_category
            WHERE ecat_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getSelectContract: (callBack) => {
        pool.query(
            `SELECT category_slno,ecat_name FROM hrm_emp_category where emp_type='2'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    checkemptpe: (data, callBack) => {
        pool.query(
            `SELECT category_slno FROM hrm_emp_category where emp_type=? and  des_type=?`,
            [data.emp_type,
            data.des_type],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    //get Probation End Details
    getProbationEndDetl: (callBack) => {
        pool.query(
            `select em_id,em_no,em_name,sect_name,em_prob_end_date< CURDATE() 'probation_falg',
            em_doj,desg_name,
            em_prob_end_date 
            from hrm_emp_master
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
              left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            left join employee_status on employee_status.emstats_slno=hrm_emp_category.des_type
            where em_prob_end_date between CURDATE() and  ADDDATE(CURDATE(),15) 
            or em_prob_end_date<=CURDATE() and em_status=1 and empstat_name='PROBATION';`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getProbationEndDetlbyDate: (data, callBack) => {
        pool.query(
            `select em_id,em_no,em_name,sect_name,em_prob_end_date< CURDATE() 'probation_falg',
            em_doj,desg_name,empstat_name,
            em_prob_end_date 
            from hrm_emp_master
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            left join employee_status on employee_status.emstats_slno=hrm_emp_category.des_type
            where em_prob_end_date between ? and  ? and em_status=1 and empstat_name='PROBATION'` ,
            [
                data.startdate,
                data.enddate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //get Contract End Details
    getContractEndDetl: (callBack) => {
        pool.query(
            `select 
            ROW_NUMBER() OVER () as slno,
            hrm_emp_contract_detl.em_id,
            hrm_emp_contract_detl.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name,
            em_status,
            em_doj,
            em_cont_start,
            em_cont_end, 
            hrm_dept_section.sect_id,
            hrm_department.dept_id,
            hod,
            incharge
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            LEFT JOIN hrm_performance_apprsl ON hrm_emp_master.em_id=hrm_performance_apprsl.em_id
            where em_cont_close is null and em_cont_renew is null and contract_renew_appr=0 and em_cont_end<=CURDATE() 
            and em_status=1 and appraisal_status is null`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //get Contract End Details
    getcontractEndDetlByDate: (data, callBack) => {
        pool.query(
            `select hrm_emp_contract_detl.em_id,hrm_emp_contract_detl.em_no,em_name,sect_name,desg_name,em_status,
            em_doj,em_cont_start,em_cont_end from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            where em_cont_close is null and em_cont_renew is null and contract_renew_appr=0 and em_cont_end<=CURDATE() or 
            em_cont_end between ? and ? and em_status=1`,
            [
                data.startdate,
                data.enddate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    permanentCate: (callBack) => {
        pool.query(
            `SELECT * FROM hrm_emp_category where ecat_cont=0;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    renewCategory: (callBack) => {
        pool.query(
            `SELECT * FROM hrm_emp_category where ecat_cl!=0 && ecat_cont=1 &&ecat_sl=1;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}


