const { expect } = require('@wdio/globals');
const { Given, When, Then } = require('@wdio/cucumber-framework');
const HomePage = require('../pageObjects/homePage/homePage.actions');
const ContactPage = require('../pageObjects/contactPage/contactPage.actions');

Given('I open the Medavie English homepage', async () => {
  await browser.setTimeout({ pageLoad: 120000, implicit: 10000 });
  await HomePage.openHome('english');
});

When('I click on the Contact menu', async () => {
  await HomePage.clickContactMenu('english');
});

Then('I should see the Contact page for English site', async () => {
  await ContactPage.verifyEnglishHeader();
});

Then('I verify the contact numbers for English site', async () => {
  await ContactPage.verifyContactNumbers('english');
});


Given('I open the Medavie French homepage', async () => {
  await browser.setTimeout({ pageLoad: 120000, implicit: 10000 });
  await HomePage.openHome('french');
});

When('I click on the Coordonnées menu', async () => {
  await HomePage.clickContactMenu('french');
});

Then('I should see the Contact page for French site', async () => {
  await ContactPage.verifyFrenchHeader();
});

Then('I verify the contact numbers for French site', async () => {
  await ContactPage.verifyContactNumbers('french');
});

