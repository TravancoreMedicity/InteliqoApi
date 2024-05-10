
const { logger } = require('../../logger/logger')
const { GetTndInductMonthlyTrainings, GetTndDeptMonthlyTrainings, GetTndInductMonthlyAll, GetTndDeptMonthlyAll, GetPieChartData, GetBarChartData, GetInductCompleteList, GetInductPendingList, GetInductNextMnthList, DeptCompleteList, GetDeptPendingList, DeptNextMnthList, GetInductRetestList, DeptRetestList, GetInductTotalSchedule, DeptTotalSchedule, GetInductApprovalCount, GetDeptApprvlCount, GetHodInchargeDeptTrainings, GetHODInchargeInductAprvlcount, GetHODInchargeDeptAprvlcount, GetEmpDeptTrainings, GetHODDeptMonthlyTrainings, GetHODDeptMonthlyAll, GetEmpInductTraining, GetNotAttendData, GetHodInchargeDeptOverview, GetEmpBarChartData, GetEmplinechartData } = require('./TrainingDashboard.service')

module.exports = {

    GetTndInductMonthlyTrainings: (req, res) => {
        const body = req.body;
        GetTndInductMonthlyTrainings(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetTndDeptMonthlyTrainings: (req, res) => {
        const body = req.body;
        GetTndDeptMonthlyTrainings(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },

    GetHODDeptMonthlyTrainings: (req, res) => {
        const body = req.body;
        GetHODDeptMonthlyTrainings(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },


    GetPieChartData: (req, res) => {
        const body = req.body;
        GetPieChartData(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },

    GetEmplinechartData: (req, res) => {
        const body = req.body;
        GetEmplinechartData(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },

    GetNotAttendData: (req, res) => {
        const body = req.body;
        GetNotAttendData(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },

    GetBarChartData: (req, res) => {
        const body = req.body;
        GetBarChartData(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },

    GetEmpBarChartData: (req, res) => {
        const body = req.body;
        GetEmpBarChartData(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },

    GetTndInductMonthlyAll: (req, res) => {
        const body = req.body;
        GetTndInductMonthlyAll(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },


    GetTndDeptMonthlyAll: (req, res) => {
        const body = req.body;
        GetTndDeptMonthlyAll(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },

    GetHODDeptMonthlyAll: (req, res) => {
        const body = req.body;
        GetHODDeptMonthlyAll(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },

    GetInductCompleteList: (req, res) => {
        const body = req.body;
        GetInductCompleteList(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetInductPendingList: (req, res) => {
        const body = req.body;
        GetInductPendingList(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetInductNextMnthList: (req, res) => {
        const body = req.body;
        GetInductNextMnthList(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    DeptCompleteList: (req, res) => {
        const body = req.body;
        DeptCompleteList(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetDeptPendingList: (req, res) => {
        const body = req.body;
        GetDeptPendingList(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    DeptNextMnthList: (req, res) => {
        const body = req.body;
        DeptNextMnthList(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetInductRetestList: (req, res) => {
        const body = req.body;
        GetInductRetestList(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    DeptRetestList: (req, res) => {
        const body = req.body;
        DeptRetestList(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetInductTotalSchedule: (req, res) => {
        const body = req.body;
        GetInductTotalSchedule(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    DeptTotalSchedule: (req, res) => {
        const body = req.body;
        DeptTotalSchedule(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetInductApprovalCount: (req, res) => {
        const body = req.body;
        GetInductApprovalCount(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetDeptApprvlCount: (req, res) => {
        const body = req.body;
        GetDeptApprvlCount(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetHodInchargeDeptTrainings: (req, res) => {
        const body = req.body;
        GetHodInchargeDeptTrainings(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },

    GetHodInchargeDeptOverview: (req, res) => {
        const body = req.body;
        GetHodInchargeDeptOverview(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },

    GetHODInchargeInductAprvlcount: (req, res) => {
        const body = req.body;
        GetHODInchargeInductAprvlcount(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetHODInchargeDeptAprvlcount: (req, res) => {
        const body = req.body;
        GetHODInchargeDeptAprvlcount(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetEmpDeptTrainings: (req, res) => {
        const body = req.body;
        GetEmpDeptTrainings(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
    GetEmpInductTraining: (req, res) => {
        const body = req.body;
        GetEmpInductTraining(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

        });
    },
}



