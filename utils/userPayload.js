const { faker } = require("@faker-js/faker");

const newUserPayload = {
    username: faker.person.firstName(),
    password: faker.internet.password(),
    status: true,
    userRoleId: 2,
    empNumber: 7,
  };
  module.exports = { newUserPayload };