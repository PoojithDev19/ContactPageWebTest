class HomePageElements {
  // Works for desktop and mobile Contact link
  get englishContactMenu() {
    return '//a[normalize-space(text())="Contact"]';
  }

  get frenchContactMenu() {
    return "//a[normalize-space(text())='Coordonnées']";
  }

  // Covers both mobile and desktop hamburger icon
  get hamburgerIcon() {
    return "//*[contains(@class, 'hamburger')]";
  }
}

module.exports = HomePageElements;
