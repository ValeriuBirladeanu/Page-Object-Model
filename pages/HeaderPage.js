class HeaderPage {
    constructor(page) {
      this.page = page;
      this.profileMenu = page.locator('span[class="oxd-userdropdown-tab"]');
      this.changePasswordItem = page.locator('a:has-text("Change Password")');
      this.userPasswordText = page.locator('h6:has-text("Update Password")');
      this.curentPasswordField = page.locator('(//input[@type="password"])[1]');
      this.passwordField = page.locator('(//input[@type="password"])[2]');
      this.confirmPasswordField = page.locator('(//input[@type="password"])[3]');
      this.saveButton = page.locator('button[type="submit"]');
      this.logoutItem = page.locator('a:has-text("Logout")');
      this.dashboardText = page.locator('h6:has-text("Dashboard")');
      this.passwordChip = page.locator('[class*="orangehrm-password-chip"]');
      this.loginSlot = page.locator('div[class="orangehrm-login-slot"]');

    }
  
    async goToProfileChangePassword() {
      await this.profileMenu.click();
      await this.changePasswordItem.click();
    }

    async fillCurrentPasswordField(password) {
      await this.curentPasswordField.fill(password);
    }
  
    async fillPasswordField(password) {
      await this.passwordField.fill(password);
    }

    async fillConfirmPasswordField(password) {
      await this.confirmPasswordField.fill(password);
    }
  
    async clickSaveButton() {
      await this.saveButton.click();
    }

    async goToLogout() {
      await this.profileMenu.click();
      await this.logoutItem.click();
    }

    async loginWithPassword(username, password) {
      await this.page.locator('[name="username"]').fill(username);
      await this.page.locator('[type="password"]').fill(password);
      await this.page.locator('[type="submit"]').click();
    }
    
    async getErrorMessageForInvalidLogin() {
      const errorMessageLocator = this.page.locator('p[class="oxd-text oxd-text--p oxd-alert-content-text"]'); 
        return errorMessageLocator;
    }
    
    async isOnLoginPage() {
      return this.page.url() === url.loginUrl;
    }
  } 
  module.exports = { HeaderPage };