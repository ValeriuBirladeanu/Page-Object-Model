const { EmployeeListPage } = require("../pages/PIM/EmployeeListPage.js");
const { url } = require("../utils/urls.js");
const { expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUTILS.js");
const { dataTestAdmin: test } = require("../utils/baseDataAdmin");
const { employeePayload, jobDetailsPayload, supervisorPayload } = require("../utils/employeePayload");

let context;
let page;
let apiUtils;
let employeeDataResponseJson; 
let jobUpdateResponseJson; 
let supervisorResponseJson;

test.beforeAll(async ({ browser, validCredentials }) => {
  context = await browser.newContext();
  page = await context.newPage();
  apiUtils = new APIUtils();

  apiUtils.apiContext = await request.newContext({ baseURL: url.loginUrl });
  const cookies = await apiUtils.getCookie(page, validCredentials.username, validCredentials.password);
  await context.addCookies(cookies);
});

test.beforeEach(async () => {
  const employeeDataResponse = await apiUtils.addEmployee(employeePayload, context);
  employeeDataResponseJson = await employeeDataResponse.json();
  expect(employeeDataResponse.status()).toBe(200);

  const jobUpdateResponse = await apiUtils.updateJobDetails(employeeDataResponseJson.data.empNumber, jobDetailsPayload, context);
  jobUpdateResponseJson = await jobUpdateResponse.json();
  expect(jobUpdateResponse.status()).toBe(200);

  const supervisorResponse = await apiUtils.addSupervisor(employeeDataResponseJson.data.empNumber, supervisorPayload, context);
  supervisorResponseJson = await supervisorResponse.json();
  expect(supervisorResponse.status()).toBe(200);
});

test("Search Employee in Directory (by each search field)", async () => {
  const employeeListPage = new EmployeeListPage(page);
  await employeeListPage.goToPimMenu();
  await expect(employeeListPage.employeeInformationText).toBeVisible();

  const employeeName = `${employeeDataResponseJson.data.firstName} ${employeeDataResponseJson.data.lastName}`;
  const employeeId = employeeDataResponseJson.data.employeeId;
  const empStatus = jobUpdateResponseJson.data.empStatus;
  const supervisorName = `${supervisorResponseJson.data.supervisor.firstName} ${supervisorResponseJson.data.supervisor.middleName} ${supervisorResponseJson.data.supervisor.lastName}`;
  const jobTitle = jobUpdateResponseJson.data.jobTitle;
  const subUnit = jobUpdateResponseJson.data.subunit;

  await employeeListPage.fillEmployeeSearchFields(employeeName, employeeId, empStatus, supervisorName, jobTitle, subUnit);
  await expect(employeeListPage.countRecordFound).toHaveText("(1) Record Found");
  await expect(employeeListPage.cellsTabel.nth(1)).toHaveText(employeeDataResponseJson.data.employeeId);
  await expect(employeeListPage.cellsTabel.nth(2)).toHaveText(employeeDataResponseJson.data.firstName);
  await expect(employeeListPage.cellsTabel.nth(3)).toHaveText(employeeDataResponseJson.data.lastName);
  await expect(employeeListPage.cellsTabel.nth(4)).toHaveText(jobUpdateResponseJson.data.jobTitle.title);
  await expect(employeeListPage.cellsTabel.nth(5)).toHaveText(jobUpdateResponseJson.data.empStatus.name);
  await expect(employeeListPage.cellsTabel.nth(6)).toHaveText(jobUpdateResponseJson.data.subunit.name);
  await expect(employeeListPage.cellsTabel.nth(7)).toContainText(supervisorResponseJson.data.supervisor.firstName);
  await expect(employeeListPage.cellsTabel.nth(7)).toContainText(supervisorResponseJson.data.supervisor.lastName);
});