import { createContext } from "react";

export let loanInputContext = createContext({
  labelTitle: "",
  handleChange: null,
  inputValue: null,
});
