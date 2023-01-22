import { useCurrentDay } from "./utils/use-current-day";

function CurrentDay({ children }) {
    const currentDay = useCurrentDay();
    return children(currentDay);
}

export default CurrentDay;
