function EmiForm({
  loanAmount,
  setLoanAmount,
  interestRate,
  setInterestRate,
  tenure,
  setTenure,
  onCalculate,
}) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Loan Details</h5>

        <div className="mb-3">
          <label className="form-label">Loan Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Interest Rate (%)</label>
          <input
            type="number"
            className="form-control"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Tenure (Years)</label>
          <input
            type="number"
            className="form-control"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={onCalculate}>
          Calculate EMI
        </button>
      </div>
    </div>
  );
}

export default EmiForm;
