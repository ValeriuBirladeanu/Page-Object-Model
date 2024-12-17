const { AdminBasePage } = require("../../pages/Admin/adminBasePage.js");
class SkilsPage extends AdminBasePage {
    constructor(page) {
        super(page);
        this.skilsText = page.locator('h6[class="oxd-text oxd-text--h6 orangehrm-main-title"]');
        this.editPayGradesText = page.locator('h6:has-text("Edit Pay Grade")');
        this.addButton = page.locator('.oxd-button--secondary');
        this.nameField = page.locator('[class="oxd-input oxd-input--active"]').last();
        this.descriptionField = page.locator('[placeholder="Type description here"]');
        this.saveButton = page.locator('button[type="submit"]');
        this.skilsRows = page.locator('[class="oxd-table-cell oxd-padding-cell"][style="flex: 2 1 0%;"]');
        this.trashButtonLocator = '[class="oxd-icon bi-trash"]'
        this.rowLocatorTemplate = '.oxd-table-row:has(.oxd-table-cell:has-text("{skillName}"))';
        this.confirmDeleteButton = page.locator('[class="oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin"]');
    }

    async addSkils(name, description) {
        await this.addButton.waitFor();
        await this.addButton.click();
        await this.nameField.fill(name);
        await this.descriptionField.fill(description);
        await this.saveButton.click();

        return {
            name: name,
            description: description,
        };
    }

    async extractSkils() {
        await this.skilsRows.nth(0).waitFor();
        const names = await this.skilsRows.allTextContents();
        return names;
    }

    async deleteSkill(skillName) {
        const rowLocator = this.page.locator(this.rowLocatorTemplate.replace('{skillName}', skillName));
        const trashButton = rowLocator.locator(this.trashButtonLocator)
        await trashButton.waitFor({ state: 'visible' });
        await trashButton.click();
        await this.confirmDeleteButton.waitFor({ state: 'visible' });
        await this.confirmDeleteButton.click();
    }   
}
module.exports = { SkilsPage };