const { POManager } = require("../pages/POManager.js");
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
    baseURL: url.loginUrl,
  });
  const cookies = await apiUtils.getCookie(
    page,
    validCredentials.username,
    validCredentials.password
  );
  await context.addCookies(cookies);
});

test("Add new Pay Grades (admin)", async ({ randomData }) => {
  const poManager = new POManager(page);
  const payGrades = poManager.getPayGrades();
  await payGrades.goToAdminMenu();
  await expect(page).toHaveURL(url.adminUrl);
  await expect(payGrades.systemUsersText).toBeVisible();

  await payGrades.goToPayGrades();
  await expect(page).toHaveURL(url.payGradesListUrl);
  await expect(payGrades.payGradesText).toBeVisible();

  const newPayGrades = await payGrades.addPayGrades(randomData.jobTitle);
  console.log("newPayGrades:", newPayGrades);
  await expect(payGrades.editPayGradesText).toBeVisible();

  await payGrades.goToPayGrades();
  await expect(page).toHaveURL(url.payGradesListUrl);
  await expect(payGrades.payGradesText).toBeVisible();

  const extractedPayGrades = await payGrades.extractPayGrades();
  expect(extractedPayGrades).toContain(newPayGrades.name);
});
 