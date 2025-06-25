import { createContext } from "react";
const UserContext = createContext({
  loginedUser: "Default User",
});
export default UserContext;
