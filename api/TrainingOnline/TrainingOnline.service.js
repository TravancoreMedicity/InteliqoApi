const pool = require('../../config/database');

module.exports = {
    //QR CODE
    GetEmpOnlineTraining: (id, callback) => {
        pool.query(
            `             
            SELECT ROW_NUMBER() OVER () as sno,training_employee_details.slno,emp_name,topic,training_employee_details.training_status,training_employee_details.pretest_status,posttest_status,
            topic_slno,training_topic_name,online_status,both_status,video_link,posttest_permission,upload_status,video_time,pdf_time,training_pretest.create_date as exact_date,question_count,
            em_id,em_name
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            WHERE emp_name=?
            and training_employee_details.pretest_status=1   `, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    //QR Code For PreTest Emp Details 
    GetPretestQRdetails: (id, callback) => {
        pool.query(
            ` SELECT ROW_NUMBER() OVER () as sno, slno, scheduled_slno, emp_name, emp_desig, emp_dept, emp_dept_sectn, topic, schedule_date, training_employee_details.training_status,
            question_count, training_employee_details.pretest_status, training_employee_details.posttest_status, posttest_permission,
            hrm_department.dept_id,desg_slno,hrm_emp_master.em_id,hrm_dept_section.sect_id,training_topic.topic_slno,
             training_topic_name,em_name
            FROM medi_hrm.training_employee_details
                        LEFT JOIN hrm_department on hrm_department.dept_id=training_employee_details.emp_dept
                        LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                        LEFT JOIN hrm_dept_section on hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                        LEFT JOIN training_topic on training_topic.topic_slno=training_employee_details.topic
                        LEFT JOIN designation on designation.desg_slno=training_employee_details.emp_desig
            WHERE slno=? and training_employee_details.training_status=1`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    GetPosttestQRdetails: (id, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as sno,slno, scheduled_slno, emp_name, emp_desig, emp_dept, emp_dept_sectn, topic, schedule_date, training_employee_details.training_status,
            question_count, training_employee_details.pretest_status, training_employee_details.posttest_status, posttest_permission,
            hrm_department.dept_id,desg_slno,hrm_emp_master.em_id,hrm_dept_section.sect_id,training_topic.topic_slno,
             training_topic_name,em_name
            FROM medi_hrm.training_employee_details
                        LEFT JOIN hrm_department on hrm_department.dept_id=training_employee_details.emp_dept
                        LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                        LEFT JOIN hrm_dept_section on hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                        LEFT JOIN training_topic on training_topic.topic_slno=training_employee_details.topic
                        LEFT JOIN designation on designation.desg_slno=training_employee_details.emp_desig
            WHERE slno=? and training_employee_details.training_status=1 `, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

}