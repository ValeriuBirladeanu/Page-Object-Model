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
    baseURL: url.loginUrl
    });
  const cookies = await apiUtils.getCookie(page, validCredentials.username, validCredentials.password);
  await context.addCookies(cookies);
});

test("Add and delete skill", async ({ randomData }) => {
  const poManager = new POManager(page);
  const skils = poManager.getSkilsPage();
  await skils.goToAdminMenu();
  await expect(page).toHaveURL(url.adminUrl);
  await expect(skils.systemUsersText).toBeVisible();

  await skils.goToSkils();
  await expect(page).toHaveURL(url.skilsUrl);
  await expect(skils.skilsText).toBeVisible();

  const newSkils = await skils.addSkils(
    randomData.jobTitle,
    randomData.lastName,
  );
  console.log('newSkils:', newSkils);

  await expect(page).toHaveURL(url.skilsUrl);
  await expect(skils.skilsText).toBeVisible();

  const extractedSkils = await skils.extractSkils();
  expect(extractedSkils).toContain(newSkils.name);
  console.log('extractedSkils:', extractedSkils);

  await skils.deleteSkill(newSkils.name);

  const updatedSkils = await skils.extractSkils();
  expect(updatedSkils).not.toContain(newSkils.name);
  console.log('updatedSkils:', updatedSkils)
});