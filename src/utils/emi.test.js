import test from "node:test";
import assert from "node:assert/strict";
import { buildAmortizationSchedule, calculateEmi, calculateLoanSummary } from "./emi.js";

test("calculates EMI for a standard reducing-balance loan", () => {
  const emi = calculateEmi({ principal: 500000, annualRate: 8.5, tenureYears: 5 });
  assert.ok(emi > 10000 && emi < 11000);
});

test("supports zero-interest loans", () => {
  const emi = calculateEmi({ principal: 120000, annualRate: 0, tenureYears: 1 });
  assert.equal(emi, 10000);
});

test("rejects invalid financial inputs", () => {
  assert.equal(calculateEmi({ principal: 0, annualRate: 8, tenureYears: 5 }), null);
  assert.equal(calculateEmi({ principal: 100000, annualRate: -1, tenureYears: 5 }), null);
});

test("amortization schedule reaches zero balance", () => {
  const schedule = buildAmortizationSchedule({ principal: 100000, annualRate: 12, tenureYears: 1 });
  assert.equal(schedule.length, 12);
  assert.equal(schedule.at(-1).closingBalance, 0);
});

test("loan summary reconciles repayment components", () => {
  const summary = calculateLoanSummary({ principal: 100000, annualRate: 12, tenureYears: 1 });
  assert.ok(summary.totalAmount > 100000);
  assert.ok(Math.abs(summary.totalAmount - (100000 + summary.totalInterest)) < 0.01);
});
