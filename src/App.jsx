import { useState } from "react";
import EmiForm from "./components/EmiForm";
import EmiResult from "./components/EmiResult";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");

  const [emi, setEmi] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEmi = () => {
    const P = Number(loanAmount);
    const R = Number(interestRate) / 12 / 100;
    const N = Number(tenure) * 12;

    if (!P || !R || !N) {
      alert("Please enter valid values");
      return;
    }

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    const totalPayable = emiValue * N;
    const interest = totalPayable - P;

    setEmi(emiValue.toFixed(2));
    setTotalAmount(totalPayable.toFixed(2));
    setTotalInterest(interest.toFixed(2));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">EMI Calculator</h2>

      <EmiForm
        loanAmount={loanAmount}
        setLoanAmount={setLoanAmount}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        tenure={tenure}
        setTenure={setTenure}
        onCalculate={calculateEmi}
      />

      {emi && (
        <EmiResult
          emi={emi}
          totalAmount={totalAmount}
          totalInterest={totalInterest}
        />
      )}
    </div>
  );
}

export default App;
