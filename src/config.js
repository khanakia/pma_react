export const ROOT_HOST = 'pma.react';
export const ROOT_URL = 'http://pma.react';
export const API_HOST = 'http://pma.api';
export const API_URL = 'http://pma.api/api/v1';

// The Browser API key obtained from the Google Developers Console.
export const google_developerKey = 'AIzaSyCC08zovo1bG7VqIcazb1cNT7zEYfxv8vY';
// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
export const google_clientId = "780520116910-pkgipfh4phfao8jpc357at7n32gf6riv.apps.googleusercontent.com"
export const google_appId = "780520116910";

export const OBJECT_TYPE_PROJECT = 'project';
export const OBJECT_TYPE_FILE = 'file';
export const OBJECT_TYPE_MESSAGE = 'message';
export const OBJECT_TYPE_TASK = 'task';
export const OBJECT_TYPE_COMMENT = 'comment';

export const SIGN_UP_URL = ROOT_URL + '/#/signup';
export const FORGET_PWD_URL = ROOT_URL + '/#/forgetpwd';
export const RESET_PWD_URL = ROOT_URL + '/#/resetpwd';
export const RESET_PWD_AJAX = API_URL + '/postReset';
export const FORGET_PWD_AJAX = API_URL + '/postEmail';

// export const API_HOST_ORGS_IMAGES = API_URL + '/uploads/orgs/';
// export const API_HOST_USERS_IMAGES = API_URL + '/uploads/users/';

export const API_URL_PUBLIC = API_URL+'/public';

export const API_URL_SIGNIN = API_URL+'/auth/signin';
export const API_URL_SIGNIN_CONFIRM_ACCOUNT = API_URL+'/auth/signin_confirm_account';
export const API_URL_SIGNUP = API_URL+'/auth/signup';
export const API_URL_GETALLORGSBYEMAIL = API_URL_PUBLIC+'/findorgs_byemail';
export const API_URL_GETORG_BYDOMAIN = API_URL_PUBLIC+'/findorgs_bydomain';

export const API_URL_USER = API_URL+'/user';

export const API_URL_ORG = API_URL+'/org';
export const API_URL_ORG_SHOWCURRENT =  API_URL_ORG + '/show_current';
export const API_URL_ORG_UPDATE_CUSTOMDOMAIN_FN =  (org_id) => {return API_URL_ORG + '/' + org_id + '/update_custom_domain'};
export const API_URL_ORG_UPDATE_SUBDOMAIN_FN =  (org_id) => {return API_URL_ORG + '/' + org_id + '/update_subdomain_slug'};
export const API_URL_ORG_INVITE_USER = API_URL_ORG + '/user_invite';
export const API_URL_ORG_SWITCH = API_URL_ORG + '/switch';
export const API_URL_ORG_SETDEFAULT = API_URL_ORG + '/setdefault';
export const API_URL_ORG_LEAVE = API_URL_ORG + '/leave';


// export const API_URL_ORG_LOGO = API_URL+'/uploadlogo';
// export const API_URL_ORG_FAVICON = API_URL+'/uploadfavicon';

export const API_URL_ORGUSER = API_URL+'/org_user';


export const API_URL_CATEGORY = API_URL+'/category';

// export const API_URL_ORG_UPDATE_DOMAIN = API_URL_ORG+'/domainupdate';

// export const API_URL_USER_LOGO = API_URL+'/profileimage';

export const API_URL_UPLOAD_USER_PROFILE_IMAGE = API_URL+'/upload/user_profile_image';
export const API_URL_UPLOAD_ORG_LOGO = API_URL+'/upload/org_logo';
export const API_URL_UPLOAD_ORG_FAVICON = API_URL+'/upload/org_favicon';
export const API_URL_UPLOAD_PROJECT_LOGO = API_URL+'/upload/project_logo';
export const API_URL_UPLOAD_COMPANY_LOGO = API_URL+'/upload/company_logo';


export const API_URL_PROJECT = API_URL+'/project';
export const API_URL_PROJECT_TRASH = API_URL_PROJECT+'/trash';
export const API_URL_PROJECT_USER = API_URL+'/project_user';
// export const API_URL_PROJECT_USER_NOT_ASSIGNED = API_URL_PROJECT_USER+'/index_not_assigned';
export const API_URL_PROJECT_MESSAGE = API_URL+'/project_message';
export const API_URL_PROJECT_FILE = API_URL+'/project_file';
export const API_URL_PROJECT_FILE_VERSION = API_URL+'/project_file_version';
export const API_URL_PROJECT_FILE_GOOGLE_DRIVE_STORE = API_URL_PROJECT_FILE + '/google_drive_store';

export const API_URL_PROJECT_ACTIVITY = API_URL+'/project_activity';


export const API_URL_COMPANY = API_URL+'/company';

export const API_URL_COMMENT = API_URL+'/comment';
// export const API_URL_COMPANY_LIST = API_URL+'/company';
// export const API_URL_COMPANY_STORE = API_URL+'/company';
// export const API_URL_COMPANY_UPDATE = API_URL+'/company/update';

export const API_URL_GET_USER = API_URL+'/user/view';

export const API_URL_TASKLIST = API_URL+'/tasklist';
export const API_URL_TASKLIST_TEMPLATES = API_URL+'/tasklist_templates';

export const API_URL_TASKLIST_TASKS_FN = function(id=null) {
	return API_URL_TASKLIST+'/'+id+'/tasks';
};

export const API_URL_TASK = API_URL+'/task';

export const API_URL_TAG = API_URL+'/tag';
export const API_URL_TAG_ITEM = API_URL+'/tag_item';


export const API_URL_PLAN = API_URL+'/plan';

export const API_URL_CHANGE_PWD = API_URL+'/user/changepwd';
export const API_URL_UPDATE_USER = API_URL+'/user/update';

