const { dataTestAdmin: test } = require("../utils/baseDataAdmin");
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
import { url } from "../utils/urls";
import { expect } from "@playwright/test";
import { menuItems } from '../utils/staticDataAdmin';


test("Validate left menu list of items for admin", async ({
  page,
  validCredentials,
}) => {
  const mainPage = new MainPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.goTo(url.loginUrl);
  await loginPage.fillUsernameField(validCredentials.username);
  await loginPage.fillPasswordField(validCredentials.password);
  await loginPage.submit();
  await expect(page).toHaveURL(url.dashboardUrl);
  await expect(loginPage.dashboardText).toBeVisible();
  const actualMenuItems = await mainPage.getMenuItems(); 
  expect(actualMenuItems).toEqual(menuItems);
  console.log("Expected menu items:", menuItems);
  console.log("Actual menu items:", actualMenuItems);
});