const { POManager } = require("../pages/POManager.js");
const { dataTestAdmin: test } = require("../utils/baseDataAdmin");
import { url } from "../utils/urls";
import { expect } from "@playwright/test";
import { menuItems } from '../utils/staticDataAdmin';


test("Validate left menu list of items for admin", async ({
  page,
  validCredentials,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const mainPage = poManager.getMainPage();
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