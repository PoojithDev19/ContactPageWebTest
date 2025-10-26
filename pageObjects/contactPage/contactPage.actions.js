const BasePage = require('../basePage');
const { contactData } = require('../../contactTestData/contactData');
const ContactPageElements = require('./contactPage.elements');
const { expect } = require('@wdio/globals');

class ContactPageActions extends BasePage {
  constructor() {
    super();
    this.elements = new ContactPageElements();
  }

  // Verify that the correct Contact page (English/French) is loaded
  // Verifies both URL and header text (h1)

async verifyEnglishHeader() {
  console.log('Waiting for Contact page header...');
  await browser.waitUntil(
  async () => (await browser.getUrl()).includes('/contact'),
  { timeout: 10000, timeoutMsg: 'Contact page URL did not load' }
);
  
  const headerElement = await $(this.elements.header);
  await headerElement.waitForDisplayed({ timeout: 10000 });


  const headerText = await headerElement.getText();
  console.log(`Header text found: "${headerText}"`);

  await expect(headerText.trim()).toBe('Contact');
  console.log(`English Contact header verified successfully.`);
}


async verifyFrenchHeader() {
    const headerText = await this.getText(this.elements.header);
    await expect(headerText.trim()).toBe('Coordonnées');
    console.log(`French header verified: ${headerText}`);
  }

  async verifyContactPage(language) {
    const data = contactData[language];

    console.log(`Validating ${language} Contact page...`);

    // Check that URL path matches expected contact page
    await this.expectUrlToContain(data.contactPath);

    //  Verify page header (h1)
    const title = await this.getText(this.elements.heading);
    await expect(title.toLowerCase()).toContain(data.pageTitle.toLowerCase());

    console.log(` ${language} contact page header verified: "${title}"`);
  }


// Verify that all region labels and contact numbers are displayed correctly.

async verifyContactNumbers(language) {
  console.log(`Verifying contact numbers for ${language} site...`);

  const data = contactData[language];

  // Pick the section title based on language
  const sectionTitle =
    language === 'english'
      ? 'Medavie Blue Cross'
      : 'Croix Bleue Medavie';
  const contactSection = await $(this.elements.contactList);
  await contactSection.waitForDisplayed({ timeout: 10000 });

  // Get all text inside the contact section
  const sectionText = await contactSection.getText();
  const normalizedText = sectionText.replace(/[\s()-]/g, '');

  console.log('Captured Contact Section Text:', sectionText.substring(0, 200), '...');

  // Validate each expected region + number pair
  for (const contact of data.contacts) {
    const region = contact.region.replace(/\s+/g, '');
    const number = contact.number.replace(/[\s()-]/g, '');

    const found = normalizedText.includes(region) && normalizedText.includes(number);
    console.log(`Checking: ${contact.region} -> ${contact.number} | Found? ${found}`);
    await expect(found).toBe(true);
  }

  console.log(`All ${language} contact numbers verified successfully.`);
}

// Capture a screenshot of the Contact page for reporting.

  async captureContactPageScreenshot(language) {
    const fileName = `contact-page-${language}.png`;
    await this.takeScreenshot(fileName);
    console.log(`Screenshot captured: ${fileName}`);
  }
}

module.exports = new ContactPageActions();
