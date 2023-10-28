const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { employeeinsert, employeeupdate, getemplpyee, employeeGetById,
    employeedelete, login, changePassword, empDeactivate } = require('../employee/employee.controller');

router.post("/login", login);
router.post('/', checkToken, employeeinsert);
router.patch('/', checkToken, employeeupdate);
router.get('/', checkToken, getemplpyee);
router.get('/:id', checkToken, employeeGetById);
router.delete('/', checkToken, employeedelete);
router.patch('/update/pass', checkToken, changePassword)
router.patch('/inactive', checkToken, empDeactivate)

module.exports = router;