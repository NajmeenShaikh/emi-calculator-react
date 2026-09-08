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
- Reset-to-default interaction
- Automated tests for core financial calculations

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
Validation Utility
   ↓
EMI Calculation Utility
   ↓
Loan Summary + Amortization Schedule
   ↓
EmiResult + AmortizationTable
```

Calculation logic is intentionally separated from UI components in `src/utils/emi.js`, while validation rules live in `src/utils/validation.js`. This keeps financial rules easier to review and test.

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
│   └── validation.js
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

Tests:

```bash
npm test
```

## Automated test coverage

The financial calculation layer has executable tests covering:

- Standard positive-interest EMI
- `0%` interest loan
- Invalid financial inputs
- Amortization reaching a zero closing balance
- Principal + interest reconciliation

## Production considerations

This is an educational/portfolio implementation, not an authoritative banking repayment engine. A production banking application should obtain approved product rules from backend services, perform server-side validation, define rounding conventions with the financial domain team, and reconcile calculations with the institution's source-of-truth loan or ledger service.

## Future enhancements

- React Testing Library component tests
- API-backed loan product configuration
- Prepayment / part-payment simulation
- Loan comparison mode
- Principal-vs-interest visualization
- Exportable repayment schedule
- GitHub Actions CI
- TypeScript migration for the UI layer

## Portfolio positioning

**Domain:** Banking / FinTech / Personal Finance  
**Frontend:** React, JavaScript ES6+, Bootstrap, Vite  
**Engineering:** Financial calculations, validation, accessibility, responsive design, testing, separation of concerns

## Author

**Najmeen Shaikh** — React UI Frontend Developer

GitHub: https://github.com/NajmeenShaikh
