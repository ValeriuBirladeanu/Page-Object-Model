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

    const response = await this.apiContext.get(url.responseListEmployeeUrl, {
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
}

module.exports = { APIUtils };