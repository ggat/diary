import { useEffect, useState } from "react";
import { currentDay } from "./current-day";

export function useCurrentDay() {
    const [day, setDay] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const newDay = currentDay();
            if (newDay !== day) {
                setDay(newDay);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [day]);

    return day;
}
