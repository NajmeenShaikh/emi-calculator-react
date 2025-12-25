function EmiResult({ emi, totalAmount, totalInterest }) {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title text-success">EMI Details</h5>

        <p>
          <strong>Monthly EMI:</strong> ₹ {emi}
        </p>
        <p>
          <strong>Total Interest:</strong> ₹ {totalInterest}
        </p>
        <p>
          <strong>Total Amount Payable:</strong> ₹ {totalAmount}
        </p>
      </div>
    </div>
  );
}

export default EmiResult;
