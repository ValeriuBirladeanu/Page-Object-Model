class LoginPage {
  constructor(page) {
    this.page = page;
    this.userNameField = page.locator('[name="username"]');
    this.passwordField = page.locator('[type="password"]');
    this.submitButton = page.locator('[type="submit"]');
    this.dashboardText = page.locator(
      'h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]'
    );
    this.invalidCredentialsText = page.locator(
      'div[class="oxd-alert-content oxd-alert-content--error"]'
    );
    this.forgotYourPasswordText = page.locator(
      'p[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]'
    );
    this.requiredText = page.locator(
      'span[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]'
    );
    this.menuItems = page.locator('li[class="oxd-main-menu-item-wrapper"]');
  }

  async goTo(url) {
    await this.page.goto(url);
  }

  async fillUsernameField(username) {
    await this.userNameField.fill(username);
  }

  async fillPasswordField(password) {
    await this.passwordField.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async clickForgotYourPassword() {
    await this.forgotYourPasswordText.click();
  }

  async getPasswordFieldType() {
    return this.passwordField.getAttribute("type");
  }

  async isPasswordHidden() {
    return this.passwordField.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return computedStyle.webkitTextSecurity !== "none";
    });
  }

  async getMenuItems() {
    await this.menuItems.nth(0).waitFor()
      const titles = await this.menuItems.allTextContents();
      return titles
  }
}
module.exports = { LoginPage };