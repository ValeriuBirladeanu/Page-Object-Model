const { AddEmployee } = require("../pages/PIM/AddEmployeePage.js");
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

test("Verify that duplicate employee IDs are not allowed", async ({
  randomData, 
}) => {
  const addEmployee = new AddEmployee(page);
  await addEmployee.goToPimMenu();
  const existedEmployeeId = await apiUtils.getAlredyExistEmployeesId(context);
  await addEmployee.goToAddEmployee();
  await expect(page).toHaveURL(url.addEmployeeUrl);
  await expect(addEmployee.addEmployeeText).toBeVisible();
  await addEmployee.notAddDuplicateEmployeeById(
    randomData.firstName,
    randomData.lastName,
    existedEmployeeId
  );
  await expect(page).toHaveURL(url.addEmployeeUrl);
  await expect(addEmployee.employeeIdAlreadyExistsText).toBeVisible();
});