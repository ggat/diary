import React from "react";
import { auth } from "../bootstrap";

const AuthContext = React.createContext({ auth, user: null });
export default AuthContext;
