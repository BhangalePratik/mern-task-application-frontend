/* eslint-disable max-classes-per-file */
import { test, expect } from "@playwright/test";

test.describe("New Task Form Test Cases", () => {
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
          body: JSON.stringify([]),
        });
      }
    });

    await page.goto("http://localhost:3000/");
    await page.getByLabel("email").fill("pratikbhangale760@gmail.com");
    await page.getByLabel("password").fill("Pratik@123");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "+" }).click();
  });

  //   test("Putting older date", async ({ page }) => {
  //     await page.getByLabel("title").fill("Second Task");
  //     await page.getByLabel("date").fill("2023-06-06");
  //     await page.getByLabel("date").blur();
  //     await expect(page).toHaveScreenshot("OlderDateInTaskForm.png");
  //   });

  //   test("Putting tomorrow date", async ({ page }) => {
  //     await page.getByLabel("title").fill("Second Task");
  //     // eslint-disable-next-line prettier/prettier
  //     await page.getByLabel("date").fill("2023-07-11");
  //     await page.getByLabel("date").blur();
  //     await expect(page).toHaveScreenshot("TomorrowDateInTaskForm.png");
  //   });

  //   test("Putting today's date and time before execution", async ({ page }) => {
  //     await page.getByLabel("title").fill("Second Task");
  //     // eslint-disable-next-line prettier/prettier
  //     const d = new Date();
  //     d.setHours(d.getHours() - 1);
  //     let [date, time] = d.toISOString().split("T");
  //     time = time.slice(0, 5);
  //     await page.getByLabel("date").fill(date);
  //     await page.getByLabel("date").blur();
  //     // await page.getByLabel("time").fill("12:12");
  //     await expect(page).toHaveScreenshot("TodayDateAndTimeBeforeExecution.png");
  //   });

  //   test("Putting today's date and time after execution", async ({ page }) => {
  //     await page.getByLabel("title").fill("Second Task");
  //     // eslint-disable-next-line prettier/prettier
  //     const d = new Date();
  //     d.setHours(d.getHours() + 1);
  //     await page.getByLabel("date").fill(d.toDateString());
  //     await page.getByLabel("date").blur();
  //     await page.getByLabel("time").fill(d.toTimeString());
  //     await page.getByLabel("time").blur();
  //     await expect(page).toHaveScreenshot("TodayDateAndTimeAfterExecution.png");
  //   });

  test("Not entering title", async ({ page }) => {
    await page.getByLabel("title").focus();
    await page.getByLabel("title").blur();
    await expect(page).toHaveScreenshot("EmptyTitle.png");
  });

  test("Entering title more than 30 characters", async ({ page }) => {
    await page.getByLabel("title").fill("a".repeat(31));
    await page.getByLabel("title").blur();
    await expect(page).toHaveScreenshot("LengthyTitle.png");
  });

  test("Entering 30 characters title", async ({ page }) => {
    await page.getByLabel("title").fill("a".repeat(30));
    await page.getByLabel("title").blur();
    await expect(page).toHaveScreenshot("ValidTitle.png");
  });

  test("Entering details more than 250 characters", async ({ page }) => {
    await page.getByLabel("title").fill("a".repeat(30));
    await page.getByLabel("details").fill("a".repeat(251));
    await page.getByLabel("details").blur();
    await expect(page).toHaveScreenshot("LengthyDetails.png");
  });

  test("Entering 250 characters details", async ({ page }) => {
    await page.getByLabel("title").fill("a".repeat(30));
    await page.getByLabel("details").fill("a".repeat(250));
    await page.getByLabel("details").blur();
    await expect(page).toHaveScreenshot("ValidDetails.png");
  });

  test("Adding task list after putting valid data", async ({ page }) => {
    // eslint-disable-next-line prettier/prettier
    const title = "a".repeat(30);
    const details = "a".repeat(250);

    // await page.getByLabel("date").fill("2023-07-11");
    // await page.getByLabel("time").fill(d.toTimeString());
    await page.getByLabel("title").fill(title);
    await page.getByLabel("details").fill(details);

    await page.route("http://localhost:8080/tasks", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            _id: "649c90b298ac6e2b306c05h1",
            date: "",
            time: "",
            title,
            details,
            createdBy: "64957180bbd55733b0d25239",
            __v: 0,
          },
        ]),
      });
    });
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page).toHaveScreenshot("ValidDataInserted.png");
  });
});
