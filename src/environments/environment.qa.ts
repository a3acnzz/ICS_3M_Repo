import {AppConstant} from '../app/shared/constant/app.constant';
export const environment = {
  production: false,
  baseURL: 'https://erfe-qa.mmm.com/erfe/',
  logOutUrl: 'https://wsldev.mmm.com/logout/securityLogout?urlstring=https://erfe-qa.mmm.com/erfe/',
  username: '',
  envName: AppConstant.ENV_QA,
  haltKeepAliveForE2E: false,
  logo3M: '../../../assets/img/3M-Header-Logo-QA.png',
  Home3MUrl: 'https://skydrive3m.sharepoint.com/sites/Go/Pages/Home.aspx',
  HsUrl:   '',
  CorpHsUrl: '' ,
};
