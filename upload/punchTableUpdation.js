const { addDays, format } = require('date-fns');
const pool = require('../config/database');
const moment = require('moment');

const calculateIn = async (empid, punchTime) => {

    const punchInTime = moment(punchTime).format('YYYY-MM-DD HH:mm')
    const punchInTime_two = moment(punchTime).format('YYYY-MM-DD')
    // console.log(empid, punchTime)
    updatePunchIn(empid, punchInTime_two, (err, result) => {
        if (err) {
            console.log('error')
        }

        if (result !== 1000) {
            // const data = result[0].shift_id;
            const data = {
                shift: result[0].shift_id,
                slno: result[0].punch_slno,
                punchTime: punchInTime
            }
            // console.log(result[0])
            updatePunchInDetails(data)
        }

        if (result === 1000) {
            // console.log('no shift')
        }
    })

}
//GET SHIFT AND UPDATE OUNCH IN 
const updatePunchIn = async (empid, punchTime, callBack) => {
    pool.query(
        `CALL GET_PUNCHMAST_DETL(?,?)`,
        [
            empid,
            punchTime
        ],
        (error, results, feilds) => {
            if (error) {
                return callBack(error);
            }
            results[0]
            // console.log(results[0])
            const arrayLength = Object.keys(results[0]).length;
            // console.log(arrayLength)
            if (arrayLength === 1) {
                const shiftDetail = JSON.parse(JSON.stringify(results[0]));
                return callBack(null, shiftDetail);
            } else {

                // NO SHIFT MARKED 
                const noShiftMapped = 1000;
                return callBack(null, noShiftMapped);
            }
        }
    )
}
//GET SHIFT TIME DETAILS DETAILS 
const getShiftTimeDetil = async (shiftId, callBack) => {
    // console.log(shiftId)
    pool.query(
        `CALL GET_SHIFT_TIME(?)`,
        [
            shiftId
        ],
        (error, result, feild) => {
            if (error) {
                callBack(error)
            }
            callBack(null, result[0])
        })
}


//CALCULATED THE IN AND OUT BASED ON SHIFT

const updatePunchInDetails = async (data) => {
    // console.log(data)
    const { shift, slno, punchTime } = data;
    getShiftTimeDetil(shift, (err, result) => {
        // console.log(err)
        if (err) {
            console.log(err)
        }
        if (result) {
            const shiftDetl = JSON.parse(JSON.stringify(result[0]));
            // console.log(shiftDetl)
            calculateShift(shiftDetl, punchTime, slno)
        }

    })

}

//calculater shift in and out 
const calculateShift = async (shiftDetl, punchTime, slno) => {

    //console.log(punchTime);
    // console.log(slno)
    const {
        shft_chkin_start,
        shft_chkin_end,
        shft_chkout_start,
        shft_chkout_end,
        shft_cross_day
    } = shiftDetl;

    const punch = moment(punchTime).format('HH:mm');

    const startIn = moment(shft_chkin_start).format('HH:mm');
    const startOut = moment(shft_chkin_end).format('HH:mm');

    const endIn = moment(shft_chkout_start).format('HH:mm');
    const endOut = moment(shft_chkout_end).format('HH:mm');

    const Sin = moment(startIn, 'HH:mm');
    const Sout = moment(startOut, 'HH:mm');

    const Ein = moment(endIn, 'HH:mm');
    const EOut = moment(endOut, 'HH:mm');

    const puTime = moment(punch, 'HH:mm');


    if (puTime.isBetween(Sin, Sout)) {
        checkInUpdation(slno, punchTime, (err, result) => {
            if (err) {
                console.log(err)
            }
        })
    } else if (puTime.isBetween(Ein, EOut)) {
        if (shft_cross_day !== 0) {

            const crosOut = `${format(addDays(new Date(punchTime), 1), 'yyyy-MM-dd')} ${format(new Date(punchTime), 'HH:mm')}`
            if (puTime.isBetween(Ein, EOut)) {
                checkOutUpdation(slno, crosOut, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }

        } else {
            checkOutUpdation(slno, punchTime, (err, result) => {
                if (err) {
                    console.log(err)
                }
            })
        }
    }
}
// INSERT INTO CHECK IN TIME 
const checkInUpdation = async (slno, punch, callBack) => {

    checkinUpdated(slno, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            const data = JSON.parse(JSON.stringify(result[0]))
            if (data.punch_in === null) {
                pool.query(
                    `UPDATE punch_master SET punch_in = ? WHERE punch_slno = ?`,
                    [
                        punch,
                        slno
                    ],
                    (error, result, feild) => {
                        if (error) {
                            callBack(error)
                        }
                        callBack(null, result)
                    }
                )
            }
        }
    })

}
//INSERT INTO CHECK OUT TIME
const checkOutUpdation = async (slno, punch, callBack) => {
    pool.query(
        `UPDATE punch_master SET punch_out = ? WHERE punch_slno = ?`,
        [
            punch,
            slno
        ],
        (error, result, feild) => {
            if (error) {
                callBack(error)
            }
            callBack(null, result)
        }
    )
}
//CHECK CHECK IN UPDATED OR NOT
const checkinUpdated = (slno, callBack) => {
    pool.query(
        `SELECT punch_in FROM medi_hrm.punch_master where punch_slno = ?`,
        [
            slno
        ],
        (error, result, feilds) => {
            if (error) {
                callBack(error)
            }
            callBack(null, result)
        }
    )
}


module.exports = {
    calculateIn
}