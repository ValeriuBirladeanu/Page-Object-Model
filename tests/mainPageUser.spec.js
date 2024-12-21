const { POManager } = require("../pages/POManager.js");
const { dataTestAdmin: test } = require("../utils/baseDataAdmin");
const { url } = require("../utils/urls.js");
const { expect, request } = require("@playwright/test");
const { menuItems } = require("../utils/staticDataUser");
const { APIUtils } = require("../utils/APIUTILS.js");
const { newUserPayload } = require("../utils/userPayload");

let context;
let page;
let apiUtils; 

test.beforeAll(async ({ browser, validCredentials }) => {
  await test.step("Setup browser context and page", async () => {
    context = await browser.newContext();
    page = await context.newPage();
    apiUtils = new APIUtils();
  });

  await test.step("Initialize API context and retrieve cookies", async () => {
    apiUtils.apiContext = await request.newContext({
      baseURL: url.loginUrl,
    });
    const cookies = await apiUtils.getCookie(
      page,
      validCredentials.username,
      validCredentials.password
    );
    await context.addCookies(cookies);
  });
});

test.beforeEach(async () => {
  // Crearea unui utilizator nou 
  const newUser = await apiUtils.addUser(newUserPayload, context);
  console.log("New user created:", newUser);
  console.log("newUserPayload.username:", newUserPayload.username);
  console.log("newUserPayload.password", newUserPayload.password); 
});

test.only("Validate left menu list of items for user", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const mainPage = poManager.getMainPage();

  await test.step("Navigate to login page and log in with the created user", async () => {
    await loginPage.goTo(url.loginUrl);
    await loginPage.fillUsernameField(newUserPayload.username);
    await loginPage.fillPasswordField(newUserPayload.password);
    await loginPage.submit();
  });

  await test.step("Verify user is authenticated and redirected to the dashboard", async () => {
    await expect(page).toHaveURL(url.dashboardUrl);
    await expect(loginPage.dashboardText).toBeVisible();
  });

  await test.step("Validate left menu items match the expected list", async () => {
    const actualMenuItems = await mainPage.getMenuItems();
    console.log("Expected menu items:", menuItems);
    console.log("Actual menu items:", actualMenuItems);
    expect(actualMenuItems).toEqual(menuItems);
  });
});
