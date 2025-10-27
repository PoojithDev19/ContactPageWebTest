
# Contact Page Automation (WebdriverIO + Cucumber)

Automated end-to-end test suite for verifying **Medavie Contact Page** in both English and French.
The framework uses **WebdriverIO (v9)**, **Cucumber BDD**, and **Node.js**.

---

## Features

BDD-style test cases using Cucumber  
Page Object Model structure (Base, Home, Contact pages)  
Multi-language support (English + French)  
URL and content validation (Contact headers, regions, phone numbers)  
Configurable environment variables (e.g., `MEDAVIE_BASE_URL`)  
Easy to extend for other Medavie web modules  

---

## Project Structure

MedavieWebTest/
│
├── features/
│ └── contactPageValidation.feature
│
├── stepDefinitions/
│ └── contactSteps.js
│
├── pageObjects/
│ ├── basePage.js
│ ├── homePage/
│ │ ├── homePage.actions.js
│ │ └── homePage.elements.js
│ └── contactPage/
│ ├── contactPage.actions.js
│ └── contactPage.elements.js
│
├── contactTestData/
│ └── contactData.js
│
├── wdio.conf.js
├── package.json
└── README.md

## Test Results

<img width="1535" height="663" alt="image" src="https://github.com/user-attachments/assets/37a52f3d-5ace-4e99-8873-d41a15023d8c" />


### Setup Instructions


##  Installation

Clone this repo:

git clone <your-repo-link>
cd MedavieWebTest




## 2. Install dependencies:

npm install --legacy-peer-deps


If you face dependency issues:


rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps


---

## Running Tests

### Run all feature files


npx wdio run wdio.conf.js


### Run a specific feature file


npx wdio run wdio.conf.js --spec ./features/contactPageValidation.feature


---

## Common Issues and Fixes

| Issue | Cause | Solution |
|--------|--------|----------|
| `contactData is not defined` | Incorrect import path | Use `const { contactData } = require('../../contactTestData/contactData');` |
| Navigation timeout | Chrome driver payload delay | Add `await browser.pause(3000)` or retry logic after `browser.url()` |
| Window not maximizing | Chrome headless restriction | Use `await browser.setWindowSize(1920, 1080);` |
| TypeScript compilation errors | Cucumber/WDIO version mismatch | Converted project to pure JavaScript (`.js`) to ensure stability |
| Package resolution errors | Legacy peer dependencies conflict | Used `--legacy-peer-deps` during install to bypass strict dependency validation |
| GitHub sync issues | Local vs remote repo histories mismatch | Used `git pull origin main --allow-unrelated-histories` or force push to reset |

---

## Strategies and Fixes Implemented

## 1. Migration from TypeScript to JavaScript
- Original project used TypeScript, but due to frequent `TS7006` and `TS2554` compiler errors from WebdriverIO 9 type definitions,  
  the entire suite was migrated to **JavaScript (.js)** for smoother execution and simpler debugging.

## 2. Window Maximization Issue
- `browser.maximizeWindow()` failed to work consistently in WDIO 9.
- Implemented a reliable fallback:  
  ```js
  await browser.setWindowSize(1920, 1080);

## 3. Stability in Element Definitions

Refined locators to use semantic selectors, and ul li strong) rather than brittle XPath or CSS class-based selectors.
Improved test resilience by implementing waitForDisplayed() before any verification.

## 4. Improved Multi-language Handling

Replaced multiple string conditionals with a reusable contactData JSON structure mapping both English and French data.
Implemented language-driven page load and validation logic.

## 5. Dependency and Environment Setup

Addressed repeated dependency mismatches caused by WebdriverIO v9 ecosystem changes.
Standardized on npm install --legacy-peer-deps to ensure consistent local setup.

## 6.Git & Repository Management

Resolved Git merge errors (refusing to merge unrelated histories) by using:
git pull origin main --allow-unrelated-histories
Cleaned and re-initialized .gitignore to prevent node_modules and local cache commits.

## Future Improvements

To further strengthen the framework and make it enterprise-ready, the following improvements can be planned:

## 1. Dynamic Test Data and Reporting

Introduce environment-based test data loading (e.g., qa, staging, prod).

Add consolidated HTML and JSON reports for better visibility and analytics.

## 2. Visual Regression Testing

Capture and compare UI screenshots for future UI changes using webdriver-image-comparison or similar library.

## 3. BrowserStack / Cross-Browser Testing

Extend test coverage to validate across different browsers and OS combinations.

## 4. Error Recovery and Retry Logic

Add automatic test retry mechanisms and intelligent failure recovery for improved stability.

## 5. Page Performance and Accessibility Tests

Integrate Lighthouse CI or axe-core to validate accessibility and performance of key pages.

## 6. Refactored English and French Tests into a Single Data-Driven Scenario

Initially, the English and French contact page tests were written as two separate scenarios.

This led to redundant steps, duplicated selectors, and more maintenance overhead.

The test was redesigned using a Scenario Outline with a parameterized Examples table in Cucumber.

This single outline now runs the same flow for multiple languages by passing language-specific parameters such as:

language

url

menu_link

page_title

Example snippet from the .feature file:

```js
Scenario Outline: Verify Contact Information for <language>
  Given I am on the <language> home page "<url>"
  When I click the "<menu_link>" menu link
  Then the "<page_title>" page title should be visible
  And I verify the contact details for <language>

  Examples:
    | language | url                        | menu_link     | page_title    |
    | English  | https://www.medavie.ca/en/ | Contact       | Contact       |
    | French   | https://www.medavie.ca/fn/ | Coordonnées   | Coordonnées   |

Reduces code duplication by 50%, simplified step definitions, and make it easy to extend for new languages (e.g., Spanish or Dutch) by adding just one row in the Examples table.


=======
