export function validateLoanInput({ loanAmount, interestRate, tenure }) {
  const errors = {};
  const amount = Number(loanAmount);
  const rate = Number(interestRate);
  const years = Number(tenure);

  if (!loanAmount || !Number.isFinite(amount) || amount <= 0 || amount > 100000000) {
    errors.loanAmount = "Enter a loan amount between ₹1 and ₹10 crore.";
  }

  if (interestRate === "" || !Number.isFinite(rate) || rate < 0 || rate > 50) {
    errors.interestRate = "Enter an annual interest rate between 0% and 50%.";
  }

  if (!tenure || !Number.isFinite(years) || !Number.isInteger(years) || years < 1 || years > 30) {
    errors.tenure = "Enter a whole-number tenure between 1 and 30 years.";
  }

  return errors;
}
