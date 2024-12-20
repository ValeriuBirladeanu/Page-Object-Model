const { th } = require("@faker-js/faker");

class BuzzPage {
  constructor(page) {
    this.page = page;
    this.buzzMenu = page.locator('span:has-text("Buzz")');
    this.buzzNewsfeedText = page.locator(
      'p[class="oxd-text oxd-text--p oxd-text--card-title orangehrm-buzz-newsfeed-title"]'
    );
    this.postedText = page.locator(
      "p[class='oxd-text oxd-text--p orangehrm-buzz-post-body-text']"
    );
    this.buzzField = page.locator('textarea[class="oxd-buzz-post-input"]');
    this.postButton = page.locator('button[type="submit"]');
    this.postedBuzzes = page.locator(
      '[class="oxd-text oxd-text--p orangehrm-buzz-post-body-text"]'
    );
    this.buzzMessageLocator = '.oxd-sheet--rounded:has-text("{message}")'
    this.threeDotsButtonLocator = 'li button[class="oxd-icon-button"]';
    this.deletePostButton = page.locator('p:has-text("Delete Post")');
  }

  async goToBuzzMenu() {
    await this.buzzMenu.click();
  }

  async addNewsfeed(text) {
    await this.buzzField.fill(text);
    await this.postButton.click();

    return {
      text: text,
    };
  }

  async extractNewsfeeds() {
    await this.postedBuzzes.nth(0).waitFor()
    const message = await this.postedBuzzes.allTextContents();
    return message;
  }

  async deleteNewsfeed(message) {
    const buzzMessage = this.buzzMessageLocator.replace('{message}', message);
    const messageLocator = this.page.locator(buzzMessage);
    const threeDotsButton = messageLocator.locator('..').locator(this.threeDotsButtonLocator);
    await threeDotsButton.waitFor({ state: 'visible' });
    await threeDotsButton.click();
    await this.deletePostButton.waitFor({ state: 'visible' });
    await this.deletePostButton.click();
}
}
module.exports = { BuzzPage };
