// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import {AppConstant} from '../app/shared/app.constant';

export const environment = {
  production: false,
  // baseURL: 'https://api-ics-qa.os.mmm.com/',
  baseURL: 'https://ics-qa.mmm.com/ics-app/',
  logoutUrl: 'https://wslqa.mmm.com/logout/securityLogout?urlstring=https://ics-qa.mmm.com/ics-app/logout',
  username: '',
  envName: AppConstant.ENV_QA
};
