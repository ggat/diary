import React, { useState } from "react";
import "./MonthView.css";

let count = 0;

function MonthView() {
    const [goals, setGoals] = useState([
        {
            name: "Exercise",
            dates: [
                { date: new Date(2023, 2, 1), completed: false },
                { date: new Date(2023, 2, 2), completed: true },
                { date: new Date(2023, 2, 3), completed: true },
            ],
        },
        {
            name: "Read",
            dates: [
                { date: new Date(2023, 2, 1), completed: true },
                { date: new Date(2023, 2, 2), completed: false },
                { date: new Date(2023, 2, 3), completed: true },
            ],
        },
        {
            name: "Meditate",
            dates: [
                { date: new Date(2023, 2, 1), completed: true },
                { date: new Date(2023, 2, 2), completed: true },
                { date: new Date(2023, 2, 3), completed: false },
            ],
        },
    ]);
    const daysInMonth = 31; // Assuming a month with 31 days
    const header = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const toggleGoal = (goalIndex, date) => {
        count++;
        console.log(`toggleGoal ${count}`);
        const newGoals = [...goals];
        if (!newGoals[goalIndex]) {
            newGoals[goalIndex] = {
                name: `Goal ${goalIndex + 1}`,
                dates: [],
            };
        }
        const goal = newGoals[goalIndex];
        const dateIndex = goal.dates.findIndex(
            (item) => item.date.getTime() === date.getTime()
        );
        if (dateIndex === -1) {
            goal.dates.push({ date, completed: true });
        } else {
            console.log("should flip");
            goal.dates[dateIndex].completed = !goal.dates[dateIndex].completed;
        }

        setGoals(newGoals);
    };

    return (
        <div className="grid-container">
            <div key="_goal" className="first-grid-item">Goal</div>
            {header.map((item, index) => (
                <div key={index} className="grid-item month-view-header">
                    {item}
                </div>
            ))}
            {goals.map((goal, goalIndex) => (
                <React.Fragment key={goalIndex}>
                    <div className="first-grid-item">{goal.name}</div>
                    {Array.from({ length: daysInMonth }, (_, dayIndex) => {
                        const date = new Date(2023, 2, dayIndex + 1); // Assuming March 2023
                        const completed = goal.dates.some(
                            (item) =>
                                item.date.getDate() === date.getDate() &&
                                item.completed
                        );
                        return (
                            <div
                                key={dayIndex}
                                className={`grid-item ${
                                    completed ? "completed" : ""
                                }`}
                                onClick={() => toggleGoal(goalIndex, date)}
                            ></div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
}

export default MonthView;
