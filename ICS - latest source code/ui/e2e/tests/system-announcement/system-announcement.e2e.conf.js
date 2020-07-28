// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  allScriptsTimeout: 2500000,
  specs: [
    './system-announcement.e2e-spec.ts'
  ],
  multiCapabilities: [{
    'browserName': 'chrome'
  }],
  maxSessions: 1,
  directConnect: true,
  baseUrl: 'http://localhost:4200',
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
