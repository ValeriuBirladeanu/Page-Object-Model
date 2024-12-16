const { PimBasePage } = require("./PimBasePage");

class EmployeeList extends PimBasePage {
  constructor(page) {
    super(page);
    this.employeeInformationText = page.locator('h5:has-text("Employee Information")');
    this.employeeNameField = page.getByPlaceholder('Type for hints...').first();
    this.employeeIdField = page.getByRole('textbox').nth(2);
    this.employmentStatusField = page.locator('.oxd-select-text').first();
    this.supervisorNameField = page.getByPlaceholder('Type for hints...').nth(1);
    this.jobTitleField = page.locator(
      'div:nth-child(6) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
    );
    this.subUnitField = page.getByText('-- Select --').nth(3);
    this.serachButton = page.getByRole('button', { name: 'Search' });
  }

  
  
  async fillEmployeeNameField(fullName) {
    await this.employeeNameField(fullName);
  }
}

module.exports = { EmployeeList };