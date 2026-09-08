import { useMemo, useState } from "react";
import EmiForm from "./components/EmiForm";
import EmiResult from "./components/EmiResult";
import AmortizationTable from "./components/AmortizationTable";
import { calculateLoanSummary } from "./utils/emi";
import { validateLoanInput } from "./utils/validation";

const DEFAULTS = { loanAmount: "500000", interestRate: "8.5", tenure: "5" };

function App() {
  const [loanAmount, setLoanAmount] = useState(DEFAULTS.loanAmount);
  const [interestRate, setInterestRate] = useState(DEFAULTS.interestRate);
  const [tenure, setTenure] = useState(DEFAULTS.tenure);
  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState(null);

  const input = useMemo(() => ({ loanAmount, interestRate, tenure }), [loanAmount, interestRate, tenure]);

  const calculate = (event) => {
    event.preventDefault();
    const nextErrors = validateLoanInput(input);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setSummary(null);
      return;
    }

    setErrors({});
    setSummary(calculateLoanSummary({ principal: loanAmount, annualRate: interestRate, tenureYears: tenure }));
  };

  const reset = () => {
    setLoanAmount(DEFAULTS.loanAmount);
    setInterestRate(DEFAULTS.interestRate);
    setTenure(DEFAULTS.tenure);
    setErrors({});
    setSummary(null);
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
              onReset={reset}
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
