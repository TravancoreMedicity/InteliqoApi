const cron = require("node-cron");
const pool = require("../config/database");
const {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format
} = require("date-fns");

const InsertDeafualtDoctorDutyplan = async () => {
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


                        if (holidayList && holidayList ?.length > 0) {

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

                            const dutyPlan = employees?.map((emp) =>
                                    dateRange?.map((date) => {
                                        const holiday = monthHolidays?.find((h) => h?.hld_date === date);

                                        return {
                                            date,
                                            emp_id: emp?.em_id,
                                            em_no: emp?.em_no,
                                            shift: date >= emp?.em_doj ? 1 : 2,
                                            holidayStatus: holiday ?
                                                emp ?.holiday_type === 1 && holiday?.special_type === 2 ?
                                                0 :
                                                1 :
                                                0,
                                            holidayName: holiday ?
                                                emp?.holiday_type === 1 && holiday?.special_type === 2 ?
                                                null :
                                                holiday ?.hld_desc :
                                                null,
                                            holidaySlno: holiday ?
                                                emp ?.holiday_type === 1 && holiday ?.special_type === 2 ?
                                                0 :
                                                holiday ?.hld_slno :
                                                0,
                                            // plan_user: employeeIdNumber()
                                        };
                                    })
                                )
                                .flat();
                            // Step 5: Output or insert the generated duty plan
                            console.log("? Duty Plan Generated:", dutyPlan);

                            const VALUES = dutyPlan ?.map(value => [
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

const InsertTmcpunch = async () => {
 
   pool.getConnection((err, connection) => {
    if (err) {
      console.log(" MySQL DB not connected");
      return;
    }

    try {
      connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          return;
        }

        const punchQuery = `
          SELECT 
              emp_code, em_name, nmc_regno, punch_time, em_no, branch_name,
              dept_name, sect_name,  desg_name
          FROM
              punch_data
          LEFT JOIN
              hrm_emp_master ON hrm_emp_master.em_no = punch_data.emp_code
          INNER JOIN
              hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
          INNER JOIN
              hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
          INNER JOIN
              hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
          INNER JOIN
              designation ON designation.desg_slno = hrm_emp_master.em_designation
          WHERE
              DATE(punch_time) = CURRENT_DATE()
          AND emp_code IN (SELECT em_no
                           FROM hrm_emp_master
                           WHERE doctor_status = 1 AND em_status = 1)
        `;

        connection.query(punchQuery, (err, punchData) => {
          try {
            if (err) {
              throw err;
            }

            if (!punchData?.length) {
              return;
            }

            const employeeQuery = `
              SELECT 
                  punch_slno,
                  duty_day,
                  shift_id,
                  emp_id,
                  doctor_punch_master.em_no,
                  hrm_emp_master.em_name,
                  punch_in,
                  punch_out,
                  shift_in,
                  shift_out,
                  hrs_worked,
                  late_in,
                  early_out,
                  duty_desc,
                  duty_status,
                  holiday_status,
                  leave_status,
                  lvereq_desc,
                  lve_tble_updation_flag,
                  dept_name,sect_name,
                  hrm_department.dept_id,
                  hrm_dept_section.sect_id,
                  gross_salary,
                  shft_brk_start
              FROM doctor_punch_master 
              LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no=doctor_punch_master.em_no
              LEFT JOIN hrm_department ON hrm_department.dept_id=hrm_emp_master.em_department
              LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
              LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno=doctor_punch_master.shift_id
              WHERE duty_day = curdate()
              AND doctor_punch_master.em_no IN 
                  (SELECT em_no FROM hrm_emp_master WHERE doctor_status = 1 AND em_status = 1)
            `;

            connection.query(employeeQuery, (err, employees) => {
              try {
                if (err) {
                 console.log(" Error fetching employees", err);
                  throw err;
                }

                if (!employees.length) {
                 console.log(" No active doctors found");
                  //connection.release();
                  return;
                }

                const newArr = employees?.map((val) => {
                  const punchArray = punchData
                    ?.filter((k) => parseInt(k?.emp_code) === val?.em_no)
                    ?.map((row) => ({ ...row }));

                  const { shft_brk_start, duty_day, shift_id } = val;
                  const halftime =
                    shft_brk_start !== null
                      ? format(new Date(shft_brk_start), "HH:mm")
                      : format(new Date(), "HH:mm");
                  const shiftTime = `${format(
                    new Date(duty_day),
                    "yyyy-MM-dd"
                  )} ${halftime}`;

                  const punchin =
                    val?.shift_id !== 1
                      ? punchArray?.find((k) => k.punch_time < shiftTime)
                          ?.punch_time
                      : punchArray[0]?.punch_time;

                  const punchout =
                    val?.shift_id !== 1
                      ? punchArray?.find((k) => k.punch_time > shiftTime)
                          ?.punch_time
                      : punchArray[punchArray?.length - 1]?.punch_time;

                  return {
                    ...val,
                    puchin: punchin,
                    punchout: punchout,
                    desc:punchin!==undefined&&punchout!==undefined?'P':'A'
                  };
                });

                const updateQueries = newArr?.map((row) => {
                  return new Promise((resolve, reject) => {
                    connection.query(
                      `
                      UPDATE doctor_punch_master
                      SET punch_in = ?,
                          punch_out = ?,  
                          duty_desc = ? 
                      WHERE punch_slno = ? 
                      `,
                      [
                        row.puchin,
                        row.punchout,
                        row.desc,
                        row.punch_slno
                      ],
                      (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                      }
                    );
                  });
                });

                Promise.all(updateQueries)
                  .then((result) => {
                    connection.commit((err) => {
                      if (err) {
                        connection.rollback(() => {
                          console.log("Error in commit");
                           connection.release();
                        });
                      } else {
                       console.log("Update successfully");
                      }
                    });
                  })
                  .catch((err) => {
                    console.log(err, "Update query error");
                    connection.rollback(() => {
                      console.log("Rolled back due to error");
                    });
                  });
              } catch (innerErr) {
                console.error("Employee query error:", innerErr);
              } finally {
                connection.release();
              }
            });
          } catch (innerErr) {
            console.error("Punch query error:", innerErr);
            connection.release();
          }
        });
      });
    } catch (outerErr) {
      console.error("Transaction error:", outerErr);
      if (connection) connection.release();
    }
  });
};

cron.schedule("0 0 1 * *", () => {
  InsertDeafualtDoctorDutyplan();

});

cron.schedule("*/2 * * * * ", () => {
  const currentTime = new Date().toLocaleTimeString();
  console.log("Running InsertTmcpunch at:", currentTime);

  InsertTmcpunch();
});