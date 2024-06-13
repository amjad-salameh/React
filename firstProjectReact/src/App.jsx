import "./App.css";
import LoanForm from "./LoanForm";
import "./FormStyles.css";
import { UserContext } from "./contexts/UserContext";

function App() {
  return (
    <UserContext.Provider
      value={{ userName: "salameh", email: "amjad@gmail.com", name: "Amjad" }}
    >
      <div className="App" style={{ marginTop: "250px" }}>
        <LoanForm />
      </div>
    </UserContext.Provider>
  );
}

export default App;
