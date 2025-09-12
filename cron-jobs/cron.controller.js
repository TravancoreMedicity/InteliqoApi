const cron = require("node-cron");
const pool = require("../config/database");
const { startOfMonth, endOfMonth, eachDayOfInterval, format } = require("date-fns");

const InsertDeafualtDoctorDutyplan = async () => {
    console.log("Function called at:", new Date().toISOString());
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(monthStart);
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(" MySQL DB not connected");
                return;
            }

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    console.log("? Error starting transaction");
                    return;
                }

                // Step 1: Fetch active doctors
                const employeeQuery = `
            SELECT 
                em_no,
                em_id,
                CONCAT(hrm_salutation.sal_name, '.', em_name) AS emp_name,
                IF(em_gender = 1, 'Male', 'Female') gender,
                em_dob,
                em_age_year,
                em_doj,
                em_mobile,
                hrm_branch.branch_name,
                hrm_department.dept_name,
                hrm_dept_section.sect_name,
                designation.desg_name,
                gross_salary,
                IF(em_status = 1, 'Yes', 'No') emp_status,
                unauthorized_absent_status,
                holiday_type
            FROM hrm_emp_master
                LEFT JOIN hrm_salutation ON hrm_salutation.sa_code = hrm_emp_master.em_salutation
                LEFT JOIN hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
                LEFT JOIN hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
                LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
                LEFT JOIN designation ON designation.desg_slno = hrm_emp_master.em_designation
                LEFT JOIN hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
            WHERE em_status = 1 AND doctor_status = 1
        `;

                connection.query(employeeQuery, (err, employees) => {
                    if (err) {
                        connection.release();
                        console.log(" Error fetching employees", err);
                        return;
                    }

                    if (!employees.length) {
                        console.log(" No active doctors found");
                        connection.release();
                        return;
                    }

                    // Step 2: Fetch holidays for the current year
                    const holidayQuery = `
                SELECT * 
                FROM hrm_yearly_holiday_list 
                WHERE YEAR(hld_date) = YEAR(CURRENT_DATE())
            `;

                    connection.query(holidayQuery, (err, holidayList) => {
                        if (err) {
                            connection.release();
                            console.log("? Error fetching holiday list", err);
                            return;
                        }


                        if (holidayList && holidayList?.length > 0) {

                            // Step 3: Build the full date range for the selected month
                            const dateRange = eachDayOfInterval({
                                start: new Date(monthStart),
                                end: new Date(monthEnd)
                            })?.map((d) => format(new Date(d), "yyyy-MM-dd"));

                            // Filter holidays only within this month
                            const monthHolidays = holidayList.filter(
                                (h) =>
                                    h?.hld_date >= format(new Date(monthStart), "yyyy-MM-dd") &&
                                    h?.hld_date <= format(new Date(monthEnd), "yyyy-MM-dd")
                            );

                            // Step 4: Generate the duty plan (employees × dates)

                            const dutyPlan = employees
                                ?.map((emp) =>
                                    dateRange?.map((date) => {
                                        const holiday = monthHolidays?.find((h) => h?.hld_date === date);

                                        return {
                                            date,
                                            emp_id: emp?.em_id,
                                            em_no: emp?.em_no,
                                            shift: date >= emp?.em_doj ? 1 : 2,
                                            holidayStatus: holiday
                                                ? emp?.holiday_type === 1 && holiday?.special_type === 2
                                                    ? 0
                                                    : 1
                                                : 0,
                                            holidayName: holiday
                                                ? emp?.holiday_type === 1 && holiday?.special_type === 2
                                                    ? null
                                                    : holiday?.hld_desc
                                                : null,
                                            holidaySlno: holiday
                                                ? emp?.holiday_type === 1 && holiday?.special_type === 2
                                                    ? 0
                                                    : holiday?.hld_slno
                                                : 0,
                                            // plan_user: employeeIdNumber()
                                        };
                                    })
                                )
                                .flat();
                            // Step 5: Output or insert the generated duty plan
                            console.log("? Duty Plan Generated:", dutyPlan);

                            const VALUES = dutyPlan?.map(value => [
                                value.date,
                                value.emp_id,
                                value.em_no,
                                value.shift,
                                value.holidayStatus,
                                value.holidayName,
                                value.holidaySlno,
                                value.plan_user
                            ]);

                            pool.getConnection((err, connection) => {
                                if (err) {
                                    // mysql db not connected check connection
                                    console.log("mysql db not connected check connection");
                                    return;
                                }
                                connection.beginTransaction((err) => {
                                    if (err) {
                                        connection.release();
                                        console.log("error in begin transaction");
                                    }
                                    connection.query(
                                        `INSERT INTO doctor_dutyplan(
                                            duty_day, 
                                            emp_id,
                                            em_no,
                                            shift_id,
                                            holiday,
                                            holiday_name,
                                            holiday_slno,
                                            plan_create_user
                                        ) VALUES ? `,
                                        [
                                            VALUES
                                        ],
                                        (err, result) => {
                                            if (err) {
                                                connection.rollback(() => {
                                                    connection.release();
                                                    console.log("error in rollback data");
                                                });
                                            } else {
                                                connection.commit((err) => {
                                                    if (err) {
                                                        connection.rollback(() => {
                                                            connection.release();
                                                            console.log("error in commit");
                                                        });
                                                    } else {
                                                        connection.release();
                                                    }
                                                });
                                            }
                                        }
                                    );
                                });
                            });
                            // Release connection (or insert dutyPlan before releasing)
                            connection.release();
                        }

                    });
                });
            });
        });
    } catch (error) {
        console.log("Error in commit", error);
        connection.release();
    }
};


