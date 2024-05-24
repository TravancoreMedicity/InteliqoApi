const pool = require('../../config/database');

module.exports = {

    GetTndInductMonthlyTrainings: (data, callBack) => {
        pool.query(
            `    SELECT schedule_slno, schedule_type, schedule_topic, training_induction_schedule.trainers, induction_date,cate_slno,
            training_topic.training_topic_name
            FROM training_induction_schedule
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            LEFT JOIN training_name ON training_name.name_slno=training_topic.training_name
            WHERE MONTH(induction_date) = MONTH(?)`,
            [
                data.month
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetTndDeptMonthlyTrainings: (data, callBack) => {
        pool.query(
            `SELECT training_departmental_schedule.slno, training_departmental_schedule.schedule_topics,training_departmental_schedule.schedule_date, 
            training_topic.training_topic_name
            FROM training_departmental_schedule
            LEFT JOIN training_employee_details ON training_employee_details.slno= training_departmental_schedule.slno
            LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
            WHERE MONTH(training_departmental_schedule.schedule_date) = MONTH(?)`,
            [
                data.month
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetHODDeptMonthlyTrainings: (data, callBack) => {
        pool.query(
            `SELECT training_departmental_schedule.slno, training_departmental_schedule.schedule_topics,training_departmental_schedule.schedule_date, 
            training_topic.training_topic_name,
            training_departmental_schedule.department,training_departmental_schedule.deparment_sect
            FROM training_departmental_schedule
            LEFT JOIN training_employee_details ON training_employee_details.slno= training_departmental_schedule.slno
            LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
            WHERE MONTH(training_departmental_schedule.schedule_date) = MONTH(?) and
            training_departmental_schedule.department=? and training_departmental_schedule.deparment_sect=?`,
            [
                data.month,
                data.em_department,
                data.em_dept_section
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetTndInductMonthlyAll: (data, callBack) => {
        pool.query(
            `SELECT schedule_slno, schedule_type, schedule_topic, training_induction_schedule.trainers, induction_date,
            training_topic.training_topic_name,training_topic.training_name,training_name.type_slno,training_name.cate_slno,
            training_name.training_name,training_category.trin_cat_name,training_type.type_name
            FROM training_induction_schedule
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
			LEFT JOIN training_name ON training_name.name_slno=training_topic.training_name
			LEFT JOIN training_category ON training_category.cat_slno=training_name.cate_slno
			LEFT JOIN training_type ON training_type.trainingtype_slno=training_name.type_slno
            WHERE MONTH(induction_date) = MONTH(?) `,
            [
                data.month
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetTndDeptMonthlyAll: (data, callBack) => {
        pool.query(
            `SELECT training_departmental_schedule.slno, training_departmental_schedule.schedule_topics,training_departmental_schedule.schedule_date, 
            training_topic.training_topic_name,training_topic.training_name,training_name.type_slno,training_name.cate_slno,
            training_name.training_name,training_category.trin_cat_name,training_type.type_name
            FROM training_departmental_schedule
            LEFT JOIN training_employee_details ON training_employee_details.slno= training_departmental_schedule.slno
            LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
            LEFT JOIN training_name ON training_name.name_slno=training_topic.training_name
			LEFT JOIN training_category ON training_category.cat_slno=training_name.cate_slno
			LEFT JOIN training_type ON training_type.trainingtype_slno=training_name.type_slno
            WHERE MONTH(training_departmental_schedule.schedule_date) = MONTH(?)`,
            [
                data.month
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    GetHODDeptMonthlyAll: (data, callBack) => {
        pool.query(
            `SELECT training_departmental_schedule.slno, training_departmental_schedule.schedule_topics,training_departmental_schedule.schedule_date, 
            training_topic.training_topic_name,
            training_departmental_schedule.department,training_departmental_schedule.deparment_sect
            FROM training_departmental_schedule
            LEFT JOIN training_employee_details ON training_employee_details.slno= training_departmental_schedule.slno
            LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
            WHERE MONTH(training_departmental_schedule.schedule_date) = MONTH(?) and
            training_departmental_schedule.department=? and training_departmental_schedule.deparment_sect=?`,
            [
                data.month,
                data.em_department,
                data.em_dept_section
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetPieChartData: (data, callBack) => {
        const fromDate = data.fromDate
        const toDate = data.toDate
        pool.query(
            `SELECT * 
            FROM training_induction_emp_details
            WHERE induct_detail_date between ('${fromDate}') and ('${toDate}')`,
            {},

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetEmplinechartData: (data, callBack) => {
        const fromDate = data.fromDate
        const toDate = data.toDate
        const em_id = data.em_id;
        pool.query(
            `SELECT * 
            FROM training_induction_emp_details
            WHERE induct_detail_date between ('${fromDate}') and ('${toDate}') and indct_emp_no=('${em_id}')`,
            {},

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetNotAttendData: (data, callBack) => {
        const fromDate = data.fromDate
        const toDate = data.toDate
        pool.query(
            `SELECT * 
            FROM training_master 
            WHERE joining_date between ('${fromDate}') and ('${toDate}')`,
            {},

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    // GetBarChartData: (data, callBack) => {
    //     const year = data.selectedYear;
    //     pool.query(

    //         `SELECT * 
    //         FROM training_employee_details 
    //         WHERE YEAR(schedule_date) = ('${year}')`,
    //         {},
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     )
    // },
    GetBarChartData: (data, callBack) => {
        const fromDate = data.fromDate
        const toDate = data.toDate
        pool.query(
            ` SELECT ROW_NUMBER() OVER() as slno, 
            emp_name, schedule_date, training_status, pretest_status, posttest_status,retest,training_posttest.mark 
            from training_employee_details
            left join training_posttest on training_posttest.emp_id=training_employee_details.emp_name
            where schedule_date between('${fromDate}') and ('${toDate}')  `,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetEmpBarChartData: (data, callBack) => {
        const fromDate = data.fromDate
        const toDate = data.toDate
        const emId = data.em_id
        pool.query(
            `
           SELECT ROW_NUMBER() OVER() as slno, training_employee_details.emp_name,
           emp_name, schedule_date, training_status, pretest_status, posttest_status,retest,training_posttest.mark 
           from training_employee_details
           left join training_posttest on training_posttest.emp_id=training_employee_details.emp_name
          where schedule_date between('${fromDate}') and ('${toDate}') and training_employee_details.emp_name= ('${emId}')  
           
           
           `,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    GetInductCompleteList: (data, callBack) => {
        const year = data.year;
        pool.query(
            ` select *
            from training_induction_emp_details
            where training_induction_emp_details.pretest_status=1 and  training_induction_emp_details.posttest_status=1 and training_induction_emp_details.training_status=1
            and year(induct_detail_date)= ('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetInductPendingList: (data, callBack) => {
        const year = data.year;
        pool.query(
            ` select *
            from training_induction_emp_details
            where training_induction_emp_details.pretest_status=0 and  training_induction_emp_details.posttest_status=0 and training_induction_emp_details.training_status=0
            and year(induct_detail_date)= ('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetInductNextMnthList: (data, callBack) => {
        const year = data.year;
        pool.query(
            ` select *
            from training_induction_emp_details
            where training_induction_emp_details.pretest_status=0 and  training_induction_emp_details.posttest_status=0 and training_induction_emp_details.training_status=0
            and  induct_detail_date > current_date()
            and year(induct_detail_date)=('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    DeptCompleteList: (data, callBack) => {
        const year = data.year;
        pool.query(
            ` Select * from training_employee_details
            where training_employee_details.pretest_status=1 and  training_employee_details.posttest_status=1 and training_employee_details.training_status=1
            and year(schedule_date)= ('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetDeptPendingList: (data, callBack) => {
        const year = data.year;
        pool.query(
            ` Select * from training_employee_details
            where training_employee_details.pretest_status=0 and  training_employee_details.posttest_status=0 and training_employee_details.training_status=0
            and year(schedule_date)= ('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    DeptNextMnthList: (data, callBack) => {
        const year = data.year;
        pool.query(
            ` Select * from training_employee_details
            where training_employee_details.pretest_status=0 and  training_employee_details.posttest_status=0 and training_employee_details.training_status=0
            and  schedule_date > current_date()
            and year(schedule_date)=('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetInductRetestList: (data, callBack) => {
        const year = data.year;
        pool.query(
            `   Select * from training_induction_emp_details
            where training_induction_emp_details.pretest_status=1 and  training_induction_emp_details.posttest_status=1 and training_induction_emp_details.training_status=1 
            and training_induction_emp_details.retest=1
            and year(induct_detail_date)= ('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    DeptRetestList: (data, callBack) => {
        const year = data.year;
        pool.query(
            ` Select * from training_employee_details
            where training_employee_details.pretest_status=1 and  training_employee_details.posttest_status=1 and training_employee_details.training_status=1 and training_employee_details.retest=1
            and year(schedule_date)= ('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetInductTotalSchedule: (data, callBack) => {
        const year = data.year;
        pool.query(
            `Select * from training_induction_emp_details
            where year(induct_detail_date)= ('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    DeptTotalSchedule: (data, callBack) => {
        const year = data.year;
        pool.query(
            ` Select * from training_employee_details
            where year(schedule_date)= ('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetInductApprovalCount: (data, callBack) => {
        const year = data.year;
        pool.query(
            ` Select * from training_induction_emp_details
            where year(induct_detail_date)= ('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetDeptApprvlCount: (data, callBack) => {
        const year = data.year;
        pool.query(
            ` Select * from training_employee_details
           where year(schedule_date)= ('${year}')`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetHodInchargeDeptTrainings: (data, callBack) => {
        const fromDate = data.fromDate
        const toDate = data.toDate
        const dept = data.em_department
        pool.query(
            `
            SELECT ROW_NUMBER() OVER() as slno, training_employee_details.emp_dept,
            emp_name, schedule_date, training_status, pretest_status, posttest_status,retest,training_posttest.mark 
            from training_employee_details
            left join training_posttest on training_posttest.emp_id=training_employee_details.emp_name
            where schedule_date between('${fromDate}') and('${toDate}') and training_employee_details.emp_dept=('${dept}') 
            `,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetHodInchargeDeptOverview: (data, callBack) => {
        const year = data.year;
        const dept = data.em_department
        pool.query(
            ` Select * from training_employee_details
            where year(schedule_date)= ('${year}') and emp_dept=('${dept}') `,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    GetHODInchargeInductAprvlcount: (data, callBack) => {
        const em_id = data.em_id
        pool.query(
            `SELECT ROW_NUMBER() OVER() as Tr_Apprvl_slno, topic_slno, training_topic_name, training_name, training_topic.trainers, training_induction_emp_details.schedule_no as scheduled_slno, training_induction_emp_details.induction_slno,
            training_induction_emp_details.pretest_status, training_induction_emp_details.posttest_status, training_induction_emp_details.indct_emp_no,
            hrm_emp_master.em_id as employeeId, hrm_emp_master.em_no as emno, hrm_emp_master.em_name, training_induction_schedule.induction_date,
            training_induction_emp_details.trainer_induct_apprvl_status, training_induction_emp_details.trainer_induct_apprvl_user, training_induction_emp_details.trainer_induct_apprvl_date,
            training_induction_schedule.trainers,training_induction_emp_details.training_induct_hod_aprvl_status
        FROM training_topic
        LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_topic = training_topic.topic_slno
        LEFT JOIN training_induction_emp_details ON training_induction_emp_details.schedule_no = training_induction_schedule.schedule_slno
        LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id = training_induction_emp_details.indct_emp_no
        WHERE JSON_CONTAINS(training_induction_schedule.trainers,('${em_id}'), '$') AND  training_induction_emp_details.pretest_status = 1 AND training_induction_emp_details.posttest_status = 1   `,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetHODInchargeDeptAprvlcount: (data, callBack) => {
        const em_id = data.em_id
        pool.query(
            ` SELECT ROW_NUMBER() OVER () as Tr_Apprvl_slno, topic_slno, training_topic_name, training_name, trainers,scheduled_slno,
            training_employee_details.slno as detail_slno,
                       training_employee_details.pretest_status,training_employee_details.posttest_status,training_employee_details.emp_name,
                       hrm_emp_master.em_id as employeeId, hrm_emp_master.em_no, hrm_emp_master.em_name,training_employee_details.schedule_date,
                       training_employee_details.training_apprvl_status,training_departmental_schedule.schedule_trainers,
                       training_employee_details.training_apprvl_user,training_employee_details.training_apprvl_date,training_employee_details.training_hod_apprvls_status
                       FROM training_topic
                       LEFT JOIN training_departmental_schedule ON training_departmental_schedule.schedule_topics=training_topic.topic_slno
                       LEFT JOIN training_employee_details ON training_employee_details.scheduled_slno=training_departmental_schedule.slno
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                       WHERE JSON_CONTAINS(training_departmental_schedule.schedule_trainers,('${em_id}'),'$') AND  training_employee_details.pretest_status=1 AND training_employee_details.posttest_status=1`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetEmpDeptTrainings: (data, callBack) => {
        pool.query(
            `SELECT training_employee_details.scheduled_slno,training_employee_details.emp_name,
            training_employee_details.emp_dept,training_employee_details.emp_dept_sectn,
            training_employee_details.training_status,training_employee_details.topic,
            training_type.type_name,training_topic.training_topic_name, training_name.training_name,
            training_category.trin_cat_name,training_employee_details.schedule_date,
            training_name.name_slno, training_type.trainingtype_slno,training_category.cat_slno
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN training_name ON training_name.name_slno=training_topic.training_name
            LEFT JOIN training_type ON training_type.trainingtype_slno=training_name.type_slno
            LEFT JOIN training_category ON training_category.cat_slno=training_name.cate_slno
            WHERE MONTH(training_employee_details.schedule_date) = MONTH(?) and training_employee_details.emp_name=?`,
            [
                data.month,
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
    GetEmpInductTraining: (data, callBack) => {
        pool.query(
            `SELECT schedule_slno, schedule_type, schedule_topic, training_induction_schedule.trainers, induction_date,cate_slno,
            training_topic.training_topic_name,training_induction_emp_details.indct_emp_no
            FROM training_induction_schedule
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            LEFT JOIN training_name ON training_name.name_slno=training_topic.training_name
            LEFT JOIN training_induction_emp_details ON training_induction_emp_details.schedule_no=training_induction_schedule.schedule_slno
            WHERE MONTH(induction_date) = MONTH(?) and training_induction_emp_details.indct_emp_no=?`,
            [
                data.month,
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
}







