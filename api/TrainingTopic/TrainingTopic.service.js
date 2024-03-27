const pool = require('../../config/database');

module.exports = {


    TrainingTopicInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.training_topic 
            (
                training_dept,
                dept_status,
                training_topic_name, 
                training_name,
                trainers,
                hours,
                training_status, 
                tutorial_status,
                medical_status,
                non_medical_status,
                pretest_status,
                post_test_status,
                online_status,
                offline_status,
                both_status,
                video_link,
                video_time,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.training_dept,
                data.dept_status,
                data.training_topic_name,
                data.training_name,
                JSON.stringify(data.trainers),
                data.hours,
                data.training_status,
                data.tutorial_status,
                data.medical_status,
                data.non_medical_status,
                data.pretest_status,
                data.post_test_status,
                data.online_status,
                data.offline_status,
                data.both_status,
                data.video_link,
                data.video_time,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    TrainingTopicGet: (callback) => {
        pool.query(
            `SELECT topic_slno,training_dept,training_topic.dept_status,training_topic_name,training_topic.training_name,training_status, tutorial_status, medical_status, non_medical_status,
            pretest_status, post_test_status,online_status, offline_status, both_status,video_link,video_time,
            name_slno,training_name.training_name,hours,hrm_department.dept_id,dept_name,name_slno,upload_status,
            GROUP_CONCAT(em_name)  as trainers_name,trainers
            FROM medi_hrm.training_topic
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_topic.training_dept
            LEFT JOIN training_name ON training_topic.training_name=training_name.name_slno
            LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_topic.trainers,cast(hrm_emp_master.em_id as json),'$')  
            group by topic_slno`, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    TrainingTopicUpdate: (data, callback) => {
        pool.query(`UPDATE medi_hrm.training_topic
         SET
         training_dept=?,
         dept_status=?,
         training_topic_name=?,
         training_name=?,
         trainers=?,
         hours=?,
         training_status=?,
         tutorial_status=?,
         medical_status=?,
         non_medical_status=?,
         pretest_status=?,
         post_test_status=?,
         online_status=?,
         offline_status=?,
         both_status=?,
         video_link=?,
         video_time=?,
         edit_user=?
         WHERE topic_slno=?`,
            [
                data.training_dept,
                data.dept_status,
                data.training_topic_name,
                data.training_name,
                JSON.stringify(data.trainers),
                data.hours,
                data.training_status,
                data.tutorial_status,
                data.medical_status,
                data.non_medical_status,
                data.pretest_status,
                data.post_test_status,
                data.online_status,
                data.offline_status,
                data.both_status,
                data.video_link,
                data.video_time,
                data.edit_user,
                data.topic_slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },

    //insert
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT training_topic_name
                FROM medi_hrm.training_topic
                WHERE training_topic_name = ?`,
            [
                data.training_topic_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    //update
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT training_topic_name,
            topic_slno
            FROM medi_hrm.training_topic
            WHERE training_topic_name =? AND topic_slno != ?`,
            [
                data.training_topic_name,
                data.topic_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    //Induction training type wise topic select
    TrainingTypeWiseTopic: (id, callback) => {
        pool.query(
            `SELECT topic_slno,training_topic_name,training_topic.training_name,
            name_slno,training_name.training_name,name_slno,training_name.type_slno,
            training_topic.trainers,
            GROUP_CONCAT(em_name)  as trainers_name
            FROM medi_hrm.training_topic
            LEFT JOIN training_name ON training_topic.training_name=training_name.name_slno
            LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_topic.trainers,cast(hrm_emp_master.em_id as json),'$')  
            where type_slno=?
            group by topic_slno`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    TrainingTopicByTypeGet: (id, callback) => {
        pool.query(
            `SELECT topic_slno,training_dept,training_topic.dept_status,training_topic_name,training_topic.training_name,training_status,
            tutorial_status, medical_status, non_medical_status,pretest_status, post_test_status,online_status, offline_status,
            both_status,video_link,video_time,name_slno,training_name.training_name,hours,upload_status,trainers,type_slno
            FROM medi_hrm.training_topic
            LEFT JOIN training_name ON training_topic.training_name=training_name.name_slno
            where type_slno=?`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
}