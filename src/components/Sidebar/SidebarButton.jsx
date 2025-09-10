import Tooltip from "../Tooltip/Tooltip";

export default function SidebarButton({
    tooltipText,
    icon,
    isRotate,
    onClick,
}) {
    return (
        <div onClick={onClick} className="flex items-center">
            <Tooltip message={tooltipText} offset={40}>
                <div className={`flex h-9 w-9 ${isRotate && "rotate-180"} items-center justify-center bg-red-700/70 hover:bg-red-700/50 cursor-pointer`}>
                    {icon}
                </div>
            </Tooltip>
        </div>
    );
}
