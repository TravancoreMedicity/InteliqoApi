const { log } = require('winston');
const pool = require('../../config/database');

module.exports = {

    getEmpByDeptAndSection: (data, callBack) => {
        pool.query(
            `SELECT 
            DISTINCT designation.desg_name, 
            hrm_emp_master.em_designation AS em_designation_number,
            designation.desg_grade,
            g.grade_desc AS grade_desg
            FROM hrm_emp_master
            LEFT JOIN hrm_salutation ON hrm_salutation.sa_code = hrm_emp_master.em_salutation
            LEFT JOIN hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
            LEFT JOIN hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            LEFT JOIN designation ON designation.desg_slno = hrm_emp_master.em_designation
            LEFT JOIN hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
            LEFT JOIN grade g ON designation.desg_grade = g.grade_slno
            WHERE hrm_department.dept_id = ?
            AND hrm_dept_section.sect_id = ?
            AND em_status = 1
            AND em_id != 1
            AND em_no != 2
            ORDER BY
            CASE
            WHEN grade_desg IS NULL THEN 1
            ELSE 0
            END, grade_desg
        
            `,
            [
                data.dept_id,
                data.sect_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    insertmanpowerplanning: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_manpowerplanning_master (
                dept,
                deptsection,
                desg_slno,
                mincount,
                maxcount,
                salaryfrom,
                salaryto
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
    getname: (data, callBack) => {
        pool.query(
            `SELECT  
            desg_name,
            grade_desc
            FROM designation
            LEFT JOIN grade ON designation.desg_grade = grade.grade_slno
            WHERE desg_slno = ?
            `,
            [
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
    getdesignation: (data, callBack) => {

        pool.query(
            `SELECT  
            DISTINCT d.desg_name,
            mincount as MinCount, 
            maxcount  as MaxCount,
            salaryfrom as salaryfrom,
            salaryto as salaryto,
            m.desg_slno AS em_designation_number,
            d.desg_grade,
            g.grade_desc AS grade_desg
            FROM hrm_manpowerplanning_master m
            LEFT JOIN hrm_department ON hrm_department.dept_id = m.dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id = m.deptsection
            LEFT JOIN designation d ON d.desg_slno = m.desg_slno
            left join grade g on d.desg_grade=g.grade_slno
            WHERE hrm_department.dept_id = ?
            AND hrm_dept_section.sect_id = ?
            ORDER BY
            CASE
            WHEN grade_desg IS NULL THEN 1
            ELSE 0
            END, grade_desg
        
            `,
            [
                data.dept_id,
                data.sect_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // update data

    updatemanpowerplanning: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` update hrm_manpowerplanning_master 
                    set mincount=?,
                    maxcount=?,
                    salaryfrom=?,
                    salaryto=?
                    where
                    desg_slno=?`,
                    [val.MinCount, val.MaxCount, val.salaryfrom, val.salaryto, val.em_designation_number],
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

    getData: (data, callBack) => {
        pool.query(
            `SELECT  
            maxcount,
            salaryfrom,
            salaryto,
            mincount
             from  hrm_manpowerplanning_master
              where dept=? and desg_slno=?
            `,
            [
                data.dept_id,
                data.desg_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertmanpowerrequest: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_manpower_request (
                dept_id ,
                desg_id,
                permanent_status,
                contract_status,
                apprentice_status,
                trainee_status,
                manpower_required_no,
                required_date,
                new_position_status,
                addition_status,
                replacement_status,
                replacement_emid,
                salaryfrom,
                salaryto,
                qualification,
                experiencefrom,
                experienceto,
                exp_fresher,
                exp_trainee,
                exp_apprentice,
                experience_status,
                other_attribute,
                training
            )values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `,
            [
                data.dept_id,
                data.desg_id,
                data.Permanent_status,
                data.Contract_status,
                data.Apprenticeship_status,
                data.Trainee_status,
                data.requiredNo,
                data.date,
                data.New_Position_status,
                data.Addition_status,
                data.Replacement_status,
                data.selectEmpno,
                data.salaryfrom,
                data.salaryto,
                JSON.stringify(data.value),
                data.expfrom,
                data.expto,
                data.Fresher_status,
                data.TraineeExp_status,
                data.ApprenticeshipExp_status,
                data.Experience_status,
                data.other_essen,
                data.training
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getapproval: (callBack) => {
        pool.query(
            `SELECT  
            hrm_manpower_request.dept_id,
            desg_id,
            permanent_status,
            hrm_manpower_request.contract_status,
            apprentice_status,
            trainee_status,
            manpower_required_no,
            required_date,
            new_position_status,
            addition_status,
            replacement_status,
            replacement_emid,
            salaryfrom,
            salaryto,
            ed_approval_status,
            Hod_approval_status,
            Hr_approval_status,
            dept_name,
            desg_name,
            createdate,
            em_name,
            qualification,
            announcement_status
              from  hrm_manpower_request
              LEFT JOIN hrm_department ON hrm_manpower_request.dept_id = hrm_department.dept_id
              LEFT JOIN designation ON hrm_manpower_request.desg_id = designation.desg_slno
              LEFT JOIN hrm_emp_master ON hrm_manpower_request.replacement_emid = hrm_emp_master.em_no
               `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getapprovalhod: (data, callBack) => {

        pool.query(
            `SELECT  
            hrm_manpower_request.dept_id,
            desg_id,
            permanent_status,
            hrm_manpower_request.contract_status,
           apprentice_status,
           trainee_status,
           manpower_required_no,
           required_date,
           new_position_status,
           addition_status,
           replacement_status,
           replacement_emid,
           salaryfrom,
           salaryto,
           ed_approval_status,
           Hod_approval_status,
           Hr_approval_status,
           dept_name,
           desg_name,
           createdate,
           em_name
              from  hrm_manpower_request
              LEFT JOIN hrm_department ON hrm_manpower_request.dept_id = hrm_department.dept_id
              LEFT JOIN designation ON hrm_manpower_request.desg_id = designation.desg_slno
              LEFT JOIN hrm_emp_master ON hrm_manpower_request.replacement_emid = hrm_emp_master.em_no
              WHERE hrm_manpower_request.dept_id=?
               `,
            [
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateDataManpowerapproval: (data, callBack) => {
        pool.query(
            `UPDATE hrm_manpower_request 
            SET ed_approval_remark=?,
            ed_approval_date=?,
            ed_approval_status=?
            WHERE desg_id = ? and dept_id=?`,
            [
                data.remark,
                data.fromDate,
                data.ed_approval_status,
                data.desg_id,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateHodapproval: (data, callBack) => {
        pool.query(
            `UPDATE hrm_manpower_request 
            SET Hod_approval_remark=?,
            Hod_approval_date=?,
            Hod_approval_status=?
            WHERE desg_id = ? and dept_id=?`,
            [
                data.remark,
                data.fromDate,
                data.Hod_approval_status,
                data.desg_id,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateHrapproval: (data, callBack) => {
        pool.query(
            `UPDATE hrm_manpower_request 
            SET Hr_approval_remark=?,
            Hr_approval_date=?,
            Hr_approval_status=?
            WHERE desg_id = ? and dept_id=?`,
            [
                data.remark,
                data.fromDate,
                data.Hr_approval_status,
                data.desg_id,
                data.dept_id
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
            `SELECT dept_id,
            desg_id
                FROM hrm_manpower_request
                WHERE dept_id = ? and  desg_id=?`,
            [
                data.dept_id,
                data.desg_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getapprove: (data, callBack) => {
        pool.query(
            `SELECT  
            desg_id,
            ed_approval_status,
            Hod_approval_status,
            Hr_approval_status,
            createdate,
            desg_name
            FROM hrm_manpower_request
            LEFT JOIN designation ON hrm_manpower_request.desg_id = designation.desg_slno
            WHERE dept_id = ?
            `,
            [
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    getvacancy: (data, callBack) => {
        pool.query(
            `SELECT  
            desg_id,
            ed_approval_status,
            Hod_approval_status,
            Hr_approval_status,
            createdate,
            desg_name,
            manpower_required_no,
            ed_approval_date,
            required_date,
            dept_name,
            hrm_manpower_request.dept_id
            FROM hrm_manpower_request
            LEFT JOIN designation ON hrm_manpower_request.desg_id = designation.desg_slno
			LEFT JOIN hrm_department ON hrm_manpower_request.dept_id = hrm_department.dept_id
            WHERE hrm_manpower_request.dept_id =? and ed_approval_status=1 and announcement_status=0
            `,
            [
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    updateannouncement: (data, callBack) => {
        pool.query(
            `UPDATE hrm_manpower_request 
            SET
            annouced_date=?,
            announcement_status=?
            WHERE desg_id = ? and dept_id=?`,
            [

                data.fromDate,
                data.Announcement_status,
                data.desg_id,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    closeannouncement: (data, callBack) => {
        pool.query(
            `UPDATE hrm_manpower_request 
            SET
            date_of_closing=?,
            announcement_status=?,
            remark_closing=?
            WHERE desg_id = ? and dept_id=?`,
            [

                data.fromDate,
                data.Announcement_status,
                data.remark,
                data.desg_id,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertedu: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_qual (
                em_id,
                em_no,
                em_education,
                create_user
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
    insertexp: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_exp (
                em_no,
                em_id,
                em_institution,
                em_from,
                em_to,
                create_user
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
    insertpersonaldata: (data, callBack) => {

        pool.query(
            `INSERT INTO hrm_emp_personal (
                em_id,
                em_no,
                em_per_address1,
                em_per_address2,
                em_per_pincode,
                em_pmnt_address1,
                em_pmnt_address2,
                em_pmnt_pincode,
                em_religion,
                em_bloodgroup,
                em_cont_mobile,
                create_user,
                emp_dob,
                emp_email,
                em_region
            )values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `,
            [
                data.em_id,
                data.em_no,
                data.addressPermnt1,
                data.addressPermnt2,
                data.perPincode,
                data.addressPresent1,
                data.addressPresent2,
                data.presPincode,
                data.hrm_religion,
                data.blood_slno,
                data.em_mobile,
                data.create_user,
                data.em_dob,
                data.em_email,
                data.em_region,
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