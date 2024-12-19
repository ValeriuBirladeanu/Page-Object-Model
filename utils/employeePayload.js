const { faker } = require("@faker-js/faker");

const employeePayload = {
  firstName: faker.person.firstName(),
  middleName: "",
  lastName: faker.person.lastName(),
  empPicture: null,
  employeeId: faker.string.numeric(4),
};

const jobDetailsPayload = {
  joinedDate: null,
  jobTitleId: 23,
  empStatusId: 1,
  subunitId: 2,
};

const supervisorPayload = {
  empNumber: 7,
  reportingMethodId: 1,
};

module.exports = { employeePayload, jobDetailsPayload, supervisorPayload };
