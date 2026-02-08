import "./Front.css";
import { useContext, useEffect, useMemo } from "react";
import { dayToDateTimeObj, toDateString } from "./utils/day-to-date-time-obj";
import { tsToDays } from "./utils/current-day";
import AuthContext from "./contexts/AuthContext";
import firebase from "firebase/compat/app";
import { ui } from "./bootstrap";
import Skull from "./icons/Skull";
import SignInAnimation from "./SignInAnimation";
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
            type: "entry",
            day,
            dateString: toDateString(dayToDateTimeObj(day)),
            content,
        });

        const res = [];
        const earliestLoadedDayNum = entries[entries.length - 1]?.day;
        let skipCount = 0;
        let skipStartDay = null;

        for (let i = currentDay; i >= earliestLoadedDayNum && entries.length; i--) {
            const dayEntry = entries.find((entry) => entry.day === i);
            const isEditable = i >= currentDay - 3 || i === currentDay;

            if (!dayEntry?.content && !isEditable) {
                if (skipCount === 0) skipStartDay = i;
                skipCount++;
            } else {
                if (skipCount > 0) {
                    res.push({ type: "gap", count: skipCount, fromDay: skipStartDay });
                    skipCount = 0;
                }
                const day = mapForUI(dayEntry ? dayEntry : { day: i });
                res.push(day);
            }
        }
        if (skipCount > 0) {
            res.push({ type: "gap", count: skipCount, fromDay: skipStartDay });
        }

        return res;
    }, [entries, currentDay]);

    useEffect(() => {
        if (!isAuthLoading && !user) {
            ui.start("#firebaseui-auth-container", {
                signInFlow: "popup",
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
        return <div className="auth-loading">Checking Auth...</div>;
    }

    if (!user) {
        return (
            <div className="sign-in-page">
                <div className="cyber-grid"></div>
                <div className="scanlines"></div>
                <div className="cyber-card">
                    <div className="corner corner-tl"></div>
                    <div className="corner corner-tr"></div>
                    <div className="corner corner-bl"></div>
                    <div className="corner corner-br"></div>
                    <SignInAnimation />
                    <h1 className="glitch-title" data-text="Diary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            <line x1="8" y1="7" x2="16" y2="7" />
                            <line x1="8" y1="11" x2="13" y2="11" />
                        </svg>
                        Diary
                    </h1>
                    <p className="cyber-subtitle">
                        <span className="blink">&gt;</span> authenticate to continue_
                    </p>
                    <div id="firebaseui-auth-container"></div>
                </div>
            </div>
        );
    }

    if (user && user.email !== "g.gatenashvili@gmail.com") {
        return (
            <div className="auth-error-page">
                <p>Authenticated user has no rights to see the content.</p>
                <button onClick={() => auth.signOut()}>
                    Sign out
                </button>
            </div>
        );
    }

    console.log('loading', loading)

    return (
        <div className="container">
            <div className="header">
                <div className="header-top">
                    <button className="skull-button" onClick={() => auth.signOut()}>
                        <Skull />
                    </button>
                    <div className="author">
                        <div>{user?.email}</div>
                    </div>
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
            {loading && <div className="loading-indicator">Loading...</div>}
            <div className="list">
                {list.map((item) =>
                    item.type === "gap" ? (
                        <div className="gap-indicator" key={`gap-${item.fromDay}`}>
                            <div className="gap-line"></div>
                            <span>{item.count} {item.count === 1 ? "day" : "days"} skipped</span>
                            <div className="gap-line"></div>
                        </div>
                    ) : (
                        <Card key={item.day} entry={item} db={db} />
                    )
                )}
            </div>
            <button className="load-more-btn" onClick={() => loadMore()}>Load More...</button>
        </div>
    );
}

export default Front;
