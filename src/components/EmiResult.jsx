import { formatINR } from "../utils/currency";

function EmiResult({ summary }) {
  const principal = summary.schedule[0]?.openingBalance ?? 0;
  const interestShare = summary.totalAmount ? (summary.totalInterest / summary.totalAmount) * 100 : 0;

  return (
    <section className="card shadow-sm result-card" aria-labelledby="result-title" aria-live="polite">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <span className="section-kicker">Repayment estimate</span>
            <h2 id="result-title" className="h5 mb-0 mt-1">Your EMI breakdown</h2>
          </div>
          <span className="status-pill">Calculated</span>
        </div>

        <div className="emi-highlight mb-4">
          <span className="small text-secondary">Monthly EMI</span>
          <strong>{formatINR(summary.emi)}</strong>
        </div>

        <div className="row g-3">
          <div className="col-sm-6"><div className="metric"><span>Principal</span><strong>{formatINR(principal)}</strong></div></div>
          <div className="col-sm-6"><div className="metric"><span>Total interest</span><strong>{formatINR(summary.totalInterest)}</strong></div></div>
          <div className="col-12"><div className="metric"><span>Total amount payable</span><strong>{formatINR(summary.totalAmount)}</strong></div></div>
        </div>

        <div className="mt-4">
          <div className="d-flex justify-content-between small text-secondary mb-2">
            <span>Interest share of repayment</span><span>{interestShare.toFixed(1)}%</span>
          </div>
          <div className="progress" role="progressbar" aria-label="Interest share of total repayment" aria-valuenow={interestShare.toFixed(1)} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar" style={{ width: `${Math.min(100, interestShare)}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmiResult;
