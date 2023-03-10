import "./Front.css";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useMemo, useState } from "react";
import PerformanceRadarChart from "./PerformanceRadarChart";
import { dayToDateTimeObj, toDateString } from "./utils/day-to-date-time-obj";
import { tsToDays } from "./utils/current-day";
import AuthContext from "./contexts/AuthContext";
import firebase from "firebase/compat/app";
import { ui } from "./bootstrap";
import Skull from "./icons/Skull";
import Card from "./Card";
import DBContext from "./contexts/DBContext";
import CurrentDayContext from "./contexts/CurrentDayContext";

function Front() {
    const { user, auth, isLoading: isAuthLoading } = useContext(AuthContext);
    const db = useContext(DBContext);
    const currentDay = useContext(CurrentDayContext);

    const [entries, setEntries] = useState(null);
    // Header stuff
    const totalDays = useMemo(() => {
        // 72 Georgian average lifetime
        return 365 * 72;
    }, []);
    const daysPassed = useMemo(() => {
        return currentDay - tsToDays(629775360000);
    }, [currentDay]);
    const daysLeft = useMemo(() => {
        return totalDays - daysPassed;
    }, [daysPassed, totalDays]);

    // Header stuff end
    const list = useMemo(() => {
        const mapForUI = ({ day, content }) => ({
            day,
            dateString: toDateString(dayToDateTimeObj(day)),
            content,
        });

        const res = [];
        for (let i = currentDay; i >= currentDay - 10; i--) {
            const dayEntry =
                entries && entries.find((entry) => entry.day === i);
            const day = mapForUI(dayEntry ? dayEntry : { day: i });
            res.push(day);
        }

        return res;
    }, [entries, currentDay]);

    useEffect(() => {
        if (db && !isAuthLoading && user) {
            const q = query(
                collection(db, "days"),
                orderBy("day", "desc"),
                limit(10)
            );
            getDocs(q).then((snapshot) => {
                const entries = [];
                snapshot.forEach((doc) => {
                    entries.push(doc.data());
                });
                setEntries(entries);
            });
        }
    }, [db, isAuthLoading, user]);

    useEffect(() => {
        if (!isAuthLoading && !user) {
            ui.start("#firebaseui-auth-container", {
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                ],
                callbacks: {
                    signInSuccessWithAuthResult: () => false,
                },
            });
        }
    }, [user, isAuthLoading]);

    if (isAuthLoading) {
        return "Checking Auth...";
    }

    if (!user) {
        return <div id="firebaseui-auth-container"></div>;
    }

    if (user && user.email !== "g.gatenashvili@gmail.com") {
        return (
            <div>
                <div>Authenticated user has no rights to see the content.</div>
                <button className="skull-button" onClick={() => auth.signOut()}>
                    Sign out
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="header">
                <button className="skull-button" onClick={() => auth.signOut()}>
                    <Skull />
                </button>
                <div className="author">
                    <div>{user?.email}</div>
                    <div>{daysPassed}</div>
                </div>
                <div className="progress">
                    <div className="progress-numbers">
                        <div>{daysPassed}</div>
                        <div>{daysLeft}</div>
                    </div>
                    <div
                        className="progress-inner"
                        style={{
                            width: `${(daysPassed / totalDays) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>
            <div className="list">
                {list.map((entry) => (
                    <Card key={entry.day} entry={entry} db={db} />
                ))}
            </div>
            <div className="data">
                <div className="month"></div>
                <PerformanceRadarChart />
            </div>
        </div>
    );
}

export default Front;
