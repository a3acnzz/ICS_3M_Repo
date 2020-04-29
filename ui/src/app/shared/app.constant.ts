export const AppConstant = {

  TEST_USER_NAME: 'testUser',
  ENV_DEV: 'dev',
  ENV_QA: 'qa',
  ENV_STAGING: 'stage',
  ENV_PROD: 'production',
  ENV_DEVELOPMENT: 'development',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_PROGRAM_OWNER: 'ROLE_PROGRAM_OWNER',

  // SSO
  NotAuthorizedUrl: '/unauthorized',
  MaintenanceUrl: '/down-maintenance',
  loginUrl: 'api/login',
  COOKIE_USER_NAME: 'USER_NAME',
  AUTHORIZATION_TYPE: 'Bearer ',
  LOGIN_MESSAGE: 'Logging in, please wait...',

  // Table pagination settings
  rowsPerPageDefault: 10,
  rowsPerPageOptions: [10, 20, 50, 100],

  // Date and Time Formats
  fullDateFormat: 'dddd, MMMM Do, YYYY', // e.g. Tuesday, October 10th, 2017
  angularFullDateFormat: 'dddd, MMMM D, YYYY', // e.g. Tuesday, October 10, 2017
  displayTimeFormat: 'hh:mm A', // e.g. 05:00 PM
  timeFormat: 'HH:mm:ss', // e.g. 17:00:00

  // ICS user
  userSearch: 'icsUser/search',

  // SignUp user
  signUpUserSearch: 'signUpUser/search',
  getSignUpUser: 'signUpUser/getUser',

  // bcc email
  bccEmailSearch: 'bccEmail/search',
  saveBccEmail: 'bccEmail/save',

  // email template
  emailTemplateSearch: 'emailTemplate/search',
  saveEmailTemplate: 'emailTemplate/save',
  emailTypeConfirm: 'Confirmation',
  emailTypeCancel: 'Cancellation',

  // announcement
  announcementSearch: 'announcement/search',
  saveAnnouncement: 'announcement/save',

  // contactUs
  contactUsSearch: 'contactUs/search',
  saveContactUs: 'contactUs/save',

  // location
  getLocation: 'location/getLocation',
  getLocationByCode: 'location/getLocationByCode',
  getTimeZones: 'location/getTimeZones',
  saveLocation: 'location/save',
  getSignUpLocations: 'location/getSignUpLocations',
  getProgramOwnerLocations: 'location/getProgramOwnerLocations',
  getAdminLocations: 'location/getAdminLocations',

  // admin users
  getAdminUserList: 'icsUser/getAdminUserList',
  saveAdminUserList: 'icsUser/saveAdminUserList',

  // program owners
  programOwnerSearch: 'programOwner/search',
  programOwnerLocationPrograms: 'programOwner/locationPrograms',
  programOwnerGetProgram: 'programOwner/getProgram',
  programOwnerGetProgramAppointments: 'programOwner/getProgramAppointments',

  // program
  programSearch: 'program/search',
  saveProgram: 'program/save',

  // program date
  getProgramDates: 'programDate/getProgramDates',
  increaseProgramDateMaxAppointments: 'programDate/increaseMaxAppointments',
  decreaseProgramDateMaxAppointments: 'programDate/decreaseMaxAppointments',
  cancelProgramDate: 'programDate/cancel',

  // time slot
  getTimeSlots: 'timeSlot/getTimeSlots',
  increaseTimeSlotMaxAppointments: 'timeSlot/increaseMaxAppointments',
  decreaseTimeSlotMaxAppointments: 'timeSlot/decreaseMaxAppointments',
  cancelTimeSlot: 'timeSlot/cancel',
  getAppointmentCounts: 'timeSlot/getAppointmentCounts',
  isTimeSlotFull: 'timeSlot/isTimeSlotFull',

  // appointment
  saveAppointments: 'appointment/save',
  getPendingAppointments :'appointment/getPendingAppointments',
  clearPendingAppointment: 'appointment/clearPendingAppointment',
  managePendingAppointment: 'appointment/managePendingAppointment',
  getUserAppointments: 'appointment/getUserAppointments',
  cancelAppointment: 'appointment/cancel',
  rescheduleAppointment: 'appointment/reschedule',
  getAppointment: 'appointment/getAppointment',
  validateAppointments: 'appointment/validateAppointments',
  validateTimeSlots: 'appointment/validateTimeSlots',
};
