// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import {AppConstant} from '../app/shared/constant/app.constant';

export const environment = {
  production: false,
  baseURL: 'http://localhost:8080/',  
  logOutUrl: 'http://localhost:8080/',
  username: 'A6A7MZZ',
  envName: AppConstant.ENV_LOCAL,
  haltKeepAliveForE2E: true,
  logo3M: '../../../assets/img/3M-Header-Logo.png',
  Home3MUrl: 'https://skydrive3m.sharepoint.com/sites/Go/Pages/Home.aspx',
  HsUrl:   '',
  CorpHsUrl: '' ,
};
