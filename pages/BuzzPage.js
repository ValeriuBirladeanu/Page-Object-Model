class BuzzPage {
  constructor(page) {
    this.page = page;
    this.buzzMenu = page.locator('span:has-text("Buzz")');
    this.postedText = page.locator(
      "p[class='oxd-text oxd-text--p orangehrm-buzz-post-body-text']"
    );
    this.confirmedNotification = page.locator(
      'div[class="oxd-toast oxd-toast--success oxd-toast-container--toast"]'
    );
  }

  async goToBuzzMenu() {
    await this.buzzMenu.click();
  }
}

module.exports = { BuzzPage };