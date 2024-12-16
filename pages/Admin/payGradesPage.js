const { AdminBasePage } = require("../../pages/Admin/adminBasePage.js");
class PayGrades extends AdminBasePage {
    constructor(page) {
        super(page);
        this.payGradesText = page.locator('h6:has-text("Pay Grades")');
        this.editPayGradesText = page.locator('h6:has-text("Edit Pay Grade")');
        this.addButton = page.locator('[class="oxd-button oxd-button--medium oxd-button--secondary"]');
        this.nameField = page.locator('[class="oxd-input oxd-input--active"]').last();
        this.saveButton = page.locator('button[type="submit"]');
        this.payGradesRows = page.locator('[class="oxd-table-cell oxd-padding-cell"][style="flex-basis: 40%;"]');
    }

    async addPayGrades(name) {
        await this.addButton.waitFor();
        await this.addButton.click();
        await this.nameField.fill(name);
        await this.saveButton.click();

        return {
            name: name,
        };
    }

    async extractPayGrades() {
        await this.payGradesRows.nth(0).waitFor();
        const allText = await this.payGradesRows.allTextContents();
        const names = allText.filter((_, index) => index % 2 === 0); 
        console.log('Filtered names:', names); 
        return names;
    }
}
module.exports = { PayGrades };