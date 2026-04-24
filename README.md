# 📘 Automation Countries Project – Cypress QA Suite

## 📌 Overview
This project contains an end-to-end UI test automation suite for the **Countries App**, built using **Cypress**.

The goal of this project is to validate core application functionality using **mocked backend data**, ensuring stability, speed, and independence from real APIs.

---

## 🧪 Test Coverage

The suite includes **17 automated tests** covering:

### 🔹 Landing Page
- Display landing page correctly
- Navigate to Home via ENTER button

### 🔹 Home Page
- Handle API success
- Handle API failure (network error)
- Handle empty data (404)

### 🔹 Filters
- Filter countries by continent
- Sort by population
- Sort alphabetically

### 🔹 Search
- Search countries by name

### 🔹 Pagination
- Navigate between pages
- Validate dynamic pagination behavior

### 🔹 Country Detail
- Navigate to detail page
- Validate country information
- Handle no activities
- Display activities

### 🔹 Activities Creation
- Create activity successfully
- Validate required fields
- Remove selected countries

---

## ⚙️ Tech Stack

- Cypress 15
- Mochawesome Reporter
- JavaScript (CommonJS)

---

## 🧠 Testing Strategy

### ✅ UI Testing with Mocked Data

Instead of full E2E:

- API calls are intercepted using:

```js
cy.intercept()
```

### Benefits:
- Faster execution
- Deterministic tests
- No backend dependency
- Easier debugging

---

## 📊 Reporting

This project uses **Mochawesome** for reporting.

### Features:
- HTML report generation
- Timestamped reports
- Clean separation of raw and final reports

### Example result:
- ✔ 17 tests executed
- ✔ 17 passed
- ✔ 0 failures

---

## 📁 Project Structure

```bash
cypress/
│
├── e2e/
│   ├── activities/
│   ├── home/
│   └── LandingPage.cy.js
│
├── reports/           # temporary JSON files
├── final-reports/     # final HTML reports
│   └── assets/
│
├── fixtures/
├── support/
```

## 🚀 How to Run Tests

### Open Cypress UI (Interactive Mode)
```bash
npm run cy:open
```

### Run tests headless (CLI)
```bash
npm run cy:run
```

### Run tests in headed mode (browser visible)

```bash
npm run cy:headed
```

### Run tests + generate report
```bash
npm run test:report
```

### 🧹 Reporting Workflow
Run tests → generates JSON files
Merge JSON files → report.json
Generate HTML report
Clean temporary files

Final output:

```bash
cypress/final-reports/report-YYYY-MM-DD_HH-mm-ss.html
```