function EmiForm({ loanAmount, setLoanAmount, interestRate, setInterestRate, tenure, setTenure, errors, onCalculate, onReset }) {
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form className="card shadow-sm" onSubmit={onCalculate} noValidate aria-describedby={hasErrors ? "form-error-summary" : undefined}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="section-kicker">Loan details</span>
            <h2 className="h5 mb-0 mt-1">Plan your repayment</h2>
          </div>
          <span className="badge text-bg-light">INR</span>
        </div>

        {hasErrors && (
          <div id="form-error-summary" className="alert alert-danger" role="alert">
            Please correct the highlighted fields before calculating.
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="loanAmount" className="form-label">Loan amount</label>
          <div className="input-group">
            <span className="input-group-text" aria-hidden="true">₹</span>
            <input id="loanAmount" type="number" min="1" max="100000000" step="1000" inputMode="decimal" className={`form-control ${errors.loanAmount ? "is-invalid" : ""}`} value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} aria-invalid={Boolean(errors.loanAmount)} aria-describedby={errors.loanAmount ? "loanAmount-error" : undefined} />
            {errors.loanAmount && <div id="loanAmount-error" className="invalid-feedback">{errors.loanAmount}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="interestRate" className="form-label">Annual interest rate</label>
          <div className="input-group">
            <input id="interestRate" type="number" min="0" max="50" step="0.01" inputMode="decimal" className={`form-control ${errors.interestRate ? "is-invalid" : ""}`} value={interestRate} onChange={(e) => setInterestRate(e.target.value)} aria-invalid={Boolean(errors.interestRate)} aria-describedby={errors.interestRate ? "interestRate-error" : undefined} />
            <span className="input-group-text" aria-hidden="true">%</span>
            {errors.interestRate && <div id="interestRate-error" className="invalid-feedback">{errors.interestRate}</div>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tenure" className="form-label">Loan tenure</label>
          <div className="input-group">
            <input id="tenure" type="number" min="1" max="30" step="1" inputMode="numeric" className={`form-control ${errors.tenure ? "is-invalid" : ""}`} value={tenure} onChange={(e) => setTenure(e.target.value)} aria-invalid={Boolean(errors.tenure)} aria-describedby={errors.tenure ? "tenure-error" : undefined} />
            <span className="input-group-text" aria-hidden="true">years</span>
            {errors.tenure && <div id="tenure-error" className="invalid-feedback">{errors.tenure}</div>}
          </div>
        </div>

        <div className="d-grid gap-2 d-sm-flex">
          <button type="submit" className="btn btn-primary btn-lg flex-grow-1">Calculate EMI</button>
          <button type="button" className="btn btn-outline-secondary btn-lg" onClick={onReset}>Reset</button>
        </div>
        <p className="small text-secondary mt-3 mb-0">Estimates are for planning purposes; actual bank repayment schedules may vary.</p>
      </div>
    </form>
  );
}

export default EmiForm;
