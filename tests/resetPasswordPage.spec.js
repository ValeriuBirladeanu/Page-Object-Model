const { dataTest: test } = require("../utils/baseData");
import { LoginPage } from "../pages/LoginPage";
import { ResetPasswordPage } from "../pages/ResetPasswordPage";
import { url } from "../utils/urls";
import { expect } from "@playwright/test";

test('Verify that the "Forgot Password" functionality works as expected. (with out email check)', async ({
  page,
  validCredentials,
}) => {
  const loginPage = new LoginPage(page);
  const resetPasswordPage = new ResetPasswordPage(page);
  await loginPage.goTo(url.loginUrl);
  await loginPage.clickForgotYourPassword();
  await expect(page).toHaveURL(url.requestResetPasswordUrl);
  await expect(resetPasswordPage.resetPasswordText).toBeVisible();
  await resetPasswordPage.fillPasswordField(validCredentials.username);
  await resetPasswordPage.clickResetPasswordButton();
  await expect(page).toHaveURL(url.responsResetPasswordUrl);
  await expect(resetPasswordPage.resetPasswordConteiner).toBeVisible();
});    