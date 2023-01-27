import "./Front.css";
import {
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
} from "firebase/firestore";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import PerformanceRadarChart from "./PerformanceRadarChart";
import { dayToDateTimeObj, toDateString } from "./utils/day-to-date-time-obj";
import { debounce } from "./utils/debounce.js";
import { tsToDays } from "./utils/current-day";
import AuthContext from "./contexts/AuthContext";
import firebase from "firebase/compat/app";
import { ui } from "./bootstrap";
import Skull from "./icons/Skull";

function Front({ db, currentDay }) {
    const { user, auth, isLoading: isAuthLoading } = useContext(AuthContext);
    const [isSaving, setIsSaving] = useState(false);

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

        if (!entries || !entries[0]) {
            return [mapForUI({ day: currentDay })];
        }

        const res = [];
        entries.forEach((entry) => {
            res.push(mapForUI(entry));
        });

        if (entries[0].day < currentDay) {
            for (let i = entries[0].day + 1; i <= currentDay; i++) {
                res.unshift(mapForUI({ day: i }));
            }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setDocInDB = useCallback(
        debounce(async (day, value) => {
            await setDoc(doc(db, "days", String(day)), {
                day,
                content: value,
            });
            setIsSaving(false);
        }, 3000),
        [db]
    );

    const hangleChange = useCallback(
        (day) => (e) => {
            setIsSaving(true);
            setDocInDB(day, e.target.value);
        },
        [setDocInDB]
    );

    useEffect(() => {
        if (!isAuthLoading && (!user || ui.isPendingRedirect())) {
            ui.start("#firebaseui-auth-container", {
                signInOptions: [
                    // List of OAuth providers supported.
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                ],
            });
        }
    }, [user, isAuthLoading]);

    return (
        <>
            {!isAuthLoading && (
                <>
                    {(!user || ui.isPendingRedirect()) && (
                        <div id="firebaseui-auth-container"></div>
                    )}
                    {user && (
                        <div className="container">
                            <div className="header">
                                <button
                                    className="skull-button"
                                    onClick={() => auth.signOut()}
                                >
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
                                            width: `${
                                                (daysPassed / totalDays) * 100
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="list">
                                {list.map((entry) => (
                                    <div className="card" key={entry.day}>
                                        {isSaving && <div>Unsaved...</div>}
                                        <div
                                            className={`title ${
                                                entry.day === currentDay
                                                    ? "current"
                                                    : ""
                                            }`}
                                        >
                                            <h2>{entry.dateString}</h2>
                                            <h3 title={`Day ${entry.day}`}>
                                                {entry.day}
                                            </h3>
                                        </div>
                                        <textarea
                                            rows={6}
                                            className="content"
                                            disabled={
                                                entry.day < currentDay - 1
                                            }
                                            onChange={hangleChange(entry.day)}
                                            defaultValue={entry.content}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="data">
                                <div className="month"></div>
                                <PerformanceRadarChart />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Front;
