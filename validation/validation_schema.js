const Joi = require("joi");

const authSchema = Joi.object({
        first_name: Joi.string().uppercase().min(3).max(60).required(),
        email: Joi.string().email().lowercase().required(),
        email_verify: Joi.string().email().lowercase().required(),
        password: Joi.string().required().min(2)
});

// employee table data validation
const validateEmployee = Joi.object({
        emp_slno: Joi.optional(),
        emp_no: Joi.number().required(),
        emp_email: Joi.string().optional(),
        emp_username: Joi.string().max(20).required(),
        emp_password: Joi.string().required(),
        emp_status: Joi.optional(),
        emp_id: Joi.number().required(),
        create_user: Joi.number().optional(),
        oldempno: Joi.number().required(),
});

// brqanch input validation

const validateBranch = Joi.object({
        branch_name: Joi.string().uppercase().min(1).max(60).message({
                'string.empty': 'Branch Name is required',
                'string.min': 'Department Name length must be at least 1 characters long',
                'string.max': 'Department Name length must be less than or equal to 60 characters long'
        }),
        branch_address: Joi.string().min(1).max(100).message({
                'string.empty': 'Branch Address Name is required',
        }),
        branch_email: Joi.string().email().min(1).max(45).message({
                'string.empty': 'Email Address Name is required',
        }),
        phoneNumber: Joi.string().min(1).max(45).optional().uppercase().message({
                'string.empty': 'Phone Number is required',
        }),
        branch_esi: Joi.string().min(1).max(45).uppercase().message({
                'string.empty': 'Esi Number is required',
        }),
        branch_pf: Joi.string().min(1).max(45).uppercase().message({
                'string.empty': 'PF Number is required',
        }),
        branch_status: Joi.number().min(0).max(1),
        branch_slno: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),

});

// Department input validation

const validateDepartment = Joi.object({
        dept_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Department Name is Required',
                        'string.min': 'Department Name length must be at least 3 characters long',
                        'string.max': 'Department Name length must be less than or equal to 45 characters long'
                }),
        dept_status: Joi.number().min(0).max(1),
        dept_alias: Joi.string().trim().min(1).max(5).required()
                .messages({
                        'string.empty': 'Alias Name is Required',
                        'string.min': 'Alias Name length must be at least 1 characters long',
                        'string.max': 'Alias Name length must be less than or equal to 5 characters long',
                }),
        dept_id: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

const validateSection = Joi.object({
        sect_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Department Section Name is Required',
                        'string.min': 'Department Section Name length must be at least 3 characters long',
                        'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
                }),
        sect_status: Joi.number().min(0).max(1),
        authorization_incharge: Joi.number().optional(),
        authorization_hod: Joi.number().optional(),
        dept_id: Joi.number().required(),
        sect_id: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        dept_sub_sect: Joi.number().required()
});

const validateMenuName = Joi.object({
        menu_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Menu Name is Required',
                        'string.max': 'Menu Name length must be less than or equal to 45 characters long',
                        'string.min': 'Menu Name length must be at least 3 characters long',
                }),
        menu_module_name: Joi.string().min(1).max(1).required(),
        menu_slno: Joi.optional()
});

const validateGroupAssign = Joi.object({
        user_group_slno: Joi.string().min(1).max(1).required(),
        hrm_emp_slno: Joi.string().min(1).max(1).required(),
});

const validateInstitutionType = Joi.object({
        inst_slno: Joi.optional(),
        inst_emp_type: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Type Name is Required',
                        'string.max': 'Type length must be less than or equal to 45 characters long',
                        'string.min': 'Type length must be at least 3 characters long',
                }),
        inst_emp_status: Joi.number().max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

// employee Type
const validateEmployeeType = Joi.object({
        emptype_slno: Joi.optional(),
        emptype_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Type Name is Required',
                        'string.max': 'Type length must be less than or equal to 45 characters long',
                        'string.min': 'Type length must be at least 3 characters long',
                }),
        el_aplicable: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),

});

// employee status
const validateEmployeeStatus = Joi.object({
        emstats_slno: Joi.optional(),
        empstat_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Name is Required',
                        'string.max': 'Name length must be less than or equal to 45 characters long',
                        'string.min': 'Name length must be at least 3 characters long',
                }),
        desigstatus: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        update_user: Joi.number().optional(),
});


const validateDesignation = Joi.object({
        desg_slno: Joi.optional(),
        desg_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Deignation Name is Required',
                        'string.max': 'Deignation length must be less than or equal to 45 characters long',
                        'string.min': 'Deignation length must be at least 3 characters long',
                }),
        desg_notice_prd: Joi.number().required(),
        desg_status: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

const validateBankMaster = Joi.object({
        bank_slno: Joi.optional(),
        bank_mastname: Joi.required(),
        bank_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Bank Name is Required',
                        'string.max': 'Bank Name length must be less than or equal to 45 characters long',
                        'string.min': 'Bank Name length must be at least 3 characters long',
                }),
        bank_ifsc: Joi.string().trim().uppercase().min(3).max(12).required()
                .messages({
                        'string.empty': 'IFSC code is Required',
                        'string.max': 'IFSC code length must be less than or equal to 12 characters long',
                        'string.min': 'IFSC code length must be at least 3 characters long',
                }),
        bank_address: Joi.string().trim().lowercase().min(3).max(45).optional()
                .messages({
                        'string.empty': 'Bank Address is Required',
                        'string.max': 'Bank Address length must be less than or equal to 45 characters long',
                        'string.min': 'Bank Address length must be at least 3 characters long',
                }),
        bank_status: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

const validateQualification = Joi.object({
        qual_slno: Joi.optional(),
        qual_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Qualification Name is Required',
                        'string.max': 'Qualification length must be less than or equal to 45 characters long',
                        'string.min': 'Qualification length must be at least 3 characters long',
                }),
        qual_status: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

const validateSpecialized = Joi.object({
        spec_slno: Joi.optional(),
        spec_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Specialized Name is Required',
                        'string.max': 'Specialized length must be less than or equal to 45 characters long',
                        'string.min': 'Specialized length must be at least 3 characters long',
                }),
        spec_status: Joi.number().min(1).max(1).required(),
});

const validateRegion = Joi.object({
        reg_slno: Joi.optional(),
        reg_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Region Name is Required',
                        'string.max': 'Region length must be less than or equal to 45 characters long',
                        'string.min': 'Region length must be at least 3 characters long',
                }),
        reg_pincode: Joi.number().min(1).optional(),
        reg_dist_slno: Joi.number().min(1).required(),
        reg_status: Joi.number().max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

// VALIDATE UNIVERSITY
const validateunivercity = Joi.object({
        unver_slno: Joi.optional(),
        unver_alias: Joi.string().trim().uppercase().min(1).max(10).required(),
        unver_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'University Name is Required',
                        'string.max': 'University length must be less than or equal to 45 characters long',
                        'string.min': 'University length must be at least 3 characters long',
                }),
        unver_status: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

// Validation for the Employment 
const validationEmployment = Joi.object({
        emt_slno: Joi.optional(),
        emt_name: Joi.string().required().min(5).max(75).trim(),
        emptype_slno: Joi.number().required(),
        destype_slno: Joi.number().required(),
        contract: Joi.number().required(),
        contract_perd: Joi.optional(),
        training: Joi.number().required(),
        training_perd: Joi.optional(),
        probation: Joi.number().required(),
        probation_perd: Joi.optional(),
        esi_yes: Joi.number().required(),
        pf_yes: Joi.number().required(),
        el_yes: Joi.number().required(),
        cl_yes: Joi.number().required(),
        hl_yes: Joi.number().required(),
        sick_yes: Joi.number().required(),
        emp_status: Joi.number().required()
})

// BLOOD GROUP VALIDATION
const validatebloodgroup = Joi.object({
        group_slno: Joi.optional(),
        group_name: Joi.string().required().trim().uppercase(),
        group_status: Joi.number().required()
})

// VALIDATE GRADE MASTER
const validateGradeMast = Joi.object({
        grade_slno: Joi.optional(),
        grade_desc: Joi.string().required().trim().uppercase(),
        grade_status: Joi.number().required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})




// VALIDATE EARN TYPE
const validateEarnMast = Joi.object({

        earn_type: Joi.string().required().uppercase().trim(),
        deduction_status: Joi.number().required(),
        earntype_status: Joi.number().required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})


// VALIDATE DISTRICT
const validatedistrict = Joi.object({
        dist_name: Joi.string().required().trim().uppercase(),
        dist_state_slno: Joi.number().required(),
        dist_status: Joi.number().required(),
        dist_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATE EARNINGS
const validateearnings = Joi.object({
        earnded_name: Joi.string().required().trim().uppercase().max(45),
        include_esi: Joi.number().required(),
        include_lwf: Joi.number().required(),
        include_pf: Joi.number().required(),
        include_protax: Joi.number().required(),
        erning_type_id: Joi.number().required(),
        earnded_status: Joi.number().required(),
        earnded_id: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATE EMPLOYEE CATEGORY
const validateempcategory = Joi.object({
        ecat_name: Joi.string().required().trim().uppercase().max(45),
        emp_type: Joi.number().required(),
        des_type: Joi.number().required(),
        ecat_cont: Joi.number(),
        ecat_cont_period: Joi.number(),
        ecat_cont_type: Joi.string().trim().uppercase().min(1),
        ecat_prob: Joi.number(),
        ecat_prob_period: Joi.number(),
        ecat_prob_type: Joi.string().uppercase(),
        ecat_cl: Joi.number(),
        ecat_cl_max: Joi.number(),
        ecat_el: Joi.number(),
        ecat_el_max: Joi.number(),
        ecat_sl: Joi.number(),
        ecat_sl_max: Joi.number(),
        ecat_nh: Joi.number(),
        ecat_nh_max: Joi.number(),
        ecat_fh: Joi.number(),
        ecat_fh_max: Joi.number(),
        ecat_woff_allow: Joi.number(),
        ecat_doff_allow: Joi.number(),
        ecat_esi_allow: Joi.number(),
        ecat_confere: Joi.number(),
        ecat_confere_max: Joi.number(),
        ecat_lop: Joi.number(),
        ecat_lop_max: Joi.number(),
        ecat_mate: Joi.number(),
        ecat_mate_max: Joi.number(),
        ecat_status: Joi.number(),
        category_slno: Joi.number().optional(),
        empstat_period: Joi.number().optional(),
        cont_period: Joi.number().optional(),
        cont_grace: Joi.optional(),
        create_users: Joi.optional(),
        edit_user: Joi.optional(),
})

// VALIDATE REGISTRATON TYPE
const validateregistraiontype = Joi.object({
        registration_name: Joi.string().trim().uppercase().max(45),
        registration_status: Joi.number(),
        reg_id: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional()
})

//VALIDATE PROFESSIONAL TAX
const validateprofessionaltax = Joi.object({
        prof_tax_desc: Joi.string().trim().max(45).required(),
        prof_status: Joi.number().required(),
        salary_from: Joi.number().required(),
        salary_to: Joi.number().required(),
        tax_amt: Joi.number().required(),
        proftax_id: Joi.number().optional(),
});

// VALIDATE SHIFT MASTER
const validateshiftmaster = Joi.object({
        shft_desc: Joi.string().trim().uppercase().max(45).required(),
        shft_code: Joi.string().trim().uppercase().max(10).required(),
        shft_chkin_time: Joi.date().required(),
        shft_chkout_time: Joi.date().required(),
        shft_cross_day: Joi.number(),
        shft_chkin_start: Joi.date().required(),
        shft_chkin_end: Joi.date().required(),
        shft_chkout_start: Joi.date().required(),
        shft_chkout_end: Joi.date().required(),
        shft_duty_day: Joi.number(),
        shft_brk_start: Joi.date().required(),
        shft_brk_end: Joi.date().required(),
        shft_early_in_criteria: Joi.number(),
        shft_early_in_mints: Joi.date().required(),
        shft_late_out_criteria: Joi.number(),
        shft_late_out_mints: Joi.date().required(),
        shft_latein_allow_time: Joi.date().required(),
        shft_earlyout_allow_time: Joi.date().required(),
        first_half_in: Joi.date().required(),
        first_half_out: Joi.date().required(),
        second_half_in: Joi.date().required(),
        second_half_out: Joi.date().required(),
        shft_status: Joi.number(),
        shft_slno: Joi.number().optional(),
        shift_duration_in_min: Joi.number().optional(),
        shift_start_in_min: Joi.number().optional(),
        shift_end_in_min: Joi.number().optional(),
        night_off_flag: Joi.number().optional()

})

// VALIDATE YEARLY HOLIDAY LIST
const validateyearlyholidaylist = Joi.object({
        hld_desc: Joi.string().trim().uppercase().max(45).required(),
        lvetype_slno: Joi.number().required(),
        hld_date: Joi.date().required(),
        hld_year: Joi.number().integer().min(2000).max(2050),
        hld_status: Joi.number().required(),
        hld_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional()
});

// VALIDATE YEARLY LEAVES
const validateyearyleaves = Joi.object({
        lvetype_slno_cl: Joi.number().required(),
        max_allowed_count_cl: Joi.number().required(),
        month_year_cl: Joi.required(),
        lvetype_slno_sick: Joi.number().required(),
        max_allowed_count_sick: Joi.number().required(),
        month_year_sick: Joi.required(),
        lvetype_slno_conference: Joi.number().required(),
        max_allowed_count_conference: Joi.number().required(),
        month_year_conference: Joi.required(),
        lvetype_slno_lop: Joi.number().required(),
        max_allowed_count_lop: Joi.number().required(),
        month_year_lop: Joi.required(),
        lvetype_slno_maternity: Joi.number().required(),
        max_allowed_count_maternity: Joi.number().required(),
        month_year_maternity: Joi.required(),
        lvetype_slno_previlage: Joi.number().required(),
        max_allowed_count_previlage: Joi.number().required(),
        month_year_previlage: Joi.required(),
        com_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional()
})

// VALIDATE LEAVE TYPE
const validateleavetype = Joi.object({
        lvetype_desc: Joi.string().trim().uppercase().max(20).required(),
        lvetype_code: Joi.string().max(4).trim().uppercase().required(),
        carryforward: Joi.number().required(),
        avail_on_traing_probation: Joi.number().required(),
        avail_on_after_confirm: Joi.number().optional(),
        half_day_allowed: Joi.number().optional(),
        leave_credit_policy: Joi.number().optional(),
        leave_credit_policy_count: Joi.optional(),
        status: Joi.number().required(),
        is_lop: Joi.number().optional(),
        is_holiday: Joi.number().optional(),
        is_leave: Joi.number().optional(),
        lvetype_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional()
})

// VAIDATE DOCOTOR TYPE
const validatedoctype = Joi.object({
        doctype_desc: Joi.string().max(45).trim().uppercase().required(),
        doctype_status: Joi.number().required(),
        doctype_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATE RELIDION
const validatereligion = Joi.object({
        relg_name: Joi.string().trim().max(45).uppercase().required(),
        relg_status: Joi.number().required(),
        relg_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATE EMPLOYEE MASTER
const validateempmaster = Joi.object({
        em_no: Joi.number().required(),
        em_id: Joi.number().optional(),
        em_salutation: Joi.number().min(1).required(),
        em_name: Joi.string().trim().uppercase().required().max(60),
        em_gender: Joi.number().min(1).required(),
        em_dob: Joi.date().required(),
        em_age_year: Joi.number().optional(),
        em_age_month: Joi.number().optional(),
        em_age_day: Joi.number().optional(),
        em_doj: Joi.date().required(),
        hrm_religion: Joi.number().min(1).required(),
        em_mobile: Joi.number().max(999999999999).required(),
        em_phone: Joi.optional(),
        em_email: Joi.string().email().optional(),
        em_region: Joi.number().min(1).required(),
        hrm_region2: Joi.number().min(1).required(),
        em_branch: Joi.number().min(1).required(),
        contractflag: Joi.number().required(),
        em_department: Joi.number().min(1).required(),
        em_dept_section: Joi.number().min(1).required(),
        em_institution_type: Joi.number().min(1).required(),
        em_designation: Joi.number().min(1).required(),
        em_doc_type: Joi.optional(),
        em_category: Joi.number().min(1).required(),
        em_prob_end_date: Joi.date().optional(),
        em_conf_end_date: Joi.date().optional(),
        em_retirement_date: Joi.date().optional(),
        em_contract_end_date: Joi.date().optional(),
        em_status: Joi.number().min(1).required(),
        create_user: Joi.number().required(),
        create_date: Joi.date().optional(),
        addressPresent1: Joi.string().trim().uppercase().required(),
        addressPresent2: Joi.string().trim().uppercase().required(),
        presPincode: Joi.number().max(999999).required(),
        addressPermnt1: Joi.string().trim().uppercase().required(),
        addressPermnt2: Joi.string().trim().uppercase().required(),
        perPincode: Joi.number().max(999999).required(),
        blood_slno: Joi.number().min(1).required(),
})

// VALIDATE EMPLOYEE MASTER EDIT
const validateempmasterEdit = Joi.object({
        em_no: Joi.number().required(),
        em_id: Joi.number().optional(),
        em_salutation: Joi.number().min(1).required(),
        em_name: Joi.string().trim().uppercase().required().max(60),
        em_gender: Joi.number().min(1).required(),
        em_dob: Joi.date().required(),
        em_age_year: Joi.number().optional(),
        em_age_month: Joi.number().optional(),
        em_age_day: Joi.number().optional(),
        em_doj: Joi.date().required(),
        hrm_religion: Joi.number().min(1).required(),
        em_mobile: Joi.number().max(999999999999).required(),
        em_phone: Joi.optional(),
        em_email: Joi.string().email().optional(),
        em_region: Joi.number().min(1).required(),
        hrm_region2: Joi.number().min(1).required(),
        em_branch: Joi.number().min(1).required(),
        contractflag: Joi.number().required(),
        em_department: Joi.number().min(1).required(),
        em_dept_section: Joi.number().min(1).required(),
        em_institution_type: Joi.number().min(1).required(),
        em_designation: Joi.number().min(1).required(),
        em_doc_type: Joi.optional(),
        em_category: Joi.number().min(1).required(),
        em_prob_end_date: Joi.date().optional(),
        em_conf_end_date: Joi.date().optional(),
        em_retirement_date: Joi.date().optional(),
        em_contract_end_date: Joi.date().optional(),
        em_status: Joi.number().min(1).required(),
        edit_user: Joi.number().required(),
        create_date: Joi.date().optional(),
        addressPresent1: Joi.string().trim().uppercase().required(),
        addressPresent2: Joi.string().trim().uppercase().required(),
        presPincode: Joi.number().max(999999).required(),
        addressPermnt1: Joi.string().trim().uppercase().required(),
        addressPermnt2: Joi.string().trim().uppercase().required(),
        perPincode: Joi.number().max(999999).required(),
        blood_slno: Joi.number().min(1).required(),
})
// VALIDATE EMPLOYEupdate
const validateempmasterupdate = Joi.object({
        em_no: Joi.number().required(),
        em_id: Joi.number().required(),
        emp_dob: Joi.date().required(),
        emp_yeargae: Joi.number().optional(),
        em_age_month: Joi.number().optional(),
        em_age_day: Joi.number().optional(),
        em_religion: Joi.number().min(1).required(),
        em_cont_mobile: Joi.number().min(10).required(),
        em_cont_phone: Joi.number().optional().integer().min(0).allow(null),
        em_email: Joi.string().email().required(),
        em_region: Joi.number().min(1).required(),
        hrm_region2: Joi.number().min(1).required(),
        create_user: Joi.number().optional(),
        em_per_address1: Joi.string().trim().uppercase().required(),
        em_per_address2: Joi.string().trim().uppercase().required(),
        em_per_pincode: Joi.number().required(),
        em_pmnt_address1: Joi.string().trim().uppercase().required(),
        em_pmnt_address2: Joi.string().trim().uppercase().required(),
        em_pmnt_pincode: Joi.number().required(),
        em_bloodgroup: Joi.number().min(1).required(),
        em_passport_no: Joi.optional(),
        em_pan_no: Joi.optional(),
        em_adhar_no: Joi.number().optional(),
        em_license_no: Joi.optional(),
        em_bank: Joi.optional(),
        em_account_no: Joi.number().optional(),
        em_ifsc: Joi.optional(),
        em_maritalstatus: Joi.number().min(1).required(),

})

// VALIDATE EMPLOYEE CONTRACT DETAILS
const validateempcontract = Joi.object({
        em_no: Joi.number().required(),
        em_id: Joi.number().required(),
        em_cont_start: Joi.date().optional(),
        em_cont_end: Joi.date().optional(),
        em_cont_compl_status: Joi.string().optional().max(1),
        em_cont_renew: Joi.string().max(1).optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        create_date: Joi.date().optional(),
        update_date: Joi.date().optional(),
        em_cont_renew_date: Joi.date().optional(),
        em_cont_close: Joi.string().max(1).optional(),
        em_cont_close_date: Joi.date().optional(),
        old_emno: Joi.date().optional(),
        changed_date: Joi.date().optional()


})

// VALIDATE EMPOLYEE EARN AND DEDUCTION
const validateearndeduction = Joi.object({
        em_no: Joi.number().optional(),
        em_id: Joi.number().optional(),
        em_salary_desc: Joi.number().min(1).required(),
        em_earning_type: Joi.number().min(1).optional(),
        em_amount: Joi.number().required(),
        em_start_date: Joi.date().required(),
        em_end_date: Joi.date().required(),
        em_status: Joi.string().max(1).optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        ernded_slno: Joi.number().optional(),
        last_wage: Joi.number().optional(),
        new_wage: Joi.number().optional(),

});

// VALIDATE EMPLOYEE EXPERIENCE DETAILS
const validateempexperience_ = Joi.object({
        em_no: Joi.number().optional(),
        em_id: Joi.number().required(),
        em_institution: Joi.string().max(45).required(),
        em_designation: Joi.number().required(),
        em_from: Joi.date().optional(),
        em_to: Joi.date().optional(),
        em_total_year: Joi.number().optional(),
        em_salary: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        emexp_slno: Joi.number().optional(),
        tmch_exp: Joi.number().optional()
})

// VALIDATE EMPLOYEE EXPERIENCE DETAILS
const validatesalaryIncrement = Joi.object({
        em_no: Joi.number().optional(),
        em_id: Joi.number().optional(),
        incr_start_date: Joi.date().required(),
        em_salary_desc: Joi.number().required(),
        incre_type: Joi.number().max(1).required(),
        incre_amount: Joi.number().required(),
        last_amount: Joi.number().optional(),
        incre_process_status: Joi.string().optional(),
        incre_process_date: Joi.number().optional(),
        incre_process_user: Joi.number().optional(),
        incre_last_changed_date: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        incre_slno: Joi.number().optional()
})

// VALIDATE EMPLOYEE PERSIONAL DETAILS
const validateeemployeepersonal = Joi.object({
        em_no: Joi.number().required(),
        em_id: Joi.number().required(),
        em_per_address1: Joi.string().max(125).required(),
        em_per_address2: Joi.string().max(125).required(),
        em_per_address3: Joi.string().optional(),
        em_per_pincode: Joi.string().max(10),
        em_pmnt_address1: Joi.string().max(125).required(),
        em_pmnt_address2: Joi.string().max(125).required(),
        em_pmnt_address3: Joi.string().optional(),
        em_pmnt_pincode: Joi.string().max(10),
        em_passport_no: Joi.optional(),
        em_pan_no: Joi.optional(),
        em_adhar_no: Joi.number().max(999999999999).required(),
        em_license_no: Joi.optional(),
        //em_nationality: Joi.number().optional(),
        em_religion: Joi.number().required(),
        em_bloodgroup: Joi.number().min(1).required(),
        em_maritalstatus: Joi.number().min(1).required(),
        em_spouse_guardian: Joi.string().optional(),
        em_cont_mobile: Joi.number().min(10).required(),
        em_cont_phone: Joi.number().optional().integer().min(0).allow(null),
        //em_notice_period: Joi.number().optional(),
        em_pers_remarks: Joi.string().max(45).optional(),
        em_bank: Joi.optional(),
        em_account_no: Joi.optional(),
        em_ifsc: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        emper_slno: Joi.number().optional(),
        emp_dob: Joi.date().required(),
        em_email: Joi.string().email().required(),
        emp_yeargae: Joi.number().optional(),
        em_region: Joi.number().min(1).required(),
        hrm_region2: Joi.number().min(1).required()
})

// VALIDATE EMPLOYEE ESI AND PF
const validateempesipf = Joi.object({
        esi_slno: Joi.number().optional(),
        em_no: Joi.number().optional(),
        em_id: Joi.number().optional(),
        em_pf_status: Joi.number().required().max(1),
        em_pf_no: Joi.number().optional(),
        em_uan_no: Joi.string().optional(),
        em_esi_status: Joi.number().required().max(1),
        em_esi_no: Joi.number().optional(),
        em_grade: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATE EMPOYEE QUALIFICATION
const validateempqualification = Joi.object({
        em_no: Joi.number().optional(),
        em_id: Joi.number().optional(),
        em_education: Joi.number().min(1).required(),
        em_course: Joi.optional(),
        em_specialization: Joi.optional(),
        em_univ_institute: Joi.optional(),
        em_board: Joi.optional(),
        em_year: Joi.date().required(),
        em_mark_grade: Joi.optional(),
        em_reg_type: Joi.optional(),
        em_reg_no: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        emqual_slno: Joi.number().optional(),
        em_exp_date: Joi.optional(),
        em_chellan: Joi.optional(),
        em_chellan_exp_date: Joi.optional(),
        pass_fail: Joi.optional()
})

// VALIDATE COURSE
const validatecourse = Joi.object({
        cour_desc: Joi.string().max(100).required().uppercase().trim(),
        edu_slno: Joi.number().max(99999).required().required(),
        cour_status: Joi.number().max(1.).required(),
        cour_slno: Joi.number().optional(),
        cour_created: Joi.number().max(999999999).optional(),
        cour_edit: Joi.number().max(999999999).optional(),
})

// VALIDATE EDUCATION
const validateeducation = Joi.object({
        edu_desc: Joi.string().max(45).required().uppercase().trim(),
        edu_status: Joi.number().max(1).required(),
        edu_create: Joi.number().max(999999999).optional(),
        edu_slno: Joi.number().optional(),
        edu_edit: Joi.number().optional()
})

//SPECIALIZATION 
const validatespecialization = Joi.object({
        spec_desc: Joi.string().max(200).uppercase().trim().required(),
        cour_slno: Joi.number().required(),
        spec_status: Joi.number().required(),
        spec_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATION MODULE GROUP MASTER
const validatemodulegroupmaster = Joi.object({
        module_group_name: Joi.string().max(45).trim().uppercase().required(),
        module_slno: Joi.optional(),
        mdgrp_slno: Joi.number().optional()
})
// VALIDATE STATE
const validatestate = Joi.object({
        state_name: Joi.string().required().trim().uppercase(),
        state_nat_slno: Joi.number().required(),
        state_status: Joi.number().required(),
        state_slno: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// user Gorup Master
const validateUserGroup = Joi.object({
        user_group_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'UserGroup Name is Required',
                        'string.min': 'UserGroup Name length must be at least 3 characters long',
                        'string.max': 'UserGroup Name length must be less than or equal to 45 characters long'
                }),
        user_group_status: Joi.number().max(1),
        user_grp_slno: Joi.optional()
});

//validation Fine deduction master
const validatefineded = Joi.object({
        fine_desc: Joi.string().required().trim().uppercase(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),

})

//Validation employee fine deduction master
const validatefinededuction = Joi.object({
        fine_slno: Joi.number().optional(),
        fine_emp_no: Joi.number().optional(),
        fine_emp_id: Joi.number().optional(),
        fine_type: Joi.number().min(1).required(),
        fine_descp: Joi.string().required(),
        fine_amount: Joi.number().required(),
        fine_status: Joi.number().optional(),
        fine_start: Joi.date().required(),
        fine_end: Joi.date().required(),
        fine_period: Joi.number().required(),
        fine_remark: Joi.string().required(),
        fine_create_user: Joi.number().optional(),
        fine_edit_user: Joi.number().optional(),
})

//validation company details updation in employee master
validateempmastercompanyupdate = Joi.object({
        em_branch: Joi.number().required(),
        em_department: Joi.number().required(),
        em_dept_section: Joi.number().required(),
        em_institution_type: Joi.number().required(),
        em_category: Joi.number().required(),
        em_no: Joi.number().required(),
        com_category: Joi.number().required(),
        com_category_new: Joi.number().required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        em_id: Joi.number().optional(),

})
// VALIDATION Departmentshiftmaster
const validatedepartmentshiftmaster = Joi.object({
        dept_id: Joi.number().required(),
        sect_id: Joi.number().required(),
        shft_code: Joi.optional(),
        dept_shift_Slno: Joi.number().optional(),
        updated_user: Joi.number().optional()
})

//Validate leave request Type master
const validateleaverequest = Joi.object({
        lrequest_type: Joi.string().required().trim().uppercase(),
        lrequest_status: Joi.number().required(),
        lrequest_short: Joi.string().trim().uppercase().required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        lrequest_slno: Joi.number().optional()
})

//validation for OT Request
const validateotrequest = Joi.object({
        ot_slno: Joi.number().optional(),
        ot_date: Joi.date().required(),
        emp_id: Joi.number().required(),
        em_no: Joi.number().optional(),
        ot_days: Joi.date().required(),
        ot_shift_id: Joi.number().optional(),
        check_in: Joi.date().required(),
        check_out: Joi.date().required(),
        over_time: Joi.number().optional(),
        ot_convert: Joi.number().optional(),
        ot_reson: Joi.string().required(),
        ot_remarks: Joi.string().required(),
        ot_amount: Joi.number().required(),
        ot_inch_require: Joi.number().required(),
        ot_hod_require: Joi.number().required(),
        ot_hr_require: Joi.number().required(),
        ot_ceo_require: Joi.number().required(),
        ot_deptsec_id: Joi.number().required(),
        duty_day: Joi.optional(),

})
//Validation for OT update
const validateotrequestupdate = Joi.object({
        ot_reson: Joi.string().required(),
        ot_remarks: Joi.string().required(),
        ot_slno: Joi.number().required(),
})
//validate board under education
const validateboard = Joi.object({
        board_name: Joi.string().max(45).required().uppercase().trim(),
        education_slno: Joi.number().max(99999).required().required(),
        board_status: Joi.number().max(1.).required(),
        board_slno: Joi.number().optional(),
        create_user: Joi.number().max(999999999).optional(),
        edit_user: Joi.number().max(999999999).optional(),
})

//valiodation for authorization
const validateauthorization = Joi.object({
        dept_section: Joi.number().min(1).required(),
        auth_post: Joi.number().min(1).required(),
        dept_section_post: Joi.number().min(1).required(),
        emp_id: Joi.number().required(),
        create_user: Joi.number().optional(),
        create_date: Joi.date().optional(),
        auth_slno: Joi.number().optional(),

})

//Validate Resignation Request

const validateResignationRequest = Joi.object({
        dept_id: Joi.number().min(1).required(),
        sect_id: Joi.number().min(1).required(),
        em_id: Joi.number().min(1).required(),
        em_no: Joi.number().min(1).required(),
        designation: Joi.number().min(1).required(),
        resignation_type: Joi.number().min(1).required(),
        request_date: Joi.date().required(),
        relieving_date: Joi.date().required(),
        resign_reason: Joi.string().required(),
        notice_period: Joi.number().optional(),
        incharge_required: Joi.number().optional(),
        hod_required: Joi.number().optional(),
        ceo_required: Joi.number().optional(),
})
const validateResignationRequestApproval = Joi.object({
        em_id: Joi.number().min(1).optional(),
        designation: Joi.number().min(1).optional(),
        resign_status: Joi.string().optional(),
        resign_cancel: Joi.string().optional(),
        hr_id: Joi.number().optional(),
        hr_app_date: Joi.date().optional(),
        hr_app_status: Joi.number().optional(),
        hr_coment: Joi.string().optional(),
        notice_period: Joi.number().optional(),
        incharge_required: Joi.number().optional(),
        hod_required: Joi.number().optional(),
        ceo_required: Joi.number().optional(),
        resig_slno: Joi.number().optional(),
})
const validateResignationRequestApprovalINcharge = Joi.object({
        em_id: Joi.number().min(1).optional(),
        designation: Joi.number().min(1).optional(),
        inch_id: Joi.number().optional(),
        inch_app_date: Joi.date().optional(),
        inch_app_status: Joi.number().optional(),
        inch_coment: Joi.string().optional(),
        resig_slno: Joi.number().optional(),
        replacement_required_incharge: Joi.number().optional(),
})
const validateResignationRequestApprovalHOD = Joi.object({
        em_id: Joi.number().min(1).optional(),
        designation: Joi.number().min(1).optional(),
        hod_id: Joi.number().required(),
        hod_app_date: Joi.date().required(),
        hod_app_status: Joi.number().required(),
        hod_coment: Joi.string().required(),
        resig_slno: Joi.number().optional(),
        replacement_required_hod: Joi.number().optional(),
})
const validateResignationRequestApprovalCEO = Joi.object({
        ceo_id: Joi.number().required(),
        ceo_appr_date: Joi.date().required(),
        ceo_appr_status: Joi.number().required(),
        ceo_comment: Joi.string().required(),
        resig_slno: Joi.number().optional(),
})
const validateResignationRequestApprovalHR = Joi.object({
        hr_id: Joi.number().required(),
        hr_app_date: Joi.date().required(),
        hr_app_status: Joi.number().required(),
        hr_coment: Joi.string().required(),
        resign_status: Joi.string().required(),
        em_id: Joi.number().min(1).optional(),
        resig_slno: Joi.number().optional(),
        dept_id: Joi.number().optional(),
        sect_id: Joi.number().optional(),
        em_id: Joi.number().optional(),
        em_no: Joi.number().optional(),
        designation: Joi.number().optional(),
        resignation_type: Joi.number().optional(),
        request_date: Joi.date().optional(),
        relieving_date: Joi.date().optional(),
        resign_reason: Joi.string().optional(),
        contract_close_resign: Joi.string().optional(),
})
const validateResignationRequestCancel = Joi.object({
        resign_cancel: Joi.string().required(),
        resign_cancel_reason: Joi.string().required(),
        cancel_user: Joi.number().required(),
        resign_cancel_date: Joi.date().required(),
        resig_slno: Joi.number().optional(),

})
const validatecoassign = Joi.object({
        co_slno: Joi.number().optional(),
        emp_id: Joi.number().required(),
        co_assign: Joi.number().required(),
        create_user: Joi.number().optional(),

})

//Validation For OT Incharge Approval
const validateotincharge = Joi.object({
        ot_inch_status: Joi.number().required(),
        ot_inch_remark: Joi.string().required(),
        ot_inch_user: Joi.number().required(),
        ot_slno: Joi.number().required(),
        ot_coff_type: Joi.number().required(),
        ot_time: Joi.number().optional(),
        emp_id: Joi.number().optional(),
        ot_status: Joi.number().optional(),
        ot_new_time: Joi.number().optional(),
})

//Validation For OT HOD Approval
const validateothod = Joi.object({
        ot_hod_status: Joi.number().required(),
        ot_hod_remark: Joi.string().required(),
        ot_hod_user: Joi.number().required(),
        ot_slno: Joi.number().required(),
        ot_coff_type: Joi.number().required(),
        ot_time: Joi.number().optional(),
        emp_id: Joi.number().optional(),
        ot_status: Joi.number().optional(),
        ot_new_time: Joi.number().optional(),
})

//Validation For OT HR Approval
const validateothr = Joi.object({
        ot_hr_status: Joi.number().required(),
        ot_hr_remark: Joi.string().required(),
        ot_hr_user: Joi.number().required(),
        ot_slno: Joi.number().required(),
        ot_coff_type: Joi.number().required(),
        ot_time: Joi.number().optional(),
        emp_id: Joi.number().optional(),
        ot_status: Joi.number().optional(),
        ot_new_time: Joi.number().optional(),
})

//Validation For OT CEO Approval
const validateotceo = Joi.object({
        ot_ceo_status: Joi.number().required(),
        ot_ceo_remark: Joi.string().required(),
        ot_ceo_user: Joi.number().required(),
        ot_slno: Joi.number().required(),
        ot_coff_type: Joi.number().required(),
        ot_time: Joi.number().optional(),
        emp_id: Joi.number().optional(),
        ot_status: Joi.number().optional(),
        ot_new_time: Joi.number().optional(),
})

// VALIDATION DUE CLEARENCE DEPARTMENT
const validatedepartmentdueclearencedept = Joi.object({
        dept_id: Joi.number().required(),
        sect_id: Joi.number().required(),
        due_dept_code: Joi.optional(),
        due_dept_slno: Joi.number().optional(),
        updated_user: Joi.number().optional()
})

//VALIDATION OF OT WAGE  UPDATE IN dept section wise

const validateotwage = Joi.object({
        emp__ot: Joi.number().required(),
        ot_amount: Joi.number().required(),
        em_dept_section: Joi.number().optional(),
})

// validation due clearence insert
const validateDueClearence = Joi.object({
        due_dept_status: Joi.string().required(),
        due_dept_comment: Joi.string().required(),
        approved_date: Joi.date().optional(),
        approved_user: Joi.number().optional(),
        charge_handover_emp: Joi.optional(),
        due_slno: Joi.number().optional(),
})
//VALIDATION OF OT WAGE UPDATE IN employee
const validateotwageone = Joi.object({
        emp__ot: Joi.number().required(),
        ot_amount: Joi.number().required(),
        em_id: Joi.number().required(),
})
//validate due clearence Master
const validatedueClearenceMaster = Joi.object({
        duemast_slno: Joi.number().optional(),
        due_desc: Joi.string().required(),
        due_shortname: Joi.string().required(),
        due_status: Joi.required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

const validateinsertLeaveCalculation = Joi.object({
        emp_id: Joi.number().required(),
        lvetype_slno: Joi.number().required(),
        credited: Joi.number().required(),
        dept_id: Joi.number().optional(),
        ot_slno: Joi.number().optional(),
        ot_coff_slno: Joi.number().optional(),
        applied_cl: Joi.number().optional(),
        ot_inch_status: Joi.number().required(),
        ot_inch_remark: Joi.string().required(),
        ot_slno: Joi.number().required(),
        ot_coff_type: Joi.number().required(),
        ot_time: Joi.number().optional(),
        emp_id: Joi.number().optional(),
        ot_status: Joi.number().optional(),
})
const validatecoffupdate = Joi.object({
        emp_id: Joi.number().required(),
        ot_coff_slno: Joi.number().optional(),
        ot_time: Joi.number().optional(),
        applied_cl: Joi.number().optional(),
})

const validationinchageapprv = Joi.object({
        status: Joi.number().required(),
        comment: Joi.string().required(),
        slno: Joi.number().required(),
        apprvdate: Joi.date().required(),
        us_code: Joi.number().optional(),
        lve_uniq_no: Joi.number().optional(),

})
const validateotcancel = Joi.object({
        ot_status: Joi.number().required(),
        ot_cancel_reason: Joi.string().required(),
        ot_cancel_date: Joi.date().required(),
        ot_cancel_user: Joi.number().required(),
        ot_slno: Joi.number().optional(),
})
//validate common settings
const validatecommonsettings = Joi.object({
        cmmn_grace_period: Joi.number().optional(),
        cmmn_late_in: Joi.number().optional(),
        cmmn_early_out: Joi.number().optional(),
        cmmn_late_in_grace: Joi.number().optional(),
        cmmn_early_out_grace: Joi.number().optional(),
        carry_hl: Joi.number().optional(),
        carry_cl: Joi.number().optional(),
        carry_el: Joi.number().optional(),
        carry_sl: Joi.number().optional(),
        min_salary: Joi.number().optional(),
        max_salary: Joi.number().optional(),
        pf_age: Joi.number().optional(),
        pf_employee: Joi.number().precision(2).optional(),
        pf_employer: Joi.number().precision(2).optional(),
        esi_limit: Joi.number().optional(),
        esi_employee: Joi.number().precision(2).optional(),
        esi_employer: Joi.number().precision(2).optional(),
        creat_user: Joi.number().optional(),
        update_user: Joi.number().optional(),
        setting_slno: Joi.number().optional(),
        noofadvanceinyear: Joi.number().optional(),
        verification_level: Joi.number().optional(),
        notapplicable_shift: Joi.number().optional(),
        default_shift: Joi.number().optional(),
})
//validate carryforward
const validatecarryforward = Joi.object({
        dept_sec: Joi.number().required(),
        emp_type: Joi.number().required(),
        carry_hl: Joi.number().required(),
        carry_cl: Joi.number().required(),
        carry_el: Joi.number().required(),
        carry_sl: Joi.number().required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        carry_slno: Joi.number().optional(),
})
const validateAlert = Joi.object({
        alert: Joi.string().required(),
        alert_expr_date: Joi.date().required(),
        alert_branch: Joi.number().optional(),
        alert_department: Joi.number().optional(),
        aler_deptsec: Joi.number().optional(),
        emp_category: Joi.number().optional(),
        designation: Joi.number().optional(),
        create_date: Joi.date().optional(),
        create_user: Joi.number().optional(),
})
const validateMessage = Joi.object({
        message_deptsec: Joi.number().required(),
        message_dept: Joi.number().required(),
        emp_id: Joi.number().required(),
        message: Joi.string().optional(),
        created_date: Joi.date().optional(),
        expr_date: Joi.date().required(),
        created_user: Joi.number().optional(),
})
//validate proffessional Tax against Employee
const validatempprotax = Joi.object({
        pro_emp_id: Joi.number().required(),
        pro_emp_no: Joi.number().required(),
        pro_emp_name: Joi.string().required(),
        pro_gross_salary: Joi.number().required(),
        pro_tax: Joi.number().required(),
        pro_tax_date: Joi.date().optional(),
});
//validate proffessional Tax against Employee
const validateadvanceSettings = Joi.object({
        adv_settings_Slno: Joi.number().optional(),
        service_from: Joi.number().optional(),
        service_to: Joi.number().optional(),
        adv_eligibility: Joi.string().optional(),
        monthly_installments: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});
//validate advance Request
const validateAdvanceRequest = Joi.object({
        advance_id: Joi.number().required(),
        em_id: Joi.number().required(),
        em_no: Joi.number().required(),
        dept_id: Joi.number().required(),
        dept_sect: Joi.number().required(),
        requested_amount: Joi.number().required(),
        allowable_amount: Joi.number().optional(),
        noof_installment: Joi.number().required(),
        incharge_level: Joi.number().required(),
        hod_level: Joi.number().required(),
        ceo_level: Joi.number().required(),
        adv_req_date: Joi.date().required(),
})
const validationPerformanceGrade = Joi.object({
        p_score: Joi.string().required(),
        p_grade: Joi.number().required(),
        p_descrption: Joi.number().required(),
        fixed_pay_inc: Joi.number().required(),
        variable_pay_inc: Joi.number().required(),
        p_status: Joi.number().min(0).max(1),
        pgrade_slno: Joi.number().optional()
})


// VALIDATION PerformanceAppraisalRights
const validatePerformanceAppraisalRights = Joi.object({
        dept_id: Joi.number().required(),
        em_id: Joi.number().required(),
        rights_needed: Joi.optional(),
        p_rights_slno: Joi.number().optional()
})


const validateKRA = Joi.object({
        kra_desc: Joi.string().required(),
        kra_status: Joi.number().min(0).max(1),
        kra_slno: Joi.number().required(),
});


module.exports = {
        authSchema,  //authSchema:authSchema
        validateEmployee,
        validateBranch,
        validateDepartment,
        validateSection,
        validateUserGroup,
        validateMenuName,
        validateGroupAssign,
        validateInstitutionType,
        validateEmployeeType,
        validateEmployeeStatus,
        validateDesignation,
        validateBankMaster,
        validateQualification,
        validateSpecialized,
        validateRegion,
        validateunivercity,
        validationEmployment,
        validatebloodgroup,
        validateGradeMast,
        validatedistrict,
        validateearnings,
        validateempcategory,
        validateregistraiontype,
        validateprofessionaltax,
        validateshiftmaster,
        validateyearlyholidaylist,
        validateyearyleaves,
        validateleavetype,
        validatedoctype,
        validatereligion,
        validateempmaster,
        validateempmasterupdate,
        validateempcontract,
        validateearndeduction,
        validateempexperience_,
        validateeemployeepersonal,
        validateempesipf,
        validateempqualification,
        validatecourse,
        validateeducation,
        validatespecialization,
        validatemodulegroupmaster,
        validatestate,
        validateEarnMast,
        validatefineded,
        validatefinededuction,
        validatesalaryIncrement,
        validateempmastercompanyupdate,
        validatedepartmentshiftmaster,
        validateleaverequest,
        validateotrequest,
        validateotrequestupdate,
        validateboard,
        validateauthorization,
        validateResignationRequest,
        validatecoassign,
        validateResignationRequestApproval,
        validateotincharge,
        validateResignationRequestApprovalHOD,
        validateothod,
        validateothr,
        validateResignationRequestApprovalCEO,
        validateResignationRequestApprovalINcharge,
        validateResignationRequestApprovalHR,
        validateotceo,
        validateResignationRequestCancel,
        validatedepartmentdueclearencedept,
        validateotwage,
        validateDueClearence,
        validateotwageone,
        validatedueClearenceMaster,
        validateinsertLeaveCalculation,
        validatecoffupdate,
        validationinchageapprv,
        validateotcancel,
        validatecommonsettings,
        validatecarryforward,
        validateAlert,
        validateMessage,
        validatempprotax,
        validateadvanceSettings,
        validateAdvanceRequest,
        validateempmasterEdit,
        validationPerformanceGrade,
        validatePerformanceAppraisalRights,
        validateKRA
}