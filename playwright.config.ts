import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

//ENV=qa npx playwright test (this is command to run test on specfic environment like qa)
//And below 8 line of code is to run test bydefault on QA Envirment if no ENV is passed
//And 9 line of code is to read the .env files that we provide at run time.

const ENV = process.env.ENV || "qa";
dotenv.config({path:`config/.env.${ENV}`});
console.log("Running Automation Tests on :", ENV);


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? '50%' : undefined,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: [
              ["list"],
              ["html",{ outputFolder: "reports/html-report", open: "never" }],
              ["allure-playwright",{ outputFolder: "allure-results", suiteTitle: true}],

            ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
     baseURL: process.env.BASE_URL,
     ignoreHTTPSErrors:true,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless:!process.env.CI ? false : true,
    trace: 'on-first-retry',
    screenshot:'only-on-failure',
    video:'retain-on-failure',

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

 
});
