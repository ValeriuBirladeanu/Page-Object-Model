const { POManager } = require("../pages/POManager.js");
const { dataTestAdmin: test } = require("../utils/baseDataAdmin");
import { url } from "../utils/urls";
import { expect } from "@playwright/test";

test("Verify that valid credentials allow the user to log in successfully", async ({
  page,
  validCredentials,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();;
  await loginPage.goTo(url.loginUrl);
  await loginPage.fillUsernameField(validCredentials.username);
  await loginPage.fillPasswordField(validCredentials.password);
  await loginPage.submit();
  await expect(page).toHaveURL(url.dashboardUrl);
  await expect(loginPage.dashboardText).toBeVisible();
});

test("Verify that invalid credentials display the correct error message", async ({
  page,
  invalidCredential1,
  invalidCredential2,
  invalidCredential3,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const invalidCredentialsSet = [
    invalidCredential1,
    invalidCredential2,
    invalidCredential3,
  ];

  for (const { username, password, description } of invalidCredentialsSet) {
    await test.step(`Testing scenario: ${description}`, async () => {
      await loginPage.goTo(url.loginUrl);
      await loginPage.fillUsernameField(username);
      await loginPage.fillPasswordField(password);
      await loginPage.submit();
      await expect(page).not.toHaveURL(url.dashboardUrl);
      await expect(page).toHaveURL(url.loginUrl);
      await expect(loginPage.invalidCredentialsText).toBeVisible();
    });
  }
});

test('Verify the behavior when fields are left blank and the "Login" button is clicked', async ({
  page,
  blankFields1,
  blankFields2,
  blankFields3,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const blankFieldsSet = [blankFields1, blankFields2, blankFields3];

  for (const { username, password, description } of blankFieldsSet) {
    await test.step(`Testing scenario: ${description}`, async () => {
      await loginPage.goTo(url.loginUrl);
      await loginPage.fillUsernameField(username);
      await loginPage.fillPasswordField(password);
      await loginPage.submit();
      await expect(page).not.toHaveURL(url.dashboardUrl);
      await expect(page).toHaveURL(url.loginUrl);
      await expect(loginPage.requiredText.first()).toBeVisible();
    });
  }
});