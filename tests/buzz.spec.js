const { APIUtils } = require("../utils/APIUTILS.js");
const { BuzzPage } = require("../pages/BuzzPage");
const { url } = require("../utils/urls.js");
const { expect, request } = require("@playwright/test");
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

test("Add and delete Newsfeed", async ({ randomData }) => {
  const buzzPage = new BuzzPage(page);
  await buzzPage.goToBuzzMenu();
  await expect(page).toHaveURL(url.buzzUrl);
  await expect(buzzPage.buzzNewsfeedText).toBeVisible();

  const postedMessage = await buzzPage.addNewsfeed(randomData.message);
  console.log(postedMessage);
  await page.reload();
  const extractedPostedBuzz = await buzzPage.extractNewsfeeds();

  console.log("extractedPostedBuzz:", extractedPostedBuzz);
  expect(extractedPostedBuzz).toContain(postedMessage.text);

  await buzzPage.deleteNewsfeed(postedMessage.text);

  const updatedPostedMessage = await buzzPage.extractNewsfeeds();
  console.log("updatedPostedMessage:", updatedPostedMessage);
  expect(updatedPostedMessage).not.toContain(postedMessage.texe);
});

test("Add message in Buzz", async ({ randomData }) => {
  const buzzPage = new BuzzPage(page);
  await buzzPage.goToBuzzMenu();
  await expect(page).toHaveURL(url.buzzUrl);
  await expect(buzzPage.buzzNewsfeedText).toBeVisible();

  const postBuzzPayLoad = {
    type: "text",
    text: randomData.message,
  };

  await apiUtils.createMessage(postBuzzPayLoad, context);
  await page.reload();

  const postText = await buzzPage.postedText.first().textContent();
  expect(postText).toContain(randomData.message);
});