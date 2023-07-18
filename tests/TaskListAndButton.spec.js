import { test, expect } from "@playwright/test";

test.describe("Testing Task Listing", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/login", (route) => {
      route.fulfill({
        status: 200,
        body: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk1NzE4MGJiZDU1NzMzYjBkMjUyMjkiLCJpYXQiOjE2ODkwODk1MzMsImV4cCI6MTY4OTA5MzEzM30.WPPTRIYMF2Vj3EkgHKqvRXLzijTSS9BOovS4RykCG-Q",
      });
    });

    await page.route("http://localhost:8080/tasks", (route) => {
      if (route.request().method() === "GET") {
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
      }
    });

    await page.goto("http://localhost:3000/");
    await page.getByLabel("email").fill("pratikbhangale760@gmail.com");
    await page.getByLabel("password").fill("Pratik@123");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Default Task From Backend", async ({ page }) => {
    await expect(page).toHaveScreenshot("TaskFromBackend.png");
  });

  test("New Task Addition", async ({ page }) => {
    await page.getByRole("button", { name: "+" }).click();
    await page.getByLabel("title").fill("First Task");
    await page.route("http://localhost:8080/tasks", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            _id: "649c90b298ac6e2b306c05g1",
            date: "",
            time: "",
            title: "First Task",
            details: "",
            createdBy: "64957180bbd55733b0d25239",
            __v: 0,
          },
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
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page).toHaveScreenshot("NewTaskAddition.png");
  });

  test("Task Update", async ({ page }) => {
    const rowLocator = page.locator("div.d-flex.justify-content-between");
    // ...
    await rowLocator.filter({ hasText: "first title" });
    await rowLocator.getByRole("button", { name: "Update" }).click();
    // await page.getByRole("button", { name: "Update" }).click();
    await page.getByLabel("title").fill("second title");
    await page.route("http://localhost:8080/tasks", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            _id: "649c90b298ac6e2b306c05f1",
            date: "",
            time: "",
            title: "second title",
            details: "",
            createdBy: "64957180bbd55733b0d25229",
            __v: 0,
          },
        ]),
      });
    });
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page).toHaveScreenshot("TaskUpdated.png");
  });

  test("Task Deletion", async ({ page }) => {
    const rowLocator = page.locator("div.d-flex.justify-content-between");
    await page.route("http://localhost:8080/tasks/*", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify("Task deleted successfully"),
      });
    });
    await rowLocator.filter({ hasText: "first title" });
    await rowLocator.getByRole("button", { name: "Delete" }).click();

    await expect(page).toHaveScreenshot("TaskDeleted.png");
  });
});
