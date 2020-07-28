// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts


var setupJS = require('../../config/envConfig.js');

exports.config = {
  allScriptsTimeout: 2500000,
  specs: [
    './admin-manage-admin.e2e-spec.ts'
  ],
  multiCapabilities: [{
    'browserName': 'chrome'
  }],
  maxSessions: 1,
  directConnect: true,
  baseUrl: setupJS.getEnv(process.env.ENVIRONMENT),
  params: require ("../config/"+setupJS.getParams(process.env.ENVIRONMENT)),
  framework: 'jasmine',
  useAllAngular2AppRoots: true,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 2500000,
    print: function() {}
  },
  beforeLaunch: function() {
    require('ts-node').register({
      project: '../tsconfig.e2e.json'
    });
  }
};
