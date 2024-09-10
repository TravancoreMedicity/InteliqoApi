const pool = require('../../config/database');

module.exports = {
    AnnualHealthIllnessDetails: (data) => {

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO annual_health_doctor_details
            (
            doctor_id,
            vaccination_status_yes,
            vaccination_status_no,
            mrd_no,
            unit,
            pulse,
            BP,
            Resp,
            Temp,
            Weight,
            Height,
            BMI,
            Physician_note,
            Hbs_status,
            X_ray,
            blood_grouping,
            serology,
            Titer_greather_100,
            Titer_12_100,
            Titer_0_12,
            First_dose_status,
            Second_dose_status,
            Third_dose_status,
            Booster_dose_status,
            Consultations,
            fitness_accept,
            fitness_not_accept,
            Date_saved_doc,
            department_id,
            em_no,
            em_id
           )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    data.doc_emid, data.titer_yes, data.titer_no, data.MRD_No, data.Unit, data.Pulse, data.Bp, data.Resp, data.Temp,
                    data.Weight, data.Height, data.BMI, data.General_Examininations, data.HBs_Ag_Titer, data.Check_X_ray, data.Blood_Grouping, data.Serology,
                    data.Titer_Value_100, data.Titer_Value_12, data.Titer_Value_0, data.Vacination_first, data.Vacination_Second, data.Vacination_Third, data.Vacination_Booster,
                    data.Other_Consultations, data.Fitness_yes, data.Fitness_no, data.DateOfSave, data.department, data.em_no, data.em_id
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {

            return { status: 0, message: error }
        })
    },


    AnnualHealthDocDetails: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO annualhealthillnessdetails
            (
            Em_No, Em_Id, Diseases, Diseases_Yes, Diseases_No,Diseases_Discription,Treatment_Yes,Treatment_No,Treatment_Details,doctor_id,department_id
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {

            return { status: 0, message: error }
        })
    },

    GetHealthCheckUpData: (data, callBack) => {
        pool.query(
            `SELECT  
            Diseases,
            Diseases_Yes,
            Diseases_No,
            Diseases_Discription,
            Treatment_Yes,
            Treatment_No,
            Treatment_Details

              from  annualhealthillnessdetails
              where Em_No=?
               `,
            [
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

    GetHealthData: (data, callBack) => {
        pool.query(
            `SELECT  
            vaccination_status_yes,
            vaccination_status_no,
            mrd_no,
            unit,
            pulse,
            pulse,
            BP,
            Resp,
            Temp,
            Weight,
            Height,
            BMI,
            Physician_note,
            Hbs_status,
            X_ray,
            blood_grouping,
            serology,
            Titer_greather_100,
            Titer_12_100,
             Titer_0_12,
             First_dose_status,
             Second_dose_status,
             Third_dose_status,
             Booster_dose_status,
             Consultations,
             fitness_accept,
             fitness_not_accept,
             Date_saved_doc,
             em_name,
             Hrd_Saved_Emid,
             Hrd_Saved_date,
             Hrd_join_Status,
             Hrd_NotJoin_Status,
             Hrd_Pending_Status
              from  annual_health_doctor_details
            INNER JOIN hrm_emp_master  ON annual_health_doctor_details.doctor_id =hrm_emp_master.em_id
              where annual_health_doctor_details.em_id=?
               `,
            [
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

    InsertAnnualHrd: (data, callBack) => {
        pool.query(
            `UPDATE annual_health_doctor_details 
            SET  Hrd_Saved_Emid=? ,
          Hrd_Saved_date=? ,
          Hrd_join_Status=? ,
          Hrd_NotJoin_Status=? ,
           Hrd_Pending_Status=? 
            WHERE em_no = ? and em_id=?
               `,
            [
                data.HrdNo,
                data.datesaved,
                data.Join,
                data.NotJoin,
                data.pending,
                data.em_no,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results, error);
            }
        )
    },
}