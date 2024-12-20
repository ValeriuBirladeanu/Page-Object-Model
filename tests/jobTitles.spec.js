const { POManager } = require("../pages/POManager.js");

const { url } = require("../utils/urls.js");
const { expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUTILS.js");
const { dataTestAdmin: test } = require("../utils/baseDataAdmin.js");

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

test("Add new Job Titles (admin)", async ({ randomData }) => {
  const poManager = new POManager(page);
  const jobTitles = poManager.getJobTitles();
  await jobTitles.goToAdminMenu();
  await expect(page).toHaveURL(url.adminUrl);
  await expect(jobTitles.systemUsersText).toBeVisible();

  await jobTitles.goToJobTitles();
  await expect(page).toHaveURL(url.jobTitlesListUrl);
  await expect(jobTitles.jobTitlesText).toBeVisible();

  const newJobTitle = await jobTitles.addJobTitles(
    randomData.jobTitle,
    randomData.lastName,
    randomData.firstName
  );
  console.log("newJobTitle:", newJobTitle);

  await expect(page).toHaveURL(url.jobTitlesListUrl);
  await expect(jobTitles.jobTitlesText).toBeVisible();

  const extractedJobTitles = await jobTitles.extractJobTitles();
  expect(extractedJobTitles).toContain(newJobTitle.title);
  console.log("extractedJobTitles:", extractedJobTitles);
});
