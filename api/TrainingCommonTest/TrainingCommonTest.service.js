const pool = require('../../config/database');

module.exports = {
    GetTrainingTopics: (id, callback) => {
        pool.query(
            ` 
            SELECT ROW_NUMBER() OVER () as sno,topic,training_topic.topic_slno,training_topic.training_topic_name
                        FROM training_employee_details
                        LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                        where emp_dept=?
                        group by training_employee_details.topic 
            `, [id],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetPreLogEmpDetails: (data, callBack) => {
        pool.query(
            ` 
            SELECT em_id, em_no, em_name, em_mobile, 
            em_department, em_dept_section, em_designation,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,
            hrm_dept_section.sect_name, designation.desg_slno,designation.desg_name,
            training_employee_details.emp_name,training_employee_details.topic,
            training_topic.topic_slno,training_topic.training_topic_name,training_employee_details.question_count,
            training_employee_details.pretest_status,training_employee_details.posttest_status,training_employee_details.online_mode,
            training_employee_details.offline_mode,training_employee_details.training_status,training_pretest.mark ,
            training_posttest.mark as postmark,
            training_employee_details.slno as Emslno
            FROM medi_hrm.hrm_emp_master
            LEFT JOIN hrm_department ON hrm_department.dept_id=hrm_emp_master.em_department
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            LEFT JOIN training_employee_details ON training_employee_details.emp_name=hrm_emp_master.em_id
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN training_pretest ON training_pretest.emp_topic=training_employee_details.topic
            LEFT JOIN training_posttest ON training_posttest.emp_topic=training_employee_details.topic
            where hrm_emp_master.em_no=? and hrm_emp_master.em_mobile=? and  training_employee_details.topic=?`,
            [
                data.em_no,
                data.em_mobile,
                data.topic_slno
            ],

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetTrainingPostTopics: (callback) => {
        pool.query(
            ` SELECT ROW_NUMBER() OVER () as sno,topic,training_topic.topic_slno,training_topic.training_topic_name
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            Where training_employee_details.training_status=1 and training_employee_details.pretest_status=1
            group by training_employee_details.topic
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
}