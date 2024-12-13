class BuzzPage {
  constructor(page) {
    this.page = page;
    this.buzzMenu = page.locator('span:has-text("Buzz")');
    this.postedText = page.locator(
      "p[class='oxd-text oxd-text--p orangehrm-buzz-post-body-text']"
    );
  }

  async goToBuzzMenu() {
    await this.buzzMenu.click();
  }
}

module.exports = { BuzzPage };