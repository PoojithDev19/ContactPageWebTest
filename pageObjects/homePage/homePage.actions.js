const BasePage = require('../basePage');
const { contactData } = require('../../contactTestData/contactData');
const HomePageElements = require('./homePage.elements');

class HomePageActions extends BasePage {
  constructor() {
    super();
    this.elements = new HomePageElements();
  }

  async openHome(language) {
    const url = contactData[language].url;
    console.log(`Navigating to: ${url}`);
    await this.open(url);
  }

  async clickContactMenu(language) {
  console.log(`Clicking ${language} Contact menu...`);

  const hamburgerIcon = await $(this.elements.hamburgerIcon);
  const isHamburgerDisplayed = await hamburgerIcon.isDisplayed().catch(() => false);

  // Handle mobile hamburger menu
  if (isHamburgerDisplayed) {
    console.log('Hamburger icon detected — opening mobile menu...');
    await hamburgerIcon.waitForClickable({ timeout: 5000 });
    await hamburgerIcon.click();
    await browser.pause(1500);
  }

  // Choose correct locator based on language
  const contactSelector =
    language.toLowerCase() === 'french'
      ? this.elements.frenchContactMenu
      : this.elements.englishContactMenu;

  const contactElement = await $(contactSelector);

  // Wait for element and click
  try {
  await contactElement.waitForExist({ timeout: 10000 });
  await contactElement.scrollIntoView();
  await browser.execute("arguments[0].click();", contactElement);
  console.log(`${language} Contact link clicked successfully`);
} catch (error) {
  const optionName = language.toLowerCase() === 'french' ? 'Coordonnées' : 'Contact';
  console.error(`${optionName} option missing or not visible on the ${language} Medavie site.`);
  throw new Error(`${optionName} option missing on the ${language} Medavie site.`);
}
  }
}
module.exports = new HomePageActions();
