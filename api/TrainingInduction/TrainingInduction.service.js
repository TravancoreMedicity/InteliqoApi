const pool = require('../../config/database');

module.exports = {
    GetDatewiseEmps: (data, callback) => {
        pool.query(
            `
            SELECT em_id,em_no,em_name,em_department,em_dept_section,em_designation,
            hrm_department.dept_id,hrm_department.dept_name,
            hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,
            training_master.joining_date,training_master.assign_status
            FROM hrm_emp_master
            LEFT JOIN hrm_department ON hrm_department.dept_id=hrm_emp_master.em_department
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            LEFT JOIN training_master ON training_master.emp_no=hrm_emp_master.em_no 
            WHERE hrm_emp_master.em_id!=1 and
            training_master.joining_date between ? AND ?`,
            [
                data.fromdate,
                data.todate
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    ScheduleInductionTrainings: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.training_induction_schedule (
                schedule_type, schedule_topic, trainers, induction_date,create_user )
            VALUES (?,?,?,?,?)`,
            [
                data.type,
                data.topic,
                JSON.stringify(data.trainers),
                data.scheduledDate,
                data.create_user,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    InsertInductionEmps: (data, callBack) => {
        pool.query(
            `INSERT INTO training_induction_emp_details (
                schedule_no, indct_emp_no, induct_emp_dept, induct_emp_sec, induct_type, induct_topic, induct_date, create_user)
            values ?`,
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
}