class PimBasePage {
  constructor(page) {
    this.page = page;
    this.pimMenu = page.locator('span:has-text("PIM")');
    this.employeeList = page.locator('a:has-text("Employee List")');
    this.addEmployeeElement = page.locator('a:has-text("Add Employee")');
    this.employeeIdAlreadyExistsText = page.locator(
      'span:has-text("Employee Id already exists")'
    );
  }

  async goToPimMenu() {
    await this.pimMenu.click();
  }

  async goToAddEmployee() {
    await this.addEmployeeElement.click();
  }
}

module.exports = { PimBasePage };