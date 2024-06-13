import { useContext } from "react";
import { loanInputContext } from "./contexts/LoanFormInputContext";
import{ UserContext } from "./contexts/UserContext";

export default function MyInput() {
  const inputContext = useContext(loanInputContext);
  const userData = useContext(UserContext);


  return (
    <>
      <div>
        <div></div>
        <label>{userData.name} {inputContext.labelTitle}</label>
        <input
          value={inputContext.value}
          onChange={(event) => {
            inputContext.handleChange(event.target.value);
          }}
        />
      </div>
    </>
  );
}
