# EMI Calculator — React Financial Application

A production-minded EMI calculator for banking and personal-finance use cases, built with React, Vite and Bootstrap. The application combines financial calculation logic with accessible form validation, repayment analytics and a complete amortization schedule.

## Business use case

Loan customers need a quick way to estimate affordability before applying for a personal, home or vehicle loan. This application demonstrates the type of frontend feature commonly embedded in banking and fintech journeys.

## Features

- Loan amount, annual interest rate and tenure inputs
- Client-side validation with accessible error messaging
- Zero-interest edge-case handling
- Monthly EMI calculation using the standard reducing-balance formula
- Total principal, interest and repayment amount
- Interest-share visualization
- Month-by-month amortization schedule
- INR formatting using `Intl.NumberFormat`
- Responsive Bootstrap UI
- Semantic headings, labels, table headers and focus states
- No `alert()`-based validation; errors stay in the application UI

## EMI formula

For a reducing-balance loan:

`EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)`

Where:

- `P` = principal loan amount
- `r` = monthly interest rate (`annual rate / 12 / 100`)
- `n` = total number of monthly payments (`years × 12`)

When the annual interest rate is `0%`, the application uses `P / n` to avoid division by zero.

## Architecture

```text
User Input
   ↓
EmiForm
   ↓
Validation
   ↓
EMI Calculation Service
   ↓
Loan Summary + Amortization Schedule
   ↓
EmiResult + AmortizationTable
```

Calculation logic is intentionally separated from UI components in `src/utils/emi.js`, making the financial rules easier to review and test.

## Project structure

```text
src/
├── components/
│   ├── AmortizationTable.jsx
│   ├── EmiForm.jsx
│   └── EmiResult.jsx
├── utils/
│   ├── currency.js
│   └── emi.js
├── App.jsx
├── main.jsx
└── index.css
```

## Tech stack

- React 19
- JavaScript ES6+
- Vite
- Bootstrap 5
- HTML5 / CSS3
- ESLint

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Quality and testing strategy

The calculation layer is designed to be unit-tested independently from the UI. Recommended test cases include:

- Standard positive-interest loan
- `0%` interest loan
- Invalid/negative inputs
- Very short tenure
- Long tenure
- Final amortization balance rounding
- Principal + interest totals matching the repayment amount

Automated tests are **not claimed as implemented yet**; adding Vitest + React Testing Library is the next quality-hardening step.

## Production roadmap

- Add Vitest and React Testing Library coverage
- Add TypeScript domain models for loan calculations
- Add API/service integration for bank-specific rate and product data
- Add URL/shareable calculation state where appropriate
- Add visual regression/accessibility checks in CI
- Add authenticated loan-product recommendations in a real banking environment

## Portfolio positioning

This project demonstrates frontend engineering beyond a basic calculator: financial domain logic, edge-case handling, separation of concerns, accessibility, responsive UI and explainable repayment data.
