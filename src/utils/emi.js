export function calculateEmi({ principal, annualRate, tenureYears }) {
  const P = Number(principal);
  const annual = Number(annualRate);
  const years = Number(tenureYears);
  const N = years * 12;

  if (
    !Number.isFinite(P) ||
    !Number.isFinite(annual) ||
    !Number.isFinite(years) ||
    !Number.isInteger(years) ||
    P <= 0 ||
    annual < 0 ||
    years <= 0 ||
    !Number.isSafeInteger(N)
  ) {
    return null;
  }

  const monthlyRate = annual / 12 / 100;
  if (monthlyRate === 0) return P / N;

  // Stable form of the standard reducing-balance EMI formula.
  const discountFactor = Math.pow(1 + monthlyRate, -N);
  const denominator = 1 - discountFactor;

  if (!Number.isFinite(discountFactor) || denominator <= 0) return null;

  return (P * monthlyRate) / denominator;
}

export function buildAmortizationSchedule({ principal, annualRate, tenureYears }) {
  const emi = calculateEmi({ principal, annualRate, tenureYears });
  const P = Number(principal);
  const years = Number(tenureYears);
  const N = years * 12;
  const monthlyRate = Number(annualRate) / 12 / 100;

  if (emi === null) return [];

  let balance = P;
  const schedule = [];

  for (let month = 1; month <= N; month += 1) {
    const openingBalance = balance;
    const interest = monthlyRate === 0 ? 0 : openingBalance * monthlyRate;

    // Adjust only the final principal component so floating-point drift
    // cannot leave a residual balance after the contractual final payment.
    const principalPaid = month === N
      ? openingBalance
      : Math.min(openingBalance, Math.max(0, emi - interest));
    const payment = principalPaid + interest;
    const closingBalance = month === N ? 0 : Math.max(0, openingBalance - principalPaid);

    schedule.push({
      month,
      payment,
      principalPaid,
      interest,
      openingBalance,
      closingBalance,
    });

    balance = closingBalance;
  }

  return schedule;
}

export function calculateLoanSummary({ principal, annualRate, tenureYears }) {
  const emi = calculateEmi({ principal, annualRate, tenureYears });
  if (emi === null) return null;

  const schedule = buildAmortizationSchedule({ principal, annualRate, tenureYears });
  const totalAmount = schedule.reduce((sum, row) => sum + row.payment, 0);
  const totalInterest = Math.max(0, totalAmount - Number(principal));

  return { emi, totalAmount, totalInterest, schedule };
}
