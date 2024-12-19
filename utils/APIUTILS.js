const { url } = require("../utils/urls.js");

class APIUtils {
  async getCookie(page, usermane, password) {
    await page.goto(url.loginUrl);
    await page.locator('[name="username"]').fill(usermane);
    await page.locator('[type="password"]').fill(password);
    await page.locator('[type="submit"]').click();
    await page.waitForLoadState("networkidle");
    const cookies = await page.context().cookies();
    return cookies;
  }

  async getAlredyExistEmployeesId(context) {
    const cookies = await context.cookies();
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");

    const response = await this.apiContext.get(url.listEmployeeUrl, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();
    const employeeIds = responseJson.data.map(
      (employee) => employee.employeeId
    );
    const existedEmployeeId =
      employeeIds[Math.floor(Math.random() * employeeIds.length)];
    return existedEmployeeId;
  }

  async createMessage(postBuzzPayLoad, context) {
    const cookies = await context.cookies();
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");

    const postResponse = await this.apiContext.post(url.postBuzzUrl, {
      data: postBuzzPayLoad,
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });

    const postResponseJson = await postResponse.json();
    return postResponseJson;
  }

  async addUser(postUserPayLoad, context) {
    const cookies = await context.cookies();
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");

    const postResponse = await this.apiContext.post(url.addUserUrl, {
      data: postUserPayLoad,
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });

    const postResponseJson = await postResponse.json();
    return postResponseJson;
  }

  async addEmployee(employeePayload, context) {
    const cookies = await context.cookies();
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");

    const response = await this.apiContext.post(url.listEmployeeUrl, {
      data: employeePayload,
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  async updateJobDetails(empNumber, jobDetailsPayload, context) {
    const cookies = await context.cookies();
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");

    const response = await this.apiContext.put(`${url.listEmployeeUrl}/${empNumber}/job-details`, {
      data: jobDetailsPayload,
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });
    return response
  }

  async addSupervisor(empNumber, supervisorPayload, context) {
    const cookies = await context.cookies();
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");

    const response = await this.apiContext.post(`${url.listEmployeeUrl}/${empNumber}/supervisors`, {
      data: supervisorPayload,
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });
    return response;
  }
}

module.exports = { APIUtils };
