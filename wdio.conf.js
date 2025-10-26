require('ts-node').register({ transpileOnly: true });

exports.config = {
  runner: 'local',

  specs: ['./features/**/*.feature'],
  exclude: [],

  maxInstances: 1,

capabilities: [{
  browserName: 'chrome',
  acceptInsecureCerts: true,
  'goog:chromeOptions': {
    args: ['--start-maximized', '--disable-dev-shm-usage']
  },
  'wdio:chromedriverOptions': {
    disableBidi: true     //  disable BiDi to use classic WebDriver
  }
}],



  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://www.medavie.ca/',
  waitforTimeout: 30000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'cucumber',
reporters: [
  'spec',
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
    addConsoleLogs: true,
    useCucumberStepReporter: true,
  }],
],

  cucumberOpts: {
    require: ['./stepDefinitions/**/*.js'],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },

  afterStep: async function (step, scenario, { error }) {
  if (error) {
    await browser.takeScreenshot();
  }
},

onPrepare: function (config, capabilities) {
  console.log('Starting test execution...');
},

onComplete: function (exitCode, config, capabilities, results) {
  console.log('Tests finished. Generating Allure report...');
  const { execSync } = require('child_process');
  try {
    execSync('npx allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });
  } catch (err) {
    console.error('Failed to generate Allure report automatically. Run manually with:');
    console.error('npx allure generate allure-results --clean -o allure-report');
  }
},
};
