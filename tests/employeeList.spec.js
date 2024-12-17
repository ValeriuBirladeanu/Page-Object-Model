const { AddEmployee } = require("../pages/PIM/AddEmployeePage.js");
const { EmployeeList } = require("../pages/PIM/EmployeeListPage.js");
const { url } = require("../utils/urls.js");
const { expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUTILS.js");
const { dataTestAdmin: test } = require("../utils/baseDataAdmin");

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

// test.only("Search Employ in Directory", async ({ }) => {
//   const addEmployee = new AddEmployee(page);
//   await addEmployee.goToPimMenu();
//   await addEmployee.goToAddEmployee()
//   await addEmployee.addEmployee(
//     randomData.firstName,
//     randomData.lastName,
//     randomData.employeeId,
//   );

  // const employeeList = new EmployeeList(page);
  // await employeeList.goToPimMenu();
  // await expect(page).toHaveURL(url.employeeListUrl);
  // await expect(employeeList.employeeInformationText).toBeVisible();
  // // await addEmployee.notAddDuplicateEmployeeById(
  //   randomData.firstName,
  //   randomData.lastName,
  //   existedEmployeeId
  // );
  // await expect(page).toHaveURL(url.addEmployeeUrl);
  // await expect(addEmployee.employeeIdAlreadyExistsText).toBeVisible();
// });