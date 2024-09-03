const pool = require('../../config/database');

module.exports = {
    GetTrainingTopics: (id, callback) => {
        pool.query(
            ` 
            
            SELECT ROW_NUMBER() OVER() as sno,training_employee_details.scheduled_slno as slno, topic, training_topic.topic_slno, training_topic.training_topic_name, schedule_date,
            training_topic.pretest_status,training_topic.post_test_status
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno = training_employee_details.topic
            where emp_dept=? and date(training_employee_details.schedule_date)=current_date()
            and training_topic.pretest_status=1 and training_topic.post_test_status=1
            group by  topic, training_topic.topic_slno, training_topic.training_topic_name, schedule_date,
            pretest_status,post_test_status
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
            SELECT em_id, em_no, em_name, em_mobile
            FROM hrm_emp_master
            where hrm_emp_master.em_no=? and hrm_emp_master.em_mobile=?`,
            [
                data.em_no,
                data.em_mobile
            ],

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    //group by added to solve multiple entries 18-03-24
    // GetPreLogEmpDetails: (data, callBack) => {
    //     pool.query(
    //         ` 
    //         SELECT em_id, em_no, em_name, em_mobile, 
    //         em_department, em_dept_section, em_designation,
    //         hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,
    //         hrm_dept_section.sect_name, designation.desg_slno,designation.desg_name,
    //         training_employee_details.emp_name,training_employee_details.topic,
    //         training_topic.topic_slno,training_topic.training_topic_name,training_employee_details.question_count,
    //         training_employee_details.pretest_status,training_employee_details.posttest_status,training_employee_details.online_mode,
    //         training_employee_details.offline_mode,training_employee_details.training_status,training_pretest.mark ,
    //         training_posttest.mark as postmark,
    //         training_employee_details.slno as Emslno
    //         FROM hrm_emp_master
    //         LEFT JOIN hrm_department ON hrm_department.dept_id=hrm_emp_master.em_department
    //         LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
    //         LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
    //         LEFT JOIN training_employee_details ON training_employee_details.emp_name=hrm_emp_master.em_id
    //         LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
    //         LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
    //         LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
    //         where hrm_emp_master.em_no=? and hrm_emp_master.em_mobile=? and training_employee_details.topic=?
    //         group by em_id,em_id, em_no, em_name, em_mobile, 
    //         em_department, em_dept_section, em_designation,
    //         hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,
    //         hrm_dept_section.sect_name, designation.desg_slno,designation.desg_name,
    //         training_employee_details.emp_name,training_employee_details.topic,
    //         training_topic.topic_slno,training_topic.training_topic_name,training_employee_details.question_count,
    //         training_employee_details.pretest_status,training_employee_details.posttest_status,training_employee_details.online_mode,
    //         training_employee_details.offline_mode,training_employee_details.training_status,training_pretest.mark ,
    //         training_posttest.mark , training_employee_details.slno`,
    //         [
    //             data.em_no,
    //             data.em_mobile,
    //             data.topic_slno
    //         ],

    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     )
    // },

    GetPreLogEmpDatas: (data, callBack) => {
        pool.query(
            ` 
            SELECT em_id, training_employee_details.scheduled_slno,em_no, em_name, em_mobile, 
            em_department, em_dept_section, em_designation,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,
            hrm_dept_section.sect_name, designation.desg_slno,designation.desg_name,
            training_employee_details.emp_name,training_employee_details.topic,
            training_topic.topic_slno,training_topic.training_topic_name,training_employee_details.question_count,
            training_employee_details.pretest_status,training_employee_details.posttest_status,training_employee_details.online_mode,
            training_employee_details.offline_mode,training_employee_details.training_status,training_pretest.mark ,
            training_posttest.mark as postmark,
            training_employee_details.slno as Emslno
            FROM hrm_emp_master
            LEFT JOIN hrm_department ON hrm_department.dept_id=hrm_emp_master.em_department
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            LEFT JOIN training_employee_details ON training_employee_details.emp_name=hrm_emp_master.em_id
            LEFT JOIN training_topic ON training_topic.topic_slno = training_employee_details.topic
            LEFT JOIN training_pretest ON training_pretest.pre_dept_schedule_slno = training_employee_details.scheduled_slno and training_pretest.emp_id = ?
            LEFT JOIN training_posttest ON training_posttest.dept_schedule_slno =training_employee_details.scheduled_slno and training_posttest.emp_id = ?
            where hrm_emp_master.em_no=? and hrm_emp_master.em_mobile=? and training_employee_details.topic=? and training_employee_details.scheduled_slno =?
            GROUP BY 
            training_employee_details.scheduled_slno`,
            [
                data.preId,
                data.postId,
                data.em_no,
                data.em_mobile,
                data.topic_slno,
                data.slno
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
    GetDashboardTrainingTopics: (callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER() as sno,training_employee_details.scheduled_slno as slno, topic, training_topic.topic_slno, training_topic.training_topic_name, schedule_date,
            training_topic.pretest_status,training_topic.post_test_status
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno = training_employee_details.topic
            where date(training_employee_details.schedule_date)=current_date()
            and training_topic.pretest_status=1 and training_topic.post_test_status=1
            group by topic, training_topic.topic_slno, training_topic.training_topic_name, schedule_date, pretest_status,post_test_status
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



