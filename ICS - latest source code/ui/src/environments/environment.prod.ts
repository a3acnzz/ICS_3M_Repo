import {AppConstant} from '../app/shared/app.constant';

export const environment = {
  production: true,
  baseURL: 'https://ics.mmm.com/ics-app/',
  logoutUrl: 'https://wsl.mmm.com/logout/securityLogout?urlstring=https://ics.mmm.com/ics-app/logout',
  envName: AppConstant.ENV_PROD,
  username: ''
};
