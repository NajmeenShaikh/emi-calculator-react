import test from "node:test";
import assert from "node:assert/strict";
import { validateLoanInput } from "./validation.js";

test("accepts valid loan input including zero interest", () => {
  assert.deepEqual(
    validateLoanInput({ loanAmount: "500000", interestRate: "0", tenure: "5" }),
    {},
  );
});

test("rejects missing and out-of-range loan values", () => {
  const errors = validateLoanInput({ loanAmount: "", interestRate: "51", tenure: "0" });

  assert.ok(errors.loanAmount);
  assert.ok(errors.interestRate);
  assert.ok(errors.tenure);
});

test("rejects decimal tenure because the UI models tenure in whole years", () => {
  const errors = validateLoanInput({ loanAmount: "500000", interestRate: "8.5", tenure: "5.5" });
  assert.ok(errors.tenure);
});
