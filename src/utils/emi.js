export function calculateEmi({ principal, annualRate, tenureYears }) {
  const P = Number(principal);
  const annual = Number(annualRate);
  const N = Number(tenureYears) * 12;

  if (!Number.isFinite(P) || !Number.isFinite(annual) || !Number.isFinite(N) || P <= 0 || annual < 0 || N <= 0) {
    return null;
  }

  const monthlyRate = annual / 12 / 100;
  if (monthlyRate === 0) return P / N;

  const factor = Math.pow(1 + monthlyRate, N);
  return (P * monthlyRate * factor) / (factor - 1);
}

export function buildAmortizationSchedule({ principal, annualRate, tenureYears }) {
  const emi = calculateEmi({ principal, annualRate, tenureYears });
  const P = Number(principal);
  const N = Number(tenureYears) * 12;
  const monthlyRate = Number(annualRate) / 12 / 100;

  if (emi === null) return [];

  let balance = P;
  const schedule = [];

  for (let month = 1; month <= N && balance > 0.005; month += 1) {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPaid = Math.min(balance, emi - interest);
    const payment = principalPaid + interest;
    const closingBalance = Math.max(0, balance - principalPaid);

    schedule.push({
      month,
      payment,
      principalPaid,
      interest,
      openingBalance: balance,
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
