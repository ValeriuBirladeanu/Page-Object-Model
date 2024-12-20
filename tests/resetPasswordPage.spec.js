const { POManager } = require("../pages/POManager.js");
const { dataTestAdmin: test } = require("../utils/baseDataAdmin");
import { url } from "../utils/urls";
import { expect } from "@playwright/test";

test('Verify that the "Forgot Password" functionality works as expected. (with out email check)', async ({
  page,
  validCredentials,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const resetPasswordPage = poManager.getResetPasswordPage();
  await loginPage.goTo(url.loginUrl);
  await loginPage.clickForgotYourPassword();
  await expect(page).toHaveURL(url.requestResetPasswordUrl);
  await expect(resetPasswordPage.resetPasswordText).toBeVisible();
  await resetPasswordPage.fillPasswordField(validCredentials.username);
  await resetPasswordPage.clickResetPasswordButton();
  await expect(page).toHaveURL(url.responsResetPasswordUrl);
  await expect(resetPasswordPage.resetPasswordConteiner).toBeVisible();
});    