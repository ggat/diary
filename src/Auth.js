import { useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import { auth } from "./bootstrap";

export default function Auth({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setIsLoading(false);
            setUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ auth, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
