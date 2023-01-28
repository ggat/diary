import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Front from "./Front";
import reportWebVitals from "./reportWebVitals";
import CurrentDay from "./CurrentDay";
import { database } from "./bootstrap";
import Auth from "./Auth";
import DBContext from "./contexts/DBContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <DBContext.Provider value={database}>
            <Auth>
                <CurrentDay>
                    <Front />
                </CurrentDay>
            </Auth>
        </DBContext.Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
