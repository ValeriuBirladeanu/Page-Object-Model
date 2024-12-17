const { test } = require("@playwright/test");
const { faker } = require("@faker-js/faker");

const validUserName = "Admin";
const validPassword = "admin123";

export const dataTestAdmin = test.extend({
  validCredentials: {
    username: validUserName,
    password: validPassword,
  },
  invalidCredential1: {
    username: validUserName,
    password: faker.internet.password(),
    description: "Valid username, invalid password",
  },
  invalidCredential2: {
    username: faker.person.firstName(),
    password: validPassword,
    description: "Invalid username, valid password",
  },
  invalidCredential3: {
    username: faker.person.firstName(),
    password: faker.internet.password(),
    description: "Invalid username, invalid password",
  },
  blankFields1: {
    username: faker.person.firstName(),
    password: "",
    description: "Username valid, password left blank",
  },
  blankFields2: {
    username: "",
    password: faker.internet.password(),
    description: "Password valid, username left blank",
  },
  blankFields3: {
    username: "",
    password: "",
    description: "Both username and password are blank",
  },
  randomData: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password(),
    message: faker.lorem.sentence(),
    employeeId: faker.string.numeric(4),
    jobTitle: faker.person.jobTitle(),
  },
});