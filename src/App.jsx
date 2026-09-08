import { useMemo, useState } from "react";
import EmiForm from "./components/EmiForm";
import EmiResult from "./components/EmiResult";
import AmortizationTable from "./components/AmortizationTable";
import { calculateLoanSummary } from "./utils/emi";

function App() {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenure, setTenure] = useState("5");
  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState(null);

  const validation = useMemo(() => {
    const next = {};
    const amount = Number(loanAmount);
    const rate = Number(interestRate);
    const years = Number(tenure);

    if (!loanAmount || !Number.isFinite(amount) || amount <= 0) next.loanAmount = "Enter a loan amount greater than ₹0.";
    if (interestRate === "" || !Number.isFinite(rate) || rate < 0 || rate > 50) next.interestRate = "Enter an interest rate between 0% and 50%.";
    if (!tenure || !Number.isFinite(years) || years <= 0 || years > 30) next.tenure = "Enter a tenure between 1 and 30 years.";
    return next;
  }, [loanAmount, interestRate, tenure]);

  const calculate = (event) => {
    event.preventDefault();
    if (Object.keys(validation).length) {
      setErrors(validation);
      setSummary(null);
      return;
    }

    setErrors({});
    setSummary(calculateLoanSummary({ principal: loanAmount, annualRate: interestRate, tenureYears: tenure }));
  };

  return (
    <main className="app-shell">
      <div className="container py-5">
        <header className="text-center mb-4">
          <span className="eyebrow">Personal Finance • Banking</span>
          <h1 className="display-6 fw-bold mt-2 mb-2">EMI Calculator</h1>
          <p className="lead text-secondary mx-auto intro">Estimate your monthly loan payment, total interest and complete repayment schedule.</p>
        </header>

        <div className="row g-4 align-items-start">
          <div className="col-lg-5">
            <EmiForm
              loanAmount={loanAmount}
              setLoanAmount={setLoanAmount}
              interestRate={interestRate}
              setInterestRate={setInterestRate}
              tenure={tenure}
              setTenure={setTenure}
              errors={errors}
              onCalculate={calculate}
            />
          </div>
          <div className="col-lg-7">
            {summary ? (
              <EmiResult summary={summary} />
            ) : (
              <section className="card shadow-sm empty-result" aria-live="polite">
                <div className="card-body p-4 text-center">
                  <h2 className="h5">Your repayment estimate</h2>
                  <p className="text-secondary mb-0">Enter your loan details and calculate EMI to see the financial breakdown.</p>
                </div>
              </section>
            )}
          </div>
        </div>

        {summary && <AmortizationTable schedule={summary.schedule} />}
      </div>
    </main>
  );
}

export default App;
