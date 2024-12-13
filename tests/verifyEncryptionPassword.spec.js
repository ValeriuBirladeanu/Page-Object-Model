const { dataTest: test } = require("../utils/baseData");
import { LoginPage } from "../pages/LoginPage";
import { url } from "../utils/urls";
import { expect } from "@playwright/test";

test("Verify encryption of sensitive data like passwords (check password is shown ****)", async ({
  page,
  randomData,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo(url.loginUrl);
  await loginPage.fillPasswordFiled(randomData.password);
  const inputType = await loginPage.getPasswordFieldType();
  expect(inputType).toBe("password");

  const isPasswordHidden = await loginPage.isPasswordHidden();
  expect(isPasswordHidden).toBe(true);
});