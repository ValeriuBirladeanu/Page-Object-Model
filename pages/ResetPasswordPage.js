class ResetPasswordPage {
  constructor(page) {
    this.page = page;
    this.resetPasswordText = page.locator(
      'h6[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]'
    );
    this.userNameField = page.locator('[name="username"]');
    this.resetPasswordButton = page.locator('[type="submit"]');
    this.resetPasswordConteiner = page.locator(
      'div[class="orangehrm-card-container"]'
    );
  }

  async fillPasswordField(username) {
    await this.userNameField.fill(username);
  }

  async clickResetPasswordButton() {
    await this.resetPasswordButton.click();
  }
}

module.exports = { ResetPasswordPage };