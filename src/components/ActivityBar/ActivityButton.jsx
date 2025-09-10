import { Fragment } from "react/jsx-runtime";
import Tooltip from "../Tooltip/Tooltip";

export default function Button({ children, onClick, isActive }) {
    return (
        <div
            className="relative flex items-center p-3 hover:bg-sky-700"
            onClick={onClick}
        >
            {isActive && (
                <div className="absolute h-full left-0 border-s-[2px] border-s-[2px] border-sky-400"></div>
            )}
            {children}
        </div>
    );
}