cron.schedule("0 0 1 * *", () => {
    // InsertDeafualtDoctorDutyplan();

});




//  pool.getConnection((err, connection) => {
//         if (err) {
//             connection.release();
//             return reject(err);
//         }
//         const query = `
//              SELECT
//                 em_no,
//                 em_id,
//                 CONCAT(hrm_salutation.sal_name, '.', em_name) AS emp_name,
//                 IF(em_gender = 1, 'Male', 'Female') gender,
//                 em_dob,
//                 em_age_year,
//                 em_doj,
//                 em_mobile,
//                 hrm_branch.branch_name,
//                 hrm_department.dept_name,
//                 hrm_dept_section.sect_name,
//                 designation.desg_name,
//                 gross_salary,
//                 IF(em_status = 1, 'Yes', 'No') emp_status,
//                 unauthorized_absent_status,
//                 holiday_type
//             FROM
//                 hrm_emp_master
//                     LEFT JOIN
//                 hrm_salutation ON hrm_salutation.sa_code = hrm_emp_master.em_salutation
//                     LEFT JOIN
//                 hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
//                     LEFT JOIN
//                 hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
//                     LEFT JOIN
//                 hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
//                     LEFT JOIN
//                 designation ON designation.desg_slno = hrm_emp_master.em_designation
//                     LEFT JOIN
//                 hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
//             WHERE  em_status=1 and doctor_status=1
//           `;
//         connection.query(query, (err, results) => {

//             if (err) {
//                 connection.release();
//                 return reject(err);
//             }
//             const employeeData = results
//             if (results?.length > 0) {
//                 const query = `
//              SELECT * FROM hrm_yearly_holiday_list  where  year(hld_date) = year(current_date())
//           `;
//                 connection.query(query, (err, results) => {
//                     if (err) {
//                         connection.release();
//                         return reject(err);
//                     }
//                     const holidayList = results;

//                     const dateRange = eachDayOfInterval({ start: new Date(monthStart), end: new Date(monthEnd) });

//                     const fullDutyplanDateRange = dateRange?.map((val) => { return { date: format(new Date(val), 'yyyy-MM-dd') } });

//                     const fullShiftDutyDay = employeeData?.map((val) => {
//                         return fullDutyplanDateRange?.map((value) => {
//                             return {
//                                 date: value?.date,
//                                 emp_id: val?.em_id,
//                                 doj: val?.em_doj,
//                                 em_no: val?.em_no,
//                                 holiday_type: val?.holiday_type
//                             }
//                         })
//                     }).flat(Infinity)

//                     const fullMonthHolidayList = holidayList?.map((values) => {
//                         return values?.hld_date >= format(new Date(monthStart), 'yyyy-MM-dd') && values?.hld_date <= format(new Date(monthEnd), 'yyyy-MM-dd') ? values : null;
//                     }).filter((val) => val !== null);

//                     //add the holiday details into the shift plan array
//                     const fullholidayFilterFun = (values) => {
//                         const holiday = fullMonthHolidayList.find((val) => val.hld_date === values.date)
//                         if (holiday !== undefined) {
//                             return {
//                                 date: values?.date,
//                                 emp_id: values?.emp_id,
//                                 em_no: values?.em_no,
//                                 shift: values?.date >= values?.doj ? 1 : 2,
//                                 holidayStatus: values?.holiday_type === 1 && holiday?.special_type === 2 ? 0 : 1,
//                                 holidayName: values?.holiday_type === 1 && holiday?.special_type === 2 ? null : holiday?.hld_desc,
//                                 holidaySlno: values?.holiday_type === 1 && holiday?.special_type === 2 ? 0 : holiday?.hld_slno,
//                                 // plan_user: employeeIdNumber()
//                             }
//                         } else {
//                             return {
//                                 date: values?.date,
//                                 emp_id: values?.emp_id,
//                                 em_no: values?.em_no,
//                                 shift: values?.date >= values?.doj ? 1 : 2,
//                                 holidayStatus: 0,
//                                 holidayName: null,
//                                 holidaySlno: 0,
//                                 // plan_user: employeeIdNumber()
//                             }
//                         }
//                     }

//                     // after the holiday inserted duty day array
//                     const insertDutyPlanArray = fullShiftDutyDay.map(fullholidayFilterFun);
//                     console.log(insertDutyPlanArray);

//                 })
//             }
//         });
//     });









// /****************************/

// const getLastTriggerDate = async (processId) => {
//   return new Promise((resolve, reject) => {
//     mysqlpool.getConnection((err, connection) => {
//       if (err) {
//         console.log("MySQL DB not connected. Check connection.");
//         return reject(err);
//       }
//       const query = `
//         SELECT fb_last_trigger_date
//         FROM fb_ipadmiss_logdtl
//         WHERE fb_process_id = ?
//         ORDER BY fb_log_slno DESC
//         LIMIT 1;
//       `;
//       connection.query(query, [processId], (err, results) => {
//         connection.release();
//         if (err) {
//           return reject(err);
//         }
//         resolve(results.length > 0 ? results[0] : null);
//       });
//     });
//   });
// };

// const getAmsLastUpdatedDate = async (processId) => {
//   return new Promise((resolve, reject) => {
//     mysqlpool.getConnection((err, connection) => {
//       if (err) {
//         console.error("MySQL DB not connected. Check connection.");
//         return reject(err);
//       }
//       const query = `
//         SELECT ams_last_updated_date
//         FROM ams_patient_details_last_updated_date ;
//       `;
//       connection.query(query, [processId], (err, results) => {
//         connection.release();
//         if (err) {
//           return reject(err);
//         }
//         resolve(results.length > 0 ? results[0] : null);
//       });
//     });
//   });
// };








