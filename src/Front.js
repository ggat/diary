import "./Front.css";
import { useContext, useEffect, useMemo } from "react";
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
import usePaginatedCardList from "./hooks/usePaginatedCardList";
import useDetectScrollToBottom from "./hooks/useDetectScrollToBottom";

function Front() {
    const { user, auth, isLoading: isAuthLoading } = useContext(AuthContext);
    const db = useContext(DBContext);
    const currentDay = useContext(CurrentDayContext);

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

    const { entries, loadMore, loading } = usePaginatedCardList(isAuthLoading || !user);

    useDetectScrollToBottom(loadMore);

    // Header stuff end
    const list = useMemo(() => {
        const mapForUI = ({ day, content }) => ({
            day,
            dateString: toDateString(dayToDateTimeObj(day)),
            content,
        });

        const res = [];
        const earliestLoadedDayNum = entries[entries.length - 1]?.day;
        for (let i = currentDay; i >= earliestLoadedDayNum && entries.length; i--) {
            const dayEntry =
                entries && entries.find((entry) => entry.day === i);
            const day = mapForUI(dayEntry ? dayEntry : { day: i });
            res.push(day);
        }

        return res;
    }, [entries, currentDay]);

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

    console.log('loading', loading)

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
            {loading && <div style={{
                position: "fixed",
                top: 0,
                left: 0,
            }}>Loading...</div>}
            <div className="list">
                {list.map((entry) => (
                    <Card key={entry.day} entry={entry} db={db} />
                ))}
            </div>
            <button onClick={() => loadMore()}>Load More...</button>
            <div className="data">
                <div className="month"></div>
                <PerformanceRadarChart />
            </div>
        </div>
    );
}

export default Front;
