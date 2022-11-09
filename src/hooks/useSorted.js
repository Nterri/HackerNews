import {useMemo} from "react";

export default function useSorted(items, sort)  {
    const sorted = useMemo(() => {
        if (sort) {
            return [...items].sort((a,b) => b[sort] - a[sort])
        }
        return items
    }, [sort, items])

    return sorted
}