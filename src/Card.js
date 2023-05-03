import "./Card.css";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { debounce } from "./utils/debounce";
import DBContext from "./contexts/DBContext";
import CurrentDayContext from "./contexts/CurrentDayContext";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function Card({ entry }) {
    const [isDirty, setIsDirty] = useState(false);
    const [isPristine, setIsPristine] = useState(true);
    const db = useContext(DBContext);
    const currentDay = useContext(CurrentDayContext);
    const status = useMemo(() => {
        if (isDirty) {
            return {
                text: "Unsaved...",
                color: "red",
            };
        } else if (isPristine) {
            return {
                text: " ",
                color: "",
            };
        } else {
            return {
                text: "Saved",
                color: "green",
            };
        }
    }, [isDirty, isPristine]);

    const setDocInDB = useCallback(
        async (value) => {
            await setDoc(doc(db, "days", String(entry.day)), {
                day: entry.day,
                content: value,
            });
        },
        [db, entry.day]
    );

    const debouncedSetDoc = useMemo(
        () =>
            debounce((e) => {
                setDocInDB(e.target.value).finally(() => {
                    setIsDirty(false);
                });
            }, 4000),
        [setDocInDB]
    );

    const hangleChange = useCallback(
        (e) => {
            setIsPristine(false);
            setIsDirty(true);
            debouncedSetDoc(e);
        },
        [debouncedSetDoc]
    );

    return (
        <div className="card" key={entry.day}>
            {
                <div className="status" style={{ color: status.color }}>
                    {status.text}
                </div>
            }
            <div
                className={`title ${entry.day === currentDay ? "current" : ""}`}
            >
                <h2>{entry.dateString}</h2>
                <h3 title={`Day ${entry.day}`}>{entry.day}</h3>
            </div>
            <ReactTextareaAutosize
                className="content"
                disabled={entry.day < currentDay - 3}
                onChange={hangleChange}
                defaultValue={entry.content}
            />
        </div>
    );
}
