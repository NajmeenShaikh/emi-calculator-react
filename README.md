# EMI Calculator — React Financial Application

A production-minded EMI calculator for banking and personal-finance use cases, built with React, Vite and Bootstrap. The application separates financial rules from UI concerns and demonstrates validation, accessibility, repayment analytics, automated testing and CI.

## Business use case

Loan customers need a quick way to estimate affordability before applying for a personal, home or vehicle loan. This project demonstrates a realistic frontend feature that could sit inside a banking or fintech loan journey.

## Features

- Loan amount, annual interest rate and tenure inputs
- Accessible client-side validation and error messaging
- Standard reducing-balance EMI calculation
- Explicit `0%` interest handling
- Stable EMI formula implementation for numeric edge cases
- Month-by-month amortization schedule
- Final-payment adjustment to eliminate floating-point residual balance
- Principal, total interest and total repayment summary
- Interest-share visualization
- INR formatting using `Intl.NumberFormat`
- Responsive Bootstrap UI
- Semantic headings, labels, table headers and keyboard-friendly controls
- Reset-to-default interaction
- Automated unit tests for calculation and validation rules
- GitHub Actions CI for lint, tests and production build

## EMI formula

For a reducing-balance loan:

`EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)`

The implementation uses the equivalent numerically stable form:

`EMI = P × r / (1 − (1 + r)^−n)`

Where:

- `P` = principal loan amount
- `r` = monthly interest rate (`annual rate / 12 / 100`)
- `n` = total number of monthly payments (`whole-number years × 12`)

When the annual interest rate is `0%`, the application uses `P / n` to avoid division by zero.

## Architecture

```text
User Input
   ↓
EmiForm
   ↓
Validation Utility
   ↓
Financial Calculation Utility
   ↓
Loan Summary + Amortization Schedule
   ↓
EmiResult + AmortizationTable
```

Financial logic is isolated in `src/utils/emi.js`, while input rules live in `src/utils/validation.js`. This keeps business rules independently testable and easier for another engineer to review.

## Project structure

```text
src/
├── components/
│   ├── AmortizationTable.jsx
│   ├── EmiForm.jsx
│   └── EmiResult.jsx
├── utils/
│   ├── currency.js
│   ├── emi.js
│   ├── emi.test.js
│   ├── validation.js
│   └── validation.test.js
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
- Node.js built-in test runner
- GitHub Actions

## Engineering decisions

### 1. Keep calculation logic outside React components

The UI collects and displays data; the calculation utility owns the financial rules. This makes the core logic easy to unit test without rendering React components.

### 2. Validate at the UI boundary and calculation boundary

The form enforces product-facing constraints such as ₹1–₹10 crore, 0–50% annual interest and 1–30 whole years. The calculation utility independently rejects invalid numeric inputs so it does not rely on the UI being the only caller.

### 3. Avoid rounding during financial calculations

Intermediate values remain full JavaScript numbers rather than being rounded for display. Currency formatting is applied only when values are rendered. A production banking implementation should agree with the backend/domain team on currency precision and monthly rounding rules.

### 4. Reconcile the final amortization payment

Floating-point arithmetic can leave a tiny residual balance. The schedule therefore forces the contractual final closing balance to zero and adjusts only the final principal component. This keeps the schedule deterministic without rounding every intermediate calculation.

## Automated tests

The test suite covers:

- Standard positive-interest EMI
- `0%` interest
- Invalid principal/rate/tenure values
- Numeric-string input normalization
- Whole-number tenure requirement
- Exact contractual schedule length
- Final zero balance
- Principal and interest component reconciliation
- Loan summary reconciliation
- Loan input validation and range checks

Run locally:

```bash
npm test
npm run lint
npm run build
```

## CI

GitHub Actions runs on pushes and pull requests targeting `main` and executes:

1. `npm ci`
2. `npm run lint`
3. `npm test`
4. `npm run build`

The repository also keeps dependency versions managed through the committed npm lockfile so CI installs are reproducible.

## Production considerations

This is an educational/portfolio implementation, not an authoritative banking repayment engine. A production banking application should obtain approved loan-product rules from backend services, perform server-side validation, define rounding conventions with the financial domain team, handle taxes/fees/insurance where applicable, and reconcile calculations with the institution's source-of-truth loan or ledger service.

## Future enhancements

- React Testing Library component tests
- API-backed loan-product configuration
- Prepayment / part-payment simulation
- Loan comparison mode
- Principal-vs-interest chart
- Exportable repayment schedule
- TypeScript migration for the UI layer

## Portfolio positioning

**Domain:** Banking / FinTech / Personal Finance  
**Frontend:** React, JavaScript ES6+, Bootstrap, Vite  
**Engineering:** Financial calculations, validation, accessibility, responsive design, automated testing, CI, separation of concerns

### Recruiter takeaway

This project demonstrates that I can take a financial UI requirement and turn it into a maintainable frontend feature: **controlled inputs → validation → domain calculation → deterministic amortization → accessible presentation → automated tests → CI**.

## Author

**Najmeen Shaikh** — React UI Frontend Developer

GitHub: https://github.com/NajmeenShaikh
