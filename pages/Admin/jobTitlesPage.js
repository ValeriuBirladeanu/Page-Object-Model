const { AdminBasePage } = require("../../pages/Admin/adminBasePage.js");

class JobTitles extends AdminBasePage {
    constructor(page) {
        super(page);
        this.jobTitlesText = page.locator('h6:has-text("Job Titles")');
        this.addButton = page.locator('.oxd-button--secondary');
        this.jobTitlesField = page.locator('input.oxd-input').last();
        this.jobDescriptionField = page.locator('[placeholder="Type description here"]');
        this.addNoteField = page.locator('[placeholder="Add note"]');
        this.saveButton = page.locator('button[type="submit"]');
        this.jobTitlesRows = page.locator('div.oxd-table-row div[style="flex: 2 1 0%;"]');
        this.jobDescriptionsRows = page.locator('div.oxd-table-row div[style="flex: 4 1 0%;"]');
    }

 
    async addJobTitles(title, description, note) {
        await this.addButton.waitFor();
        await this.addButton.click();
        await this.jobTitlesField.fill(title);
        await this.jobDescriptionField.fill(description);
        await this.addNoteField.fill(note);
        await this.saveButton.click();

        return {
            title: title,
            description: description,
            note: note,
        };
    }

    async extractJobTitles() {
        await this.jobTitlesRows.nth(0).waitFor()
        const titles = await this.jobTitlesRows.allTextContents();
        return titles
    }
}
module.exports = { JobTitles };