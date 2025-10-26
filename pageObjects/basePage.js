const { browser, $, expect } = require('@wdio/globals');

class BasePage {
  async open(path) {
    await browser.url(path);
    await browser.maximizeWindow();
  }

  async clickElement(selector) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout: 8000 });
    await element.click();
  }

  async waitForVisible(selector, timeout = 8000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
  }

  async getText(selector) {
    const element = await $(selector);
    return element.getText();
  }

  async takeScreenshot(filename) {
    await browser.saveScreenshot(`./screenshots/${filename}.png`);
  }

  async expectUrlToContain(substring) {
    await expect(browser).toHaveUrlContaining(substring);
  }

  async expectTitleToContain(substring) {
    await expect(browser).toHaveTitleContaining(substring);
  }
}

module.exports = BasePage;
