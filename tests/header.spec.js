const { APIUtils } = require("../utils/APIUTILS.js");
const { HeaderPage } = require("../pages/HeaderPage");
const { url } = require("../utils/urls.js");
const { expect, request} = require("@playwright/test");
const { dataTestUser: test } = require("../utils/baseDataUser");

let context;
let page;
let apiUtils;

test.beforeAll(async ({ browser, validCredentials }) => {
  context = await browser.newContext();
  page = await context.newPage();
  apiUtils = new APIUtils();

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

test.only("Change password for user", async ({ validCredentials, randomData }) => {
  const headerPage = new HeaderPage(page);
  await headerPage.goToProfileChangePassword();
  await expect(page).toHaveURL(url.userUpdatePasswordUrl);
  await expect(headerPage.userPasswordText).toBeVisible();

  const newPassword = randomData.password;
  console.log("newPassword: ", newPassword);
  await headerPage.fillCurrentPasswordField(validCredentials.password);
  await headerPage.fillPasswordField(newPassword);
  await headerPage.fillConfirmPasswordField(newPassword);
  await headerPage.clickSaveButton();
  await expect(headerPage.passwordChip).not.toBeVisible();

  // Logout
  await headerPage.goToLogout();
  await expect(page).toHaveURL(url.loginUrl);
  await expect(headerPage.loginSlot).toBeVisible();

   // Login old password 
   await headerPage.loginWithPassword(validCredentials.username, validCredentials.password);
   const errorMessageLocator = await headerPage.getErrorMessageForInvalidLogin();
   await expect(errorMessageLocator).toBeVisible();
 
   // Login new password
   await headerPage.loginWithPassword(validCredentials.username, newPassword);
   await page.goto(url.dashboardUrl);
   await expect(page).toHaveURL(url.dashboardUrl);
   await expect(headerPage.dashboardText).toBeVisible();
});