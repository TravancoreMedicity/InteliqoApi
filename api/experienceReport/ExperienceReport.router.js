const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    experienceReport,
    DeptSectReport,
    getEmpNameByDeptSection,
    EmpNameReport,
    getDeptSectByID,
} = require('../experienceReport/ExperienceReport.controller')

//expeience report
router.post('/expemployee', checkToken, experienceReport);
router.post('/deptsect', checkToken, DeptSectReport);
router.get('/empname', checkToken, getEmpNameByDeptSection);
router.post('/sectempname', checkToken, EmpNameReport);
router.post('/deptsectById', checkToken, getDeptSectByID);


module.exports = router;