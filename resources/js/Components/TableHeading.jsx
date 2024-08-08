import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { Children } from "react";

export default function TableHeading({ name, sortable = true, sortChanged = () => {}, children }) {
    return (
        <th
        onClick={(e) => sortChanged(name)}
    >
        <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
        {children}

        {sortable && (
            <div>
                <ChevronUpDownIcon className="w-4" />
            </div>
        )}
        </div>
    </th>
    )
}
