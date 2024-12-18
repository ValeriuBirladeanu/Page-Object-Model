class MainPage {
  constructor(page) {
    this.page = page;
    this.menuItems = page.locator('li[class="oxd-main-menu-item-wrapper"]');
  }

  async getMenuItems() {
    await this.menuItems.nth(0).waitFor();
    const titles = await this.menuItems.allTextContents();
    console.log(titles)
    return titles;
  }
}
module.exports = { MainPage };