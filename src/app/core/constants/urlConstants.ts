export const urlConstants = {
    API_URLS:{
        // CREATE_ACCOUNT:"/user/v1/account/create",
        // ACCOUNT_LOGIN:"/user/v1/account/login",
        // LOGOUT_ACCOUNT:"/user/v1/account/logout",
        REFRESH_TOKEN:"/dsep-user/v1/account/generateToken",
        TERMS_CONDITIONS:"/dsep-user/v1/account/acceptTermsAndCondition",
        PROFILE_UPDATE:"/dsep-user/v1/profile/update",
        PROFILE_DETAILS: "/dsep-user/v1/profile/details",
        MENTOR_PROFILE_DETAILS: "/dsep-mentoring/v1/mentors/profile/",
        MENTEE_PROFILE_DETAILS:"/dsep-mentoring/v1/mentees/profile/",
        MENTORS_DIRECTORY:"/dsep-user/v1/mentors/list?page=",
        FILE_UPLOAD:"/dsep-user/v1/cloud-services/file/upload",
        SESSIONS:"/dsep-mentoring/v1/mentees/sessions?enrolled=", //sessions?enrolled=true/false&page=1&limit=5&search=:search
        HOME_SESSION:"/dsep-mentoring/v1/mentees/homeFeed?page=", ///v1/mentees/homefeed?page=1&limit=4
        GET_IMAGE_UPLOAD_URL:'/dsep-user/v1/cloud-services/file/getSignedUrl?fileName=',
        GET_SESSION_IMAGE_UPLOAD_URL:"/dsep-mentoring/v1/cloud-services/getSignedUrl?fileName=",
        SUBMIT_FEEDBACK:"/dsep-mentoring/v1/feedback/submit/",
        UPCOMING_SESSIONS:"/dsep-mentoring/v1/mentors/upcomingSessions/",
        SHARE_MENTOR_PROFILE:"/dsep-mentoring/v1/mentors/share/",
        REPORT_ISSUE:"/dsep-mentoring/v1/issues/create",
        
        // FORMS
        FORM_READ:'/dsep-mentoring/v1/form/read',
        GENERATE_OTP:"/dsep-user/v1/account/generateOtp",
        REGISTRATION_OTP:"/dsep-user/v1/account/registrationOtp",
        RESET_PASSWORD:"/dsep-user/v1/account/resetPassword",
        CREATE_SESSION:"/dsep-mentoring/v1/sessions/update",
        GET_SESSIONS_LIST:"/dsep-mentoring/v1/sessions/list?page=",
        GET_SESSION_DETAILS:"/dsep-mentoring/v1/sessions/details/",
        GET_SHARE_SESSION_LINK:"/dsep-mentoring/v1/sessions/share/",
        ENROLL_SESSION:"/dsep-mentoring/v1/sessions/enroll/",
        UNENROLL_SESSION:"/dsep-mentoring/v1/sessions/unEnroll/",
        START_SESSION:"/dsep-mentoring/v1/sessions/start/",
        JOIN_SESSION:"/dsep-mentoring/v1/mentees/joinSession/",
        MENTOR_REPORTS:"/dsep-mentoring/v1/mentors/reports?filterType=",
        MENTEE_REPORTS:"/dsep-mentoring/v1/mentees/reports?filterType=",
        MENTOR_FEEDBACK_QUESTION_SET:"/dsep-mentoring/v1/questionsSet/read/61b867df5201107b3c2fb435",
        MENTEE_FEEDBACK_QUESTIONS_SET:"/dsep-mentoring/v1/questionsSet/read/61b8656fed665f7b5470a9f1",
        GET_FEEDBACK_QUESTION:"/dsep-mentoring/v1/questions/read/", 

        //BAP
        LOGOUT_ACCOUNT:"/dsep-user/v1/account/logout",
        ACCOUNT_LOGIN:"/dsep-user/v1/account/login",
        CREATE_ACCOUNT:"/dsep-user/v1/account/create",
        SEARCH_SESSION:"/bap/search?keyword=",
        CHECK_AVAILABILITY:"/bap/init",
        ENROLL_CONFIRM:"/bap/confirm",
        ENROLL_CANCEL:"/bap/cancel",
        USER_ENROLL_STATUS: "/bap/user-enrollment-status",
        ENROLLED_SESSIONS: "/bap/enrolled-sessions",
        GET_ORGANIZATIONS: "/dsep-user/v1/organisations/details",
        GET_ORGANIZATION_LIST: "/dsep-user/v1/organisations/list"
    }
};
