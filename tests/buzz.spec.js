const { BuzzPage } = require("../pages/BuzzPage");
const { url } = require("../utils/urls.js");
const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUTILS.js");

const postBuzzPayLoad = {
  type: "text",
  text: "Sometext",
};

let context;
let page;
let apiUtils;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  apiUtils = new APIUtils();

  apiUtils.apiContext = await request.newContext({
    baseURL: url.loginUrl,
  });
  const cookies = await apiUtils.getCookie(page);
  await context.addCookies(cookies);
});

test("Add message in Buzz", async () => {
  const buzzPage = new BuzzPage(page);
  await buzzPage.goToBuzzMenu();

  const postMessage = await apiUtils.createMessage(postBuzzPayLoad, context);
  await page.reload();

  const postText = await buzzPage.postedText.first().textContent();
  expect(postText).toContain(postBuzzPayLoad.text);
});