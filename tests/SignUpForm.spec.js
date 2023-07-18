import { test, expect } from "@playwright/test";

test.describe("Sign Up Form Testing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "Sign Up" }).click();
  });

  test("Fields are email and password", async ({ page }) => {
    await expect(page).toHaveScreenshot("FieldsArePresent.png");
  });

  test("Email and Password are empty but untouched", async ({ page }) => {
    await expect(page).toHaveScreenshot("InputEmptyAndUntouched.png");
  });

  test("Email and Password are empty and touched", async ({ page }) => {
    await page.getByLabel("email").focus();
    await page.getByLabel("email").blur();
    await page.getByLabel("password").focus();
    await page.getByLabel("password").blur();
    await expect(page).toHaveScreenshot("InputEmptyAndTouched.png");
  });

  test("Email is empty and touched", async ({ page }) => {
    await page.getByLabel("email").focus();
    await page.getByLabel("email").blur();
    await expect(page).toHaveScreenshot("EmailIsEmptyAndTouched.png");
  });

  test("Email is not empty and not in email format", async ({ page }) => {
    await page.getByLabel("email").fill("pratikbhangale");
    await page.getByLabel("email").blur();
    await expect(page).toHaveScreenshot("EmailIsNotEmptyButInvalidFormat.png");
  });

  test("Email in valid format", async ({ page }) => {
    await page.getByLabel("email").fill("pratikbhangale@gmail.com");
    await page.getByLabel("email").blur();
    await expect(page).toHaveScreenshot("EmailInValidFormat.png");
  });

  test("Password is empty and touched", async ({ page }) => {
    await page.getByLabel("password").focus();
    await page.getByLabel("password").blur();
    await expect(page).toHaveScreenshot("PasswordIsEmptyAndTouched.png");
  });

  test("Password is less than six characters", async ({ page }) => {
    await page.getByLabel("password").fill("1234");
    await page.getByLabel("password").blur();
    await expect(page).toHaveScreenshot("PasswordIsLessThanSixCharacters.png");
  });

  test("Password is equal to six characters", async ({ page }) => {
    await page.getByLabel("password").fill("123456");
    await page.getByLabel("password").blur();
    await expect(page).toHaveScreenshot("PasswordIsEqualToSixCharacters.png");
  });

  test("Password is equal to or more than six characters", async ({ page }) => {
    await page.getByLabel("password").fill("1234567");
    await page.getByLabel("password").blur();
    await expect(page).toHaveScreenshot("PasswordIsMoreThanSixCharacters.png");
  });

  test("Login Form is valid", async ({ page }) => {
    await page.getByLabel("email").fill("pratikbhangale760@gmail.com");
    await page.getByLabel("password").fill("Pratik@123");
    await expect(page).toHaveScreenshot("ValidForm.png");
  });

  test("Log In button is working", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveScreenshot("LogInPage.png");
  });

  test("After putting correct data, task list is shown", async ({ page }) => {
    await page.route("**/signup", (route) => {
      route.fulfill({
        status: 200,
        body: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk1NzE4MGJiZDU1NzMzYjBkMjUyMjkiLCJpYXQiOjE2ODkwODk1MzMsImV4cCI6MTY4OTA5MzEzM30.WPPTRIYMF2Vj3EkgHKqvRXLzijTSS9BOovS4RykCG-Q",
      });
    });

    await page.route("http://localhost:8080/tasks", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            _id: "649c90b298ac6e2b306c05f1",
            date: "",
            time: "",
            title: "first title",
            details: "",
            createdBy: "64957180bbd55733b0d25229",
            __v: 0,
          },
        ]),
      });
    });

    await page.getByLabel("email").fill("pratikbhangale760@gmail.com");
    await page.getByLabel("password").fill("Pratik@123");
    await page.getByRole("button", { name: "Signup" }).click();
    await expect(page).toHaveScreenshot("TaskListShown.png");
  });
});
