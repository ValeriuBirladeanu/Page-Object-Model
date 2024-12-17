const { PayGrades } = require("../pages/Admin/payGradesPage");
const { url } = require("../utils/urls.js");
const { expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUTILS.js");
const { dataTestAdmin: test } = require("../utils/baseDataAdmin");

let context;
let page;
let apiUtils;

test.beforeAll(async ({ browser, validCredentials }) => {
  context = await browser.newContext();
  page = await context.newPage();
  apiUtils = new APIUtils();

  apiUtils.apiContext = await request.newContext({
    baseURL: url.loginUrl
    });
  const cookies = await apiUtils.getCookie(page, validCredentials.username, validCredentials.password);
  await context.addCookies(cookies);
});

test("Add new Pay Grades (admin)", async ({ randomData }) => {
  test.setTimeout(100000);
  const addPayGrades = new PayGrades(page);
  await addPayGrades.goToAdminMenu();
  await expect(page).toHaveURL(url.adminUrl);
  await expect(addPayGrades.systemUsersText).toBeVisible();

  await addPayGrades.goToPayGrades();
  await expect(page).toHaveURL(url.payGradesListUrl);
  await expect(addPayGrades.payGradesText).toBeVisible();
  
  const newPayGrades = await addPayGrades.addPayGrades(randomData.jobTitle);
  console.log('newPayGrades:', newPayGrades);
  await expect(addPayGrades.editPayGradesText).toBeVisible();

  await addPayGrades.goToPayGrades();
  await expect(page).toHaveURL(url.payGradesListUrl);
  await expect(addPayGrades.payGradesText).toBeVisible();

  const extractedPayGrades = await addPayGrades.extractPayGrades();
  expect(extractedPayGrades).toContain(newPayGrades.name);
});