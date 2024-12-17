const { test } = require("@playwright/test");
const { faker } = require("@faker-js/faker");

const validUserName = "Repudiandae";
const validPassword = "Pa$$w0rd!";

export const dataTestUser = test.extend({
  validCredentials: {
    username: validUserName,
    password: validPassword,
  },

  randomData: {
    password: faker.internet.password(),
   
  },
})