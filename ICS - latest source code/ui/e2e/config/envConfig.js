module.exports = {

  getEnv: function (environment) {
    environment = environment || 'DEV';
    console.log(environment);
    environment = environment.toUpperCase();
    var baseUrl;
    switch (environment) {
      case 'DEV':
        baseUrl = 'http://localhost:4200';
        break;
      case 'DEVSERVER':
        baseUrl = 'https://ics-dev.mmm.com/ics-app';
        break;
      case 'QA':
        baseUrl = 'https://ics-qa.mmm.com/ics-app';
        break;
      default:
        console.log('Unknown test environment ' + environment + '. Please set ENVIRONMENT to either DEV or QA');
    }
    console.log('baseUrl : ' + baseUrl);

    return baseUrl;
  },
  getParams: function (environment) {
    return 'testData.json';
  },
  getTestUser: function () {
    if (!process.env.ENVIRONMENT || process.env.ENVIRONMENT === 'DEVSERVER' || process.env.ENVIRONMENT === 'DEV') {
      return '?testUser='+browser.params.user.username;
    }
    return '';
  }
};
