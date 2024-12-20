const { POManager } = require("../pages/POManager.js");
const { APIUtils } = require("../utils/APIUTILS.js");
const { url } = require("../utils/urls.js");
const { expect, request} = require("@playwright/test");
const { dataTestAdmin: test } = require("../utils/baseDataAdmin");
const { newUserPayload } = require("../utils/userPayload");

let context;
let page;
let apiUtils;
let newUser;

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

test.beforeEach(async () => {
  // Crearea unui utilizator nou 
  newUser = await apiUtils.addUser(newUserPayload, context);
  console.log("New user created:", newUser);

  // Logare cu utilizatorul nou creat
  const poManager = new POManager(page);
  const headerPage = poManager.getHeaderPage();
  await headerPage.goToLogout();
  await expect(page).toHaveURL(url.loginUrl);
  await expect(headerPage.loginSlot).toBeVisible();
  await headerPage.loginWithPassword(newUserPayload.username, newUserPayload.password);
  await expect(page).toHaveURL(url.dashboardUrl);
});

test("Change password for user", async ({ randomData }) => {
  const poManager = new POManager(page);
  const headerPage = poManager.getHeaderPage();

  // Navigare la schimbarea parolei
  await headerPage.goToProfileChangePassword();
  await expect(page).toHaveURL(url.userUpdatePasswordUrl);
  await expect(headerPage.userPasswordText).toBeVisible();

  // Schimbarea parolei
  const newPassword = randomData.password;
  console.log("oldPassword: ", newUserPayload.password);
  console.log("newPassword: ", newPassword);
  await headerPage.fillCurrentPasswordField(newUserPayload.password); // Parola veche
  await headerPage.fillPasswordField(newPassword);
  await headerPage.fillConfirmPasswordField(newPassword);
  await headerPage.clickSaveButton();
  await expect(headerPage.passwordChip).not.toBeVisible();

  // Logout
  await headerPage.goToLogout();
  await expect(page).toHaveURL(url.loginUrl);
  await expect(headerPage.loginSlot).toBeVisible();

  // Verificare login cu parola veche (ar trebui să dea eroare)
  await headerPage.loginWithPassword(newUserPayload.username, newUserPayload.password);
  const errorMessageLocator = await headerPage.getErrorMessageForInvalidLogin();
  await expect(errorMessageLocator).toBeVisible();

  // Verificare login cu parola nouă
  await headerPage.loginWithPassword(newUserPayload.username, newPassword);
  await expect(page).toHaveURL(url.dashboardUrl);
});