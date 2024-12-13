const { APIUtils } = require("../utils/APIUTILS.js");
const { BuzzPage } = require("../pages/BuzzPage");
const { url } = require("../utils/urls.js");
const { expect, request } = require("@playwright/test");
const { dataTest: test } = require("../utils/baseData");

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

test("Add message in Buzz", async ({ randomData }) => {
  const buzzPage = new BuzzPage(page);
  await buzzPage.goToBuzzMenu();

 const postBuzzPayLoad = {
    type: "text",
    text: randomData.message,
  };

  await apiUtils.createMessage(postBuzzPayLoad, context);
  await page.reload();

  const postText = await buzzPage.postedText.first().textContent();
  expect(postText).toContain(randomData.message); 
});