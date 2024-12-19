const { PimBasePage } = require("./PimBasePage");

class EmployeeListPage extends PimBasePage {
  constructor(page) {
    super(page);
    this.employeeInformationText = page.locator('h5:has-text("Employee Information")');
    this.employeeNameField = page.getByPlaceholder('Type for hints...').first();
    this.employeeIdField = page.locator('[class="oxd-input oxd-input--active"]').last();
    this.employmentStatusDropdown = page.locator('.oxd-select-text').first();
    this.employmentStatusOptions = page.locator('[class="oxd-select-option"] span');
    this.supervisorNameField = page.getByPlaceholder('Type for hints...').nth(1);
    this.supervisorNameOption = page.locator('[class="oxd-autocomplete-option"] span');
    this.jobTitleDropdown = page.locator('.oxd-select-text').nth(2);
    this.jobTitleOptions = page.locator('[class="oxd-select-option"]');
    this.subUnitDropdown = page.locator('.oxd-select-text').nth(3);
    this.subUnitOptions = page.locator('[role="option"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.countRecordFound = page.locator('span:has-text("(1) Record Found")')
    this.cellsTabel = page.locator('[class="oxd-table-cell oxd-padding-cell"]')
  }

  async selectDropdownOption(dropdown, optionsLocator, optionText) {
    await dropdown.click();
    await optionsLocator.first().waitFor({ state: 'visible' });
  
    const optionsText = await optionsLocator.allTextContents();
    const targetOption = optionsText.find(text => 
      text.trim() === optionText.name || text.trim() === optionText.title
    );
  
    if (targetOption) {
      const index = optionsText.indexOf(targetOption);
      await optionsLocator.nth(index).click();
    } else {
      throw new Error(`Option "${optionText.name || optionText.title}" not found in the dropdown.`);
    }
  }
  
  async fillEmployeeSearchFields(EmployeeFullName, employeeId, empStatus, SupervisorFullName, jobTitle, subunit) {
    await this.employeeNameField.fill(EmployeeFullName);
    await this.employeeIdField.fill(employeeId.toString());
    await this.selectDropdownOption(this.employmentStatusDropdown, this.employmentStatusOptions, empStatus);
    await this.supervisorNameField.fill(SupervisorFullName);
    await this.supervisorNameOption.click()
     await this.selectDropdownOption(this.jobTitleDropdown, this.jobTitleOptions, jobTitle);
     await this.selectDropdownOption(this.subUnitDropdown, this.subUnitOptions, subunit);
     await this.searchButton.click();   }
}

module.exports = { EmployeeListPage };