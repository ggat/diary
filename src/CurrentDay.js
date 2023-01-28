import CurrentDayContext from "./contexts/CurrentDayContext";
import { useCurrentDay } from "./utils/use-current-day";

function CurrentDay({ children }) {
    const currentDay = useCurrentDay();
    return (
        <CurrentDayContext.Provider value={currentDay}>
            {children}
        </CurrentDayContext.Provider>
    );
}

export default CurrentDay;
