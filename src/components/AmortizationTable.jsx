import { formatINR } from "../utils/currency";

function AmortizationTable({ schedule }) {
  if (!schedule.length) return null;

  return (
    <section className="card shadow-sm mt-4" aria-labelledby="schedule-title">
      <div className="card-body p-0">
        <div className="p-4 pb-2">
          <h2 id="schedule-title" className="h5 mb-1">Amortization Schedule</h2>
          <p className="text-secondary small mb-0">Monthly principal, interest and outstanding balance.</p>
        </div>
        <div className="table-responsive schedule-scroll">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Payment</th>
                <th scope="col">Principal</th>
                <th scope="col">Interest</th>
                <th scope="col">Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.month}>
                  <th scope="row">{row.month}</th>
                  <td>{formatINR(row.payment)}</td>
                  <td>{formatINR(row.principalPaid)}</td>
                  <td>{formatINR(row.interest)}</td>
                  <td>{formatINR(row.closingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AmortizationTable;
