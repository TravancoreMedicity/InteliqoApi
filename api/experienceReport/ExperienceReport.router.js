const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    experienceReport,
    DeptSectReport,
    getEmpNameByDeptSection,
    EmpNameReport,
    getDeptSectByID,
    noExperienceReport,
    noExpDeptSectReport,
    experienceSummaryReport,
    expSummaryDeptSectReport,
    expSummaryEmpnameReport
} = require('../experienceReport/ExperienceReport.controller')

//expeience report
router.post('/expemployee', checkToken, experienceReport);
router.post('/deptsect', checkToken, DeptSectReport);
router.get('/empname', checkToken, getEmpNameByDeptSection);
router.post('/sectempname', checkToken, EmpNameReport);
router.post('/deptsectById', checkToken, getDeptSectByID);
router.post('/noexp', checkToken, noExperienceReport)
router.post('/noExp/deptsect', checkToken, noExpDeptSectReport)

router.post('/exp/summary', checkToken, experienceSummaryReport)
router.post('/exp/deptsect', checkToken, expSummaryDeptSectReport)
router.post('/exp/empname', checkToken, expSummaryEmpnameReport)


module.exports = router;