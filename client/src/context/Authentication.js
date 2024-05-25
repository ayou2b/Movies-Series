import { createContext } from "react";

const Authentication = createContext({
  token: "",
  isLogged: false,
  expiration: "",
});

export default Authentication;
