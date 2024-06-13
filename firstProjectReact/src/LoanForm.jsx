import "./FormStyles.css";
import Modal from "./Modal";
import { useState } from "react";
import MyComponent from "./MyComponent";
import { loanInputContext } from "./contexts/LoanFormInputContext";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
export default function LoanForm() {
  const userData = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const initialName = userData.name;
  const [loanInputs, setLoanInputs] = useState({
    name: initialName,
    phoneNumber: "",
    age: "",
    isEmployee: false,
    salaryRange: "",
  });
  function handleFormSubmit(event) {
    event.preventDefault();
    setErrorMessage(null);
    const { age, phoneNumber } = loanInputs;
    if (age < 18 || age > 100) {
      setErrorMessage("The age is not allowed");
    } else if (phoneNumber.length < 10 || phoneNumber.length > 12) {
      setErrorMessage("The phone number is not valid");
    }
    setShowModal(true);
  }
  const btnIsDisabled =
    loanInputs.name == "" ||
    loanInputs.phoneNumber == "" ||
    loanInputs.age == "";
  function handleDivClick() {
    if (showModal) {
      setShowModal(false);
    }
  }
  function handlePhoneNumberInputChange(value) {
    setLoanInputs({ ...loanInputs, phoneNumber: value });
  }
  function handleNameInputChange(value) {
    setLoanInputs({ ...loanInputs, name: value });
  }
  function handleAgeInputChange(value) {
    setLoanInputs({ ...loanInputs, age: value });
  }

  return (
    <div
      onClick={handleDivClick}
      className="flex"
      style={{ flexDirection: "column" }}
    >
      <h1 style={{ color: "white" }}>Hello {userData.name}</h1>
      <form id="loan-form" className="flex" style={{ flexDirection: "column" }}>
        <h1>Requesting a Loan</h1>
        <hr></hr>
        <loanInputContext.Provider
          value={{
            value: loanInputs.name,
            handleChange: handleNameInputChange,
            labelTitle: "Name",
          }}
        >
          <MyComponent />
        </loanInputContext.Provider>
        <loanInputContext.Provider
          value={{
            value: loanInputs.phoneNumber,
            handleChange: handlePhoneNumberInputChange,
            labelTitle: "phone number",
          }}
        >
          <MyComponent />
        </loanInputContext.Provider>
        <loanInputContext.Provider
          value={{
            value: loanInputs.age,
            handleChange: handleAgeInputChange,
            labelTitle: "Age",
          }}
        >
          <MyComponent />
        </loanInputContext.Provider>
        <label style={{ marginTop: "30px" }}> Are you an employee?</label>
        <input
          type="checkbox"
          checked={loanInputs.isEmployee}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, isEmployee: event.target.checked });
          }}
        />
        <label>Salary</label>
        <select
          value={loanInputs.salaryRange}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, salaryRange: event.target.value });
          }}
        >
          <option>Less than 500$</option>
          <option>Between 500$ and 2000$</option>
          <option>Above 2000$</option>
        </select>
        <button
          className={btnIsDisabled ? "disabled" : ""}
          onClick={handleFormSubmit}
          disabled={btnIsDisabled}
          id="submit-loan-btn"
        >
          Submit
        </button>
      </form>
      <Modal errorMessage={errorMessage} isVisible={showModal} />
    </div>
  );
}
