const { PimBasePage } = require("../../pages/PIM/PimBasePage");

class AddEmployee extends PimBasePage {
  constructor(page) {
    super(page);
    this.addEmployeeText = page.locator('h6:has-text("Add Employee")');
    this.firstNameField = page.locator('input[placeholder="First Name"]');
    this.lastNameField = page.locator('input[placeholder="Last Name"]');
    this.employeeIdField = page.locator(
      'input[class="oxd-input oxd-input--active"]'
    );
    this.saveButton = page.locator('button[type="submit"]');
    this.personalDetailsMenu = page.locator(
      'div[class="orangehrm-edit-employee-navigation"]'
    );
  }

  async notAddDuplicateEmployeeById(firstname, lastname, employeeid) {
    await this.firstNameField.fill(firstname);
    await this.lastNameField.fill(lastname);
    await this.employeeIdField.last().fill(employeeid);
    await this.saveButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { AddEmployee };