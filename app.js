require("dotenv").config();
const express = require("express");
const app = express();

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

app.use(express.json());

app.use((req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "http://192.168.10.170:8080
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

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
app.use("/api/proftax", professionaltax)
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

// app.all('*', function (req, res) {
//     return res.status(200).json({
//         success: 2,
//         message: "Bad Request"
//     });
// })

app.listen(process.env.APP_PORT, () =>
    console.log(`Server Up and Running ${process.env.APP_PORT}`)
);



