import "./Calendar.css";
import React, { useMemo } from "react";

export default function Calendar() {
    const weekDays = [
        "Mon",
        "Tuesday",
        "Wednesday",
        "Thusday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const daysOfMonth = useMemo(() => {
        const date = new Date();
        const daysOfMonth = [];

        const month = date.getMonth();
        date.setDate(1);

        while (date.getMonth() === month) {
            daysOfMonth.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return daysOfMonth;
    }, []);

    const pad = useMemo(() => (daysOfMonth[0].getDay() + 1) % 6, [daysOfMonth]);
    const date = useMemo(() => new Date(), []);

    return (
        <div className="calendar">
            {weekDays.map((weekDay) => (
                <div key={weekDay}>{weekDay}</div>
            ))}
            {Array(pad)
                .fill(0)
                .map(() => (
                    <div></div>
                ))}
            {daysOfMonth.map((day) => (
                <div className={date.getDate() === day.getDate() ? "calendar-current-day" : ""} key={day.getDate()}>{day.getDate()}</div>
            ))}
        </div>
    );
}
