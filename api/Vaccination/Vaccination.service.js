const pool = require('../../config/database');

module.exports = {
    getData: (callBack) => {
        pool.query(
            `SELECT 
            vaccination_master.em_id,
            vaccination_master.em_no,
            em_name,
            dept_name,
            sect_name,
            em_status,
            first_dose_given_status,
            booster_dose_given_status,
            first_dose_status,
            second_dose_status,
            third_dose_status,
            booster_dose_status,
            hic_frst_dose_status,
            hic_second_dose_status,
            hic_third_dose_status,
            hic_booster_dose_status,
            booster_dose_given_date,
            firstdose_date,
            second_dose_given_date,
            third_dose_given_date,
            hic_second_dose_date,
            first_vacc_emid,
            second_vacc_emid,
            third_vacc_emid,
            booster_vacc_emid,
            hic_first_dose_date,
            hic_second_dose_date,
            hic_thirdt_dose_date,
            hic_boostert_dose_date,
            hic_emid_first_verified,
            hic_emid_second_verified,
            hic_emid_third_verified,
            hic_emid_booster_verified,
            pending_status,
            annual_dose
             FROM medi_hrm.vaccination_master
             inner join hrm_emp_master on vaccination_master.em_id=hrm_emp_master.em_id
             inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
             inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
             WHERE vaccination_master.em_id <> 1; `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    // vaccination insert for firstdose_date

    vaccinationInsert: (data, callBack) => {

        pool.query(
            `UPDATE vaccination_master SET first_dose_given_date=?,first_dose_given_status=1 WHERE em_no = ?;`,
            [
                data.fromDate,
                data.em_no,


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // vaccination booster dose

    vaccinationBoosterInsert: (data, callBack) => {

        pool.query(
            `UPDATE vaccination_master SET booster_dose_date_given=?,booster_dose_given_status=1 WHERE em_no = ?;`,
            [
                data.fromDate,
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getVaccination: (data, callBack) => {
        pool.query(
            ` SELECT 
            vaccination_master.em_id,
            vaccination_master.em_no,
            em_name,
            dept_name,
            sect_name,
            em_status,
            first_dose_status,
            second_dose_status,
            third_dose_status,
            first_dose_given_status,
            booster_dose_given_status,
            first_dose_given_date,
            firstdose_date,
             second_dose_given_date, 
             second_dose_due_date,
             third_dose_given_date,
             third_dose_due_date,
              booster_dose_given_date,
             booster_dose_due_date, 
             booster_dose_status,
             booster_dose_date_given,
             group_name,
             em_mobile,
             vaccin_slno,
             remark,
             remarksecond,
             remarkthird,
             remarkbooster,
              hic_frst_dose_status,
             hic_second_dose_status,
             hic_third_dose_status,
             hic_booster_dose_status
             FROM medi_hrm.vaccination_master
             INNER JOIN hrm_emp_master ON vaccination_master.em_id = hrm_emp_master.em_id
             INNER JOIN hrm_department ON hrm_emp_master.em_department = hrm_department.dept_id
             INNER JOIN hrm_dept_section ON hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
             INNER JOIN bloodgroup ON hrm_emp_master.blood_slno = bloodgroup.group_slno
             WHERE vaccination_master.em_no  = ?
           `,
            [
                data,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    SeconddoseInsert: (data, callBack) => {

        pool.query(
            `UPDATE vaccination_master SET second_dose_given_date=?,remarksecond=?,second_vacc_emid=?,second_dose_status=1,pending_status=0 WHERE em_no = ?;`,
            [
                data.fromDate,
                data.remarkssecond,
                 data.em_id,
                data.em_no,


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    ThirddoseInsert: (data, callBack) => {

        pool.query(
            `UPDATE vaccination_master SET third_dose_given_date=?,remarkthird=?,third_vacc_emid=?,third_dose_status=1,pending_status=0 WHERE em_no = ?;`,
            [
                data.fromDate,
                data.remarksthird,
                  data.em_id,
                data.em_no,
                


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    // get the vaccination deatils of the search employee

    getDataVaccination: (data, callBack) => {
        pool.query(
            ` 
            SELECT 
                   vaccination_master.em_id,
                   vaccination_master.em_no,
                   em_name,
                   dept_name,
                   sect_name,
                   em_status,
                   first_dose_status,
                   second_dose_status,
                   third_dose_status,
                   first_dose_given_status,
                   booster_dose_given_status,
                   first_dose_given_date,
                   firstdose_date,
	                second_dose_given_date, 
                    second_dose_due_date,
                    third_dose_given_date,
                    third_dose_due_date,
                     booster_dose_given_date,
                    booster_dose_due_date, 
                    booster_dose_status,
                    booster_dose_date_given,
                    group_name,
                    em_mobile,
                    hic_frst_dose_status,
                    hic_second_dose_status,
                    hic_third_dose_status,
                    hic_booster_dose_status
        
                    FROM medi_hrm.vaccination_master
                    INNER JOIN hrm_emp_master ON vaccination_master.em_id = hrm_emp_master.em_id
                    INNER JOIN hrm_department ON hrm_emp_master.em_department = hrm_department.dept_id
                    INNER JOIN hrm_dept_section ON hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
                    INNER JOIN bloodgroup ON hrm_emp_master.blood_slno = bloodgroup.group_slno
                    WHERE vaccination_master.em_no  = ?; 
           `,
            [
                data,
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    // vaccination entry page API

    vaccinationInsertEntry: (data, callBack) => {
        pool.query(
            `UPDATE vaccination_master SET 
            first_dose_status=1,
            firstdose_date=?,
            second_dose_due_date=?,
            third_dose_due_date=?,
            booster_dose_due_date=?,
            remark=?,
            first_vacc_emid=?,
            pending_status=0,
            annual_dose=?
             WHERE em_no=?;`,
            [
                data.fromDate,
                data.secondDoseDueDate,
                data.thirdDoseDueDate,
                data.booster_dose_due_date,
                data.remarks,
                data.em_id,
                data.annual_dose,
                data.em_no,
              
                // data.vaccin_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    vaccinationInsertBooster: (data, callBack) => {

        pool.query(
            `UPDATE vaccination_master SET firstdose_date=?,second_dose_given_date=?,third_dose_given_date=?,booster_dose_given_date=?,
            first_dose_status=1,second_dose_status=1,third_dose_status=1,remarkbooster=?,booster_vacc_emid=?,booster_dose_status=1,pending_status=0,annual_dose=? WHERE em_no = ?;`,
            [
                data.fromDate,
                data.fromDate,
                data.fromDate,
                data.fromDate,
                data.remarksbooster,
                data.em_id,
                data.annual_dose,
                data.em_no,
             


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    // hic  api
     hicinsertfirstdose: (data, callBack) => {

        pool.query(
            `UPDATE vaccination_master SET hic_first_dose_date=?,hic_emid_first_verified=?,hic_remark_first=?,hic_frst_dose_status=1 WHERE em_no = ?;`,
            [
                data.fromDate,
                data.em_id,
                data.remarks,
                data.em_no,
                


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
      hicinsertseconddose: (data, callBack) => {

        pool.query(
            `UPDATE vaccination_master SET hic_second_dose_date=?,hic_emid_second_verified=?,hic_remark_second=?,hic_second_dose_status=1 WHERE em_no = ?;`,
            [
                data.fromDate,
                  data.em_id,
                  data.remarks,
                data.em_no,
                


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
     hicinsertthirddose: (data, callBack) => {

        pool.query(
            `UPDATE vaccination_master SET hic_thirdt_dose_date=?,hic_emid_third_verified=?,hic_remark_third=?,hic_third_dose_status=1 WHERE em_no = ?;`,
            [
                data.fromDate,
                  data.em_id,
                  data.remarks,
                data.em_no,
                


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
      hicinsertboosterdose: (data, callBack) => {

        pool.query(
            `UPDATE vaccination_master SET hic_boostert_dose_date=?,hic_emid_booster_verified=?,hic_remark_booster=?,hic_booster_dose_status=1 WHERE em_no = ?;`,
            [
                data.fromDate,
                  data.em_id,
                  data.remarks,
                data.em_no,
                


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // annual insert api
      annualvaccinationInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO  vaccination_master_details SET 
            em_id=?,
            em_no=?,
            firstdose_date=?,
            second_dose_given_date=?,
            third_dose_given_date=?,
            hic_first_dose_date=?,
            hic_second_dose_date=?,
            hic_thirdt_dose_date=?,
            hic_emid_first_verified=?,
            hic_emid_second_verified=?,
            hic_emid_third_verified=?,
            first_vacc_emid=?,
            second_vacc_emid=?,
            third_vacc_emid=?;`,
            [
                data.em_id,
                data.em_no,
                data.firstdosedate,
                data.secondDoseDate,
                data.thirdDoseDate,
                data.hicfirst_dose_date,
                data.hic_second_dose_date,
                data.hic_thirdt_dose_date,
                data.hic_emid_first_verified,
                data.hic_emid_second_verified,
                data.hic_emid_third_verified,
                data.first_vacc_emid,
                data.second_vacc_emid,
                data.third_vacc_emid,
            
                // data.vaccin_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
     updateannualinsert: (data, callBack) => {
        pool.query(
            `UPDATE vaccination_master 
            SET  first_dose_given_date=null,
            booster_dose_date_given=null,
            firstdose_date=null,
            first_dose_given_status=0,
            booster_dose_given_status=0,
            first_dose_status=0,
            second_dose_given_date=null,
            second_dose_due_date=null,
            second_dose_status=0,
            third_dose_given_date=null,
            third_dose_due_date=null,
            third_dose_status=0,
            booster_dose_given_date=null,
            booster_dose_due_date=null,
            booster_dose_status=0,
            remark=null,
            remarksecond=null,
            remarkthird=null,
            remarkbooster=null,
            hic_first_dose_date=null,
            hic_second_dose_date=null,
            hic_thirdt_dose_date=null,
            hic_boostert_dose_date=null,
            hic_frst_dose_status=0,
            hic_second_dose_status=0,
            hic_third_dose_status=0,
            hic_booster_dose_status=0,
            hic_emid_first_verified=0,
            hic_emid_second_verified=0,
            hic_emid_third_verified=0,
            hic_emid_booster_verified=0,
            hic_remark_first=null,
            hic_remark_second=null,
            hic_remark_third=null,
            hic_remark_booster=null,
            first_vacc_emid=0,
            second_vacc_emid=0,
            third_vacc_emid=0,
            booster_vacc_emid=0,
            pending_status=1,
            annual_dose=null
            WHERE em_id = ?`,
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
      annualvaccinationbooster: (data, callBack) => {
        pool.query(
            `INSERT INTO  vaccination_master_details SET 
            em_id=?,
            em_no=?,
            firstdose_date=?,
            second_dose_given_date=?,
            third_dose_given_date=?,
            hic_first_dose_date=?,
            hic_second_dose_date=?,
            hic_thirdt_dose_date=?,
            hic_emid_first_verified=?,
            hic_emid_second_verified=?,
            hic_emid_third_verified=?,
            first_vacc_emid=?,
            second_vacc_emid=?,
            third_vacc_emid=?,
            booster_dose_given_date=?,
            hic_boostert_dose_date=?,
            hic_emid_booster_verified=?,
            booster_vacc_emid=?
            ;`,
            [
                data.em_id,
                data.em_no,
                data.firstdosedate,
                data.secondDoseDate,
                data.thirdDoseDate,
                data.hicfirst_dose_date,
                data.hic_second_dose_date,
                data.hic_thirdt_dose_date,
                data.hic_emid_first_verified,
                data.hic_emid_second_verified,
                data.hic_emid_third_verified,
                data.first_vacc_emid,
                data.second_vacc_emid,
                data.third_vacc_emid,
                data.booster_dose_due_date,
                data.hic_boostert_dose_date,
                data.hic_emid_booster_verified,
                data.booster_vacc_emid,
            
                // data.vaccin_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
      },
       getannualvac: (data, callBack) => {
      
        pool.query(
            ` 
        SELECT * FROM vaccination_master_details where em_id=?;
           `,
            [
                data,
            ],
            (error, results, feilds) => {
  
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
     vaccinationentry: (data, callBack) => {

        pool.query(
            `INSERT INTO vaccination_master SET   
            em_id=?,
            em_no=?;`,
            [
                data.emp_id,
                data.emp_no,
             


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // hic vaccination list
     getEmpdetl: (data, callBack) => {
        pool.query(
            `select a.em_no,
            CONCAT(UPPER(SUBSTRING(a.em_name,1,1)),LOWER(SUBSTRING(a.em_name,2)))  as 'em_name',
            a.em_id,
            a.em_doj,
            hrm_emp_contract_detl.em_cont_start,
            a.contract_status,
            a.gross_salary,
            hrm_department.dept_id,
            hrm_dept_section.sect_id,
            CONCAT(UPPER(SUBSTRING(dept_name,1,1)),LOWER(SUBSTRING(dept_name,2)))  as 'dept_name',
            CONCAT(UPPER(SUBSTRING(b.desg_name,1,1)),LOWER(SUBSTRING(b.desg_name,2)))  as 'desg_name',
            sect_name,
              DATE_FORMAT(hic_first_dose_date, '%d/%m/%Y') AS 'hic_first_dose_date',
              DATE_FORMAT(hic_second_dose_date, '%d/%m/%Y') AS 'hic_second_dose_date',
              DATE_FORMAT(hic_thirdt_dose_date, '%d/%m/%Y') AS 'hic_thirdt_dose_date',
              DATE_FORMAT(hic_boostert_dose_date, '%d/%m/%Y') AS 'hic_boostert_dose_date',
              hic_frst_dose_status,
            hic_second_dose_status,
            hic_third_dose_status,
            hic_booster_dose_status,
              a.em_age_year,
              a.em_dob,
              group_name,
              a.em_gender,
              hic_emid_first_verified,
                   hic_emid_second_verified,
                   hic_emid_third_verified,
                   hic_emid_booster_verified,
                   first_vacc_emid,
                   second_vacc_emid,
                   third_vacc_emid,
                   booster_vacc_emid,
                    DATE_FORMAT(firstdose_date, '%d/%m/%Y') AS 'firstdose_date',
                   DATE_FORMAT(second_dose_given_date, '%d/%m/%Y') AS 'second_dose_given_date',
                   DATE_FORMAT(third_dose_given_date, '%d/%m/%Y') AS 'third_dose_given_date',
                   DATE_FORMAT(booster_dose_given_date, '%d/%m/%Y') AS 'booster_dose_given_date',
                    CONCAT(UPPER(SUBSTRING(a1.em_name,1,1)),LOWER(SUBSTRING(a1.em_name,2)))  as 'em_name_first_verified',
                    CONCAT(UPPER(SUBSTRING(a2.em_name,1,1)),LOWER(SUBSTRING(a2.em_name,2)))  as 'em_name_second_verified',
                    CONCAT(UPPER(SUBSTRING(a3.em_name,1,1)),LOWER(SUBSTRING(a3.em_name,2)))  as 'em_name_third_verified',
                    CONCAT(UPPER(SUBSTRING(a4.em_name,1,1)),LOWER(SUBSTRING(a4.em_name,2)))  as 'em_name_booster_verified',
                    CONCAT(UPPER(SUBSTRING(a5.em_name,1,1)),LOWER(SUBSTRING(a5.em_name,2)))  as 'first_verified',
                    CONCAT(UPPER(SUBSTRING(a6.em_name,1,1)),LOWER(SUBSTRING(a6.em_name,2)))  as 'second_verified',
                    CONCAT(UPPER(SUBSTRING(a7.em_name,1,1)),LOWER(SUBSTRING(a7.em_name,2)))  as 'third_verified',
                    CONCAT(UPPER(SUBSTRING(a8.em_name,1,1)),LOWER(SUBSTRING(a8.em_name,2)))  as 'booster_verified',
                    CONCAT(UPPER(SUBSTRING(b1.desg_name,1,1)),LOWER(SUBSTRING(b1.desg_name,2)))  as 'firstdesg',
                    CONCAT(UPPER(SUBSTRING(b2.desg_name,1,1)),LOWER(SUBSTRING(b2.desg_name,2)))  as 'secdesg',
                    CONCAT(UPPER(SUBSTRING(b3.desg_name,1,1)),LOWER(SUBSTRING(b3.desg_name,2)))  as 'thirddesg',
                    CONCAT(UPPER(SUBSTRING(b4.desg_name,1,1)),LOWER(SUBSTRING(b4.desg_name,2)))  as 'boosterdesg'
                   FROM vaccination_master
                    
                   INNER JOIN hrm_emp_master a ON vaccination_master.em_id =a.em_id
                   LEFT JOIN hrm_emp_master a1 ON a1.em_id = vaccination_master.hic_emid_first_verified AND vaccination_master.hic_emid_first_verified <> 0
                   LEFT JOIN hrm_emp_master a2 ON a2.em_id = vaccination_master.hic_emid_second_verified AND vaccination_master.hic_emid_second_verified <> 0
                   LEFT JOIN hrm_emp_master a3 ON a3.em_id = vaccination_master.hic_emid_third_verified AND vaccination_master.hic_emid_third_verified <> 0
                   LEFT JOIN hrm_emp_master a4 ON a4.em_id = vaccination_master.hic_emid_booster_verified AND vaccination_master.hic_emid_booster_verified <> 0
                    LEFT JOIN hrm_emp_master a5 ON a5.em_id = vaccination_master.first_vacc_emid AND vaccination_master.first_vacc_emid <> 0
                    LEFT JOIN hrm_emp_master a6 ON a6.em_id = vaccination_master.second_vacc_emid AND vaccination_master.second_vacc_emid <> 0
                    LEFT JOIN hrm_emp_master a7 ON a7.em_id = vaccination_master.third_vacc_emid AND vaccination_master.third_vacc_emid <> 0
                    LEFT JOIN hrm_emp_master a8 ON a8.em_id = vaccination_master.booster_vacc_emid AND vaccination_master.booster_vacc_emid <> 0
                   left join hrm_emp_contract_detl on hrm_emp_contract_detl.em_no = a.em_no and hrm_emp_contract_detl.status = 0
                      LEFT JOIN designation b1 ON a1.em_designation = b1.desg_slno
                    LEFT JOIN designation b2 ON a2.em_designation = b2.desg_slno
                    LEFT JOIN designation b3 ON a3.em_designation = b3.desg_slno
                    LEFT JOIN designation b4 ON a4.em_designation = b4.desg_slno
                   inner join hrm_department on a.em_department=hrm_department.dept_id
                   inner join hrm_dept_section on a.em_dept_section=hrm_dept_section.sect_id
                   inner join designation b on a.em_designation=b.desg_slno
                   INNER JOIN bloodgroup ON a.blood_slno = bloodgroup.group_slno
                   where a.em_department=?
                   and a.em_dept_section=?
                   and a.em_status=1
                   and a.em_no not in (1 ,2) `,
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
     getEmpDataByEmno: (id, callBack) => {
        pool.query(
            `  SELECT 
                   vaccination_master.em_id,
                   vaccination_master.em_no,
                   CONCAT(UPPER(SUBSTRING(a.em_name,1,1)),LOWER(SUBSTRING(a.em_name,2)))  as 'em_name',
                   sect_name,
                   a.em_status,
                   group_name,
                   a.em_mobile,                
                   DATE_FORMAT(hic_first_dose_date, '%d/%m/%Y') AS 'hic_first_dose_date',
                   DATE_FORMAT(hic_second_dose_date, '%d/%m/%Y') AS 'hic_second_dose_date',
                   DATE_FORMAT(hic_thirdt_dose_date, '%d/%m/%Y') AS 'hic_thirdt_dose_date',
                   DATE_FORMAT(hic_boostert_dose_date, '%d/%m/%Y') AS 'hic_boostert_dose_date',
                   hic_frst_dose_status,
                   hic_second_dose_status,
                   hic_third_dose_status,
                   hic_booster_dose_status,
                   a.em_dob,
                   a.em_doj,
                   a.em_age_year,
                   a.em_designation,
                   a.em_gender,
                   CONCAT(UPPER(SUBSTRING(dept_name,1,1)),LOWER(SUBSTRING(dept_name,2)))  as 'dept_name',
                   CONCAT(UPPER(SUBSTRING(b.desg_name,1,1)),LOWER(SUBSTRING(b.desg_name,2)))  as 'desg_name',
                    hic_emid_first_verified,
                    hic_emid_second_verified,
                    hic_emid_third_verified,
                    hic_emid_booster_verified,
                    first_vacc_emid,
                    second_vacc_emid,
                    third_vacc_emid,
                    booster_vacc_emid,
                   DATE_FORMAT(firstdose_date, '%d/%m/%Y') AS 'firstdose_date',
                   DATE_FORMAT(second_dose_given_date, '%d/%m/%Y') AS 'second_dose_given_date',
                   DATE_FORMAT(third_dose_given_date, '%d/%m/%Y') AS 'third_dose_given_date',
                   DATE_FORMAT(booster_dose_given_date, '%d/%m/%Y') AS 'booster_dose_given_date',
                    CONCAT(UPPER(SUBSTRING(a1.em_name,1,1)),LOWER(SUBSTRING(a1.em_name,2)))  as 'em_name_first_verified',
                    CONCAT(UPPER(SUBSTRING(a2.em_name,1,1)),LOWER(SUBSTRING(a2.em_name,2)))  as 'em_name_second_verified',
                    CONCAT(UPPER(SUBSTRING(a3.em_name,1,1)),LOWER(SUBSTRING(a3.em_name,2)))  as 'em_name_third_verified',
                    CONCAT(UPPER(SUBSTRING(a4.em_name,1,1)),LOWER(SUBSTRING(a4.em_name,2)))  as 'em_name_booster_verified',
                    CONCAT(UPPER(SUBSTRING(a5.em_name,1,1)),LOWER(SUBSTRING(a5.em_name,2)))  as 'first_verified',
                    CONCAT(UPPER(SUBSTRING(a6.em_name,1,1)),LOWER(SUBSTRING(a6.em_name,2)))  as 'second_verified',
                    CONCAT(UPPER(SUBSTRING(a7.em_name,1,1)),LOWER(SUBSTRING(a7.em_name,2)))  as 'third_verified',
                    CONCAT(UPPER(SUBSTRING(a8.em_name,1,1)),LOWER(SUBSTRING(a8.em_name,2)))  as 'booster_verified',
                    CONCAT(UPPER(SUBSTRING(b1.desg_name,1,1)),LOWER(SUBSTRING(b1.desg_name,2)))  as 'firstdesg',
                    CONCAT(UPPER(SUBSTRING(b2.desg_name,1,1)),LOWER(SUBSTRING(b2.desg_name,2)))  as 'secdesg',
                    CONCAT(UPPER(SUBSTRING(b3.desg_name,1,1)),LOWER(SUBSTRING(b3.desg_name,2)))  as 'thirddesg',
                    CONCAT(UPPER(SUBSTRING(b4.desg_name,1,1)),LOWER(SUBSTRING(b4.desg_name,2)))  as 'boosterdesg'

                    FROM medi_hrm.vaccination_master
                    INNER JOIN hrm_emp_master a ON vaccination_master.em_id =a.em_id
                    LEFT JOIN hrm_emp_master a1 ON a1.em_id = vaccination_master.hic_emid_first_verified AND vaccination_master.hic_emid_first_verified <> 0
                    LEFT JOIN hrm_emp_master a2 ON a2.em_id = vaccination_master.hic_emid_second_verified AND vaccination_master.hic_emid_second_verified <> 0
                    LEFT JOIN hrm_emp_master a3 ON a3.em_id = vaccination_master.hic_emid_third_verified AND vaccination_master.hic_emid_third_verified <> 0
                    LEFT JOIN hrm_emp_master a4 ON a4.em_id = vaccination_master.hic_emid_booster_verified AND vaccination_master.hic_emid_booster_verified <> 0
                    LEFT JOIN hrm_emp_master a5 ON a5.em_id = vaccination_master.first_vacc_emid AND vaccination_master.first_vacc_emid <> 0
                    LEFT JOIN hrm_emp_master a6 ON a6.em_id = vaccination_master.second_vacc_emid AND vaccination_master.second_vacc_emid <> 0
                    LEFT JOIN hrm_emp_master a7 ON a7.em_id = vaccination_master.third_vacc_emid AND vaccination_master.third_vacc_emid <> 0
                    LEFT JOIN hrm_emp_master a8 ON a8.em_id = vaccination_master.booster_vacc_emid AND vaccination_master.booster_vacc_emid <> 0
                    LEFT JOIN designation b1 ON a1.em_designation = b1.desg_slno
                    LEFT JOIN designation b2 ON a2.em_designation = b2.desg_slno
                    LEFT JOIN designation b3 ON a3.em_designation = b3.desg_slno
                    LEFT JOIN designation b4 ON a4.em_designation = b4.desg_slno
                    INNER JOIN hrm_department ON a.em_department = hrm_department.dept_id
                    INNER JOIN hrm_dept_section ON a.em_dept_section = hrm_dept_section.sect_id
                    INNER JOIN bloodgroup ON a.blood_slno = bloodgroup.group_slno
                    INNER JOIN designation b ON a.em_designation=b.desg_slno
                    WHERE vaccination_master.em_no   = ?`,
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