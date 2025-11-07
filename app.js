// @ts-nocheck
require("dotenv").config();
require("./upload/punchTableEventCheck")

const express = require("express");
const fs = require('fs');
const app = express();

const cors = require("cors");
app.use(cors())

const { infoLogger } = require('./logger/logger')


const userRouter = require("./api/users/user.router");
const employeeRouter = require("./api/employee/employee.router");
const branchRouter = require("./api/branch/branch.router");
const departmentRouter = require("./api/department/department.router");
const deptSectionRouter = require("./api/dept_section/section.router");
const userGroupRouter = require("./api/usergroup/usrgroup.router"); // User group Master
const groupAssignRouter = require("./api/usergroupassign/groupassign.router");
const groupRights = require("./api/grouprights/groupright.router"); // Group Rights
const getCommonQery = require("./api/commonCode/common.router");
const institutionType = require("./api/institutionType/instType.router");
const emptype = require("./api/employeetype/emptype.router");
const empstatus = require("./api/employeestatus/empstatus.router");
const designation = require("./api/designation/designation.router");
const bank = require("./api/bankmaster/bank.router");
const qualificattion = require("./api/qualification/qualification.router");
const specialied = require("./api/specialied/specialise.router");
const region = require("./api/region/region.router");
const university = require("./api/university/university.router");
const bloodgroup = require("./api/bloodgroup/bloodgroup.router");
const grade = require("./api/grade/grade.router");
const district = require("./api/district/district.router");
const earnings = require("./api/earnings/earn.router");
const empcategory = require("./api/employcategory/empcat.router");
const registraiontype = require("./api/registrationtype/regtype.router");
const professionaltax = require("./api/professionaltax/proftax.router")
const shiftmaster = require("./api/shiftmaster/shift.router")
const yearlyholidaylist = require("./api/yearlyholiday/yearlyhold.router");
const yearlyleaves = require("./api/yearlyleaves/yearlyleave.router");
const doctype = require("./api/doctortype/doctype.router"); // doctor type in the empliyee master
const hrmempmast = require("./api/hrm_emp_master/empmast.router"); // hrm employee master
const hrmcotract = require("./api/hrm_emp_contract_detl/empcontract.router"); // For Employee contract 
const hrmearndeduction = require("./api/employeEarnDeduction/earnDeduction.router") // Employee earn and deduction 
const hrmexperience = require("./api/hrm_emp_exp/empexp.router") // Employee experience details 
const hrmempPersonal = require("./api/hrm_emp_personal/emppersonal.router");  // Employee personal Details 
const hrmempesipf = require("./api/hrm_emp_pfesi/empesipf.router")   // Employee ESI and PF Details
const hrmqualification = require("./api/hrm_emp_qual/qualification.router")  // Employee Qualification Details 
const course = require("./api/course/course.router") // Course master 
const education = require("./api/education/education.router")  // Education Master
const specialization = require("./api/specialization/special.router") //Epecialization Master
const modulegroupmaster = require("./api/module_group_mast/moduleGroup.router")  //Module Group Master
const moduleUserRights = require("./api/moduleUserRights/moduleUserRights.router") //Module User Rights
const ReligionRouter = require("./api/hrm_religion/religion.router") //Religion Master
const EarntypeRouter = require("./api/EarnType/earnType.router") //EarnType Master
const leaveTypeRouter = require("./api/leavetype/leavetype.router")//leave Type Master
const state = require("./api/state/state.router")//State Master
const finededuction = require("./api/fine_deduction/fineded.router") //fine deduction
const empfinededuction = require("./api/hrm_emp_fine/fine.router") //emp fine deductionrs
const upload = require("./api/uploadFile/upload.router")
const salaryincrementRouter = require("./api/Salary_Increment/Salary_Increment.router")//salary Increment Proces
const yearleaveprocess = require("./api/yearleaveprocess/yearlleaveprocess.router")//Yearly Leave  Proces
const dutyplanning = require("./api/dutyplan/dutyplan.router") // Duty planning 
const leaveRequestType = require("./api/leaveRequestType/leaveRequestType.router")//Leave Request Type master
const departmentshiftRouter = require("./api/Departmentshiftmaster/Departmentshiftmaster.router")//department shift master
const overtimerequest = require("./api/overtimeRequest/otRequest.router")//overtime request
const boardEdu = require("./api/boardmaster/board.router")
const authorization = require("./api/authorization/authorization.router")
const ResignationRouter = require("./api/ResignationRequest/ResignationRequest.router")
const LeaveRequest = require("./api/LeaveRequest/LeaveRequest.router")
const DuedepartmentRouter = require("./api/DueaClearenceDepartment/DueaClearenceDepartment.router")
const OtWage = require("./api/otwage/otwage.router")
const DueclearenceRouter = require("./api/hrm_due_clearence/hrm_due_clearence.router")
const DueClearenceMastRouter = require("./api/DueClearenceMast/DueClearenceMast.router")
const DueClearenceHRRouter = require("./api/DueClearenceHR/DueClearenceHR.router")
const LeaveRequestApproval = require("./api/LeaveRequestApproval/LeaveRequestApproval.router")
const attendanceDetl = require("./api/attendance_updation/attendance.router")
const otcancel = require("./api/otcancel/otcancel.router")
const CommonSettings = require("./api/CommonSetting/CommonSetting.router")
const carryforward = require("./api/carryforwardleaves/carryforward.router")
const attandancemarking = require("./api/attandance_marking/attandance_marking.router")
const LeavecarryforwardLeave = require("./api/leavecarryforward/leavecarryforward.router")
const hrmAlertRouter = require("./api/hrm_alert/hrm_alert.router")
const hrmMessageRouter = require("./api/hrm_message/hrm_message.router")
const CountRouter = require("./api/dashboardcount/count.router")
const hrmAnnouncementRouter = require("./api/hrm_Announcement/hrm_Announcement.router")
const hrmgrosssalaryRouter = require("./api/Hrm_grosssalary/Hrm_grosssalary.router")
const attedancemarkRouter = require("./api/attendance_marking_save/attendance_marking_save.router")
const payrollprocess = require("./api/payrollprocess/payrollprocess.router")
const JobdescriptionRouter = require("./api/Job_description/Job_description.router")
const advance_settingsRouter = require("./api/advance_settings/advance_settings.router")
const advancerequestRouter = require("./api/advance_request/advance_request.router")
const CategoryReportRouter = require("./api/CategoryReport/CategoryReport.router")
const DesignationReportRouter = require("./api/DesignationReport/DesignationReport.router")
const QualificatonReportRouter = require("./api/QualificationReport/QualificationReport.router")
const DeptSectionReportRouter = require("./api/DeptSectionReport/DeptSectionReport.router")
const DesigExpReportRouter = require("./api/DesignationExpReport/DesigExpReport.router")
const TrainingProbaReportRouter = require("./api/TraingProbaReport/TrainingProbaReport.router")
const bloodgrpReportRouter = require("./api/bloodgrpReport/bloodgrpReport.router")
const ReligionReportRouter = require("./api/ReligionReport/ReligionReport.router")
const RegionReportRouter = require("./api/regionReport/regionReport.router")
const experienceReportRouter = require("./api/experienceReport/ExperienceReport.router")
const institutionReportRouter = require("./api/institutionReport/institutionReport.router")
const RegistrationTypeReportRouter = require("./api/RegistrationTypeReport/RegistrationTypeReport.router")
const ContractReportRouter = require("./api/ContractReport/ContractReport.router")
const PermanentEmpReportRouter = require("./api/PermanentEmpReport/PermanentEmpReport.router")
//const employeeReportRouter = require("./api/employeeReport/EmployeeReport.router")
const empVerificationRouter = require("./api/EmpVerification/EmpVerification.router")
const JobSummaryRouter = require("./api/JobSummary/JobSummary.router")
const KRARouter = require("./api/KRA/KRA.router")
const PerformanceAppraisalRouter = require("./api/PerformanceAppraisal/PerformanceAppraisal.router")
const ActiveEmpReportRouter = require("./api/ActiveEmpReport/ActiveEmpReport.router")
const punchTrasfer = require("./api/PunchTransfer/punchtransfer.router")
const CommonReqst = require("./api/CommonRequest/CommonReqst.router")
const Vaccination = require("./api/Vaccination/Vaccination.router")
const CommonRequestMast = require("./api/CommonRequestMaster/master.router")
//Training
const TrainingType = require("./api/TrainingType/TrainingType.router")
const TrainingCategory = require("./api/TrainingCategory/TrainingCategory.router")
const TrainingName = require("./api/TrainingName/TrainingName.router")
const TrainerName = require("./api/TrainerName/TrainerName.router")
const TrainingTopic = require("./api/TrainingTopic/TrainingTopic.route")
const TriningQuestions = require("./api/TrainingQuestions/TrainingQuestions.router")
const SchedulingTime = require("./api/SchedulingTime/SchedulingTime.router")
const TrainingSchedule = require("./api/TrainingSchedule/TrainingSchedule.router")
const DepartmentalTrainingSchedule = require("./api/Departmental_Training_Schedule/DepartmentalTrainingSchedule.router")
const TrainingUpdate = require("./api/TrainingUpdate/TrainingUpdate.router")
const TrainingEmployeeSchedule = require("./api/TrainingEmployeeSchedule/TrainingEmployeeSchedule.router")
const TrainingAfterJoining = require("./api/TrainingAfterJoining/TrainingAfterJoining.router")
const trainUploadCheck = require("./api/training_upload/training_upload.router")
const TrainingProcess = require("./api/TrainingProcess/TrainingProcess.router")
const TrainingOnline = require("./api/TrainingOnline/TrainingOnline.router")
const Training_topic_uploads = require("./api/Training_topic_uploads/Training_topic_uploads.router")
const TrainingEmployee_Dashboard = require("./api/TrainingEmployee_Dashboard/TrainingEmployee_Dashboard.router")
const TrainingMonthlyReport = require("./api/TrainingMonthlyReport/MonthlyReport.router")
const CommonPreTestPage = require("./api/TrainingCommonTest/TrainingCommonTest.router")
const InductionTraining = require("./api/TrainingInduction/TrainingInduction.route")
const InductionTest = require("./api/TrainingInductionTest/InductionTest.router")
const InductionProcess = require("./api/TrainingInductionProcess/InductionProcess.router")
const TrainingInductionReport = require("./api/TrainingInductionReport/TrainingInductionReport.router")
const TrainingDetails = require("./api/TrainingDetails/TrainingDetails.route")
const LeaveReport = require("./api/LeaveReport/LeaveReport.router")
const TrainingDashboard = require("./api/TrainingDashboard/TrainingDashboard.router")
const AttendenceReport = require("./api/AttendenceReport/AttendenceReport.router")
const TrainingVerification = require("./api/TrainingVerification/TrainingVerification.route")
const TrainingFeedback = require("./api/Training_Feedback/TrainingFeedback.router")
const TrainingRecord = require("./api/TrainingRecord/TrainingRecord.router")
const OnObservationRequest = require("./api/OnobservationRequest/OnobservationRouter")
const ManualrequestUpload = require("./api/ManualRequest/Manual.router")
const OffRquest = require('./api/OFFRequest/OffRequest.router')
const TrainingSubType = require('./api/TrainingSubTypeMaster/TrainingSubType.router')
const Training_additional_entry = require('./api/Training_additional_entry/Training_additional_entry.router')
const DoctorsProcess = require("./api/DoctorsProcess/doctor.router")

const cronjob = require("./cron-jobs/cron.router");

app.use(express.json({ limit: '50mb' }));
app.use((req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "http://192.168.10.170:8080
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
    );
    res.set('Cache-Control', 'no-store'); // Set Cache-Control: no-store for specific routes
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// ----- logger display For Info ----
app.get('/info', (req, res) => {
    fs.readFile('./errorlog/info.log', (error, txtString) => {
        if (error) throw err;
        res.write('<div id="content"><pre>' + txtString.toString().replace(/\n/g, '<br />') + '</pre>');
        res.end();
    })
})

// ----- logger display For err ----
app.get('/error', (req, res) => {
    fs.readFile('./errorlog/error.log', (error, txtString) => {
        if (error) throw err;
        res.write('<div id="content"><pre>' + txtString.toString().replace(/\n/g, '<br />') + '</pre>');
        res.end();
    })
})

// ----- logger display For ward ----
app.get('/warn', (req, res) => {
    fs.readFile('./errorlog/warn.log', (error, txtString) => {
        if (error) throw err;
        res.write('<div id="content"><pre>' + txtString.toString().replace(/\n/g, '<br />') + '</pre>');
        res.end();
    })
})

app.use("/api/users", userRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/branch", branchRouter);
app.use("/api/department", departmentRouter);
app.use("/api/section", deptSectionRouter);
app.use("/api/usergroup", userGroupRouter);
app.use("/api/grpassign", groupAssignRouter);
app.use("/api/grprights", groupRights);
app.use("/api/common", getCommonQery);
app.use("/api/inst", institutionType);
app.use("/api/emptype", emptype);
app.use("/api/empstat", empstatus);
app.use("/api/designation", designation);
app.use("/api/bank", bank);
app.use("/api/qal", qualificattion);
app.use("/api/spec", specialied);
app.use("/api/region", region);
app.use("/api/university", university);
app.use("/api/bloodgroup", bloodgroup);
app.use("/api/grade", grade)
app.use("/api/district", district)
app.use("/api/earn", earnings)
app.use("/api/empcat", empcategory)
app.use("/api/regtype", registraiontype)
app.use("/api/shift", shiftmaster)
app.use("/api/holidaylist", yearlyholidaylist)
app.use("/api/yearlyleaves", yearlyleaves)
app.use("/api/doctype", doctype)
app.use("/api/empmast", hrmempmast)
app.use("/api/empcontract", hrmcotract)
app.use("/api/empearndeduction", hrmearndeduction)
app.use("/api/experience", hrmexperience)
app.use("/api/personaldetl", hrmempPersonal)
app.use("/api/empesipf", hrmempesipf)
app.use("/api/qualify", hrmqualification)
app.use("/api/course", course)
app.use("/api/edu", education)
app.use("/api/specilization", specialization)
app.use("/api/modulegroup", modulegroupmaster)
app.use("/api/moduleRights", moduleUserRights)
app.use("/api/Religion", ReligionRouter)
app.use("/api/Earntype", EarntypeRouter)
app.use("/api/leaveType", leaveTypeRouter)
app.use("/api/state", state)
app.use("/api/fineded", finededuction)
app.use("/api/empfinededuction", empfinededuction)
app.use("/api/upload", upload)
app.use("/api/salaryIncrement", salaryincrementRouter)
app.use("/api/yearleaveprocess", yearleaveprocess)
app.use("/api/plan", dutyplanning)
app.use("/api/leaveRequestType", leaveRequestType)
app.use("/api/departmentshift", departmentshiftRouter)
app.use("/api/overtimerequest", overtimerequest)
app.use("/api/boardEdu", boardEdu)
app.use("/api/LeaveRequest", LeaveRequest)
app.use("/api/authorization", authorization)
app.use("/api/Resignation", ResignationRouter)//resignation request
app.use("/api/Duedepartment", DuedepartmentRouter)//Due Clearence Department Master
app.use("/api/OtWage", OtWage)//OT Wage 
app.use("/api/dueclearence", DueclearenceRouter)//due clearence
app.use("/api/duemast", DueClearenceMastRouter)//due clearence
app.use("/api/dueclrHR", DueClearenceHRRouter)//due clearence HR
app.use("/api/LeaveRequestApproval", LeaveRequestApproval)//due clearence HR
app.use("/api/attendCal", attendanceDetl) // Attendance Calculation
app.use("/api/otcancel", otcancel) // otcancel
app.use("/api/commonsettings", CommonSettings) // common settings
app.use("/api/carryforward", carryforward)
app.use("/api/attandancemarking", attandancemarking)
app.use("/api/CarryLeave", LeavecarryforwardLeave)
app.use("/api/hrmAlert", hrmAlertRouter)//alert
app.use("/api/hrmMessage", hrmMessageRouter)//message
app.use("/api/Count", CountRouter)
app.use("/api/hrmAnnouncement", hrmAnnouncementRouter)//Announcement
app.use("/api/hrmgrosssalary", hrmgrosssalaryRouter)//Announcement
app.use("/api/proftax", professionaltax)//proffessional Tax
app.use("/api/attedancemarkSave", attedancemarkRouter)//attendance marking save
app.use("/api/payrollprocess", payrollprocess)//payroll Process
app.use("/api/jobdescription", JobdescriptionRouter)//job description
app.use("/api/advanceSettings", advance_settingsRouter)
app.use("/api/advancerequest", advancerequestRouter)
app.use("/api/CategoryReport", CategoryReportRouter)
app.use("/api/DesignationReport", DesignationReportRouter)
app.use("/api/QualificationReport", QualificatonReportRouter)
app.use("/api/DeptSectionReport", DeptSectionReportRouter)
app.use("/api/DesignationExpReport", DesigExpReportRouter)
app.use("/api/TraingProbaReport", TrainingProbaReportRouter)
app.use("/api/bloodgrpReport", bloodgrpReportRouter)//blood group reports
app.use("/api/religionReport", ReligionReportRouter)// religion wise report
app.use("/api/RegionReport", RegionReportRouter)//region wise report
app.use("/api/experienceReport", experienceReportRouter) // employee experience report
app.use("/api/institutionReport", institutionReportRouter) //institution report
app.use("/api/RegistrationTypeReport", RegistrationTypeReportRouter) //registration type reports
app.use("/api/ContractReport", ContractReportRouter)// contract expiry report
app.use("/api/PermanentEmpReport", PermanentEmpReportRouter) //permanent employee report
app.use("/api/empVerification", empVerificationRouter)
app.use("/api/jobsummary", JobSummaryRouter)//job summary
app.use("/api/KraMast", KRARouter)//KRA
app.use("/api/Performance", PerformanceAppraisalRouter)
app.use("/api/ActiveEmpReport", ActiveEmpReportRouter)
app.use("/api/punchTrasfer", punchTrasfer)
app.use("/api/CommonReqst", CommonReqst)
app.use("/api/CommonRequestMast", CommonRequestMast)
app.use('/api/Vaccination', Vaccination)
//Training
app.use("/api/TrainingType", TrainingType)
app.use("/api/TrainingCategory", TrainingCategory)
app.use("/api/TrainingName", TrainingName)
app.use("/api/TrainerName", TrainerName)
app.use("/api/TrainingTopic", TrainingTopic)
app.use("/api/TriningQuestions", TriningQuestions)
app.use("/api/SchedulingTime", SchedulingTime)
app.use("/api/TrainingSchedule", TrainingSchedule)
app.use("/api/DepartmentalTrainingSchedule", DepartmentalTrainingSchedule)
app.use("/api/TrainingUpdate", TrainingUpdate)
app.use("/api/TrainingEmployeeSchedule", TrainingEmployeeSchedule)
app.use("/api/TrainingAfterJoining", TrainingAfterJoining)
app.use("/api/trainUploadCheck", trainUploadCheck)
app.use("/api/TrainingProcess", TrainingProcess)
app.use("/api/TrainingOnline", TrainingOnline)
app.use("/api/Training_topic_uploads", Training_topic_uploads)
app.use("/api/TrainingEmployee_Dashboard", TrainingEmployee_Dashboard)
app.use("/api/TrainingMonthlyReport", TrainingMonthlyReport)
app.use("/api/CommonPreTestPage", CommonPreTestPage)
app.use("/api/InductionTraining", InductionTraining)
app.use("/api/InductionTest", InductionTest)
app.use("/api/InductionProcess", InductionProcess)
app.use("/api/TrainingInductionReport", TrainingInductionReport)
app.use("/api/TrainingDetails", TrainingDetails)
app.use("/api/LeaveReport", LeaveReport)
app.use("/api/TrainingDashboard", TrainingDashboard)
app.use("/api/AttendenceReport", AttendenceReport)
app.use("/api/TrainingVerification", TrainingVerification)
app.use("/api/TrainingFeedback", TrainingFeedback)
app.use("/api/TrainingRecord", TrainingRecord)
app.use("/api/OnObservationRequest", OnObservationRequest)
app.use("/api/manualRequest", ManualrequestUpload)
app.use("/api/OffRequest", OffRquest)
app.use("/api/TrainingSubType", TrainingSubType)
app.use("/api/Training_additional_entry", Training_additional_entry)
app.use("/api/DoctorsProcess", DoctorsProcess)
app.use("/api/cronjob", cronjob);



// ------ Database Connection --------

app.listen(process.env.APP_PORT, () =>
    console.log(`Server Up and Running ${process.env.APP_PORT}`),
    infoLogger(`Server Up and Running ${process.env.APP_PORT}`)
);



