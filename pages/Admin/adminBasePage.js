class AdminBasePage {
    constructor(page) {
      this.page = page;
      this.adminMenu = page.locator('span:has-text("Admin")').first();
      this.job = page.locator('span:has-text("Job")');
      this.jobTiles = page.locator('a:has-text("Job Titles")');
      this.systemUsersText = page.locator('h5:has-text("System Users")');
      this.payGrades = page.locator('a:has-text("Pay Grades")');
    }
  
    async goToAdminMenu() {
      await this.adminMenu.click();
    }
  
    async goToJobTitles() {
      await this.job.click();
      await this.jobTiles.click();
    }

    async goToPayGrades() {
        await this.job.click();
        await this.payGrades.click();
      }
  }
  
  module.exports = { AdminBasePage };