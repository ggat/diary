import { useCallback, useContext, useRef, useState } from "react";
import DBContext from "../contexts/DBContext";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";

const LOAD_LIMIT = 5;

export default function usePaginatedCardList({ skip }) {
    const db = useContext(DBContext);
    const [entries, setEntries] = useState([]);
    const loading = useRef(false);
    const nextQuery = useRef(query(
        collection(db, "days"),
        orderBy("day", "desc"),
        limit(10)
    ));

    const loadMore = useCallback(() => {
        loading.current = true;
        getDocs(nextQuery.current).then((snapshot) => {
            const entries = [];
            snapshot.forEach((doc) => {
                entries.push(doc.data());
            });
            setEntries((prevLoadedEntries) => ([...prevLoadedEntries, ...entries]));
            nextQuery.current = query(
                collection(db, "days"),
                orderBy("day", "desc"),
                startAfter(entries[entries.length - 1].day),
                limit(LOAD_LIMIT)
            );
            loadMore.current = false;
        });
    }, [nextQuery, db]);

    if (!skip && !entries.length && !loading.current) {
        loadMore();
    }

    return { entries, loadMore };
}