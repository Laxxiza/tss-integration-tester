import { AlignLeft, LogOut } from "lucide-react";
import Tooltip from "../Tooltip/Tooltip";
import Headerbar from "./Headerbar";
import SidebarButton from "./SidebarButton";

export default function Sidebar({ projectName, projectActions, clearProject }) {
    return (
        <div className="flex">
            <div className="sticky top-10 flex flex-col w-64 border-right sideBar min-w-64 max-h-[calc(100dvh---spacing(10))]">
                <Headerbar>
                    <SidebarButton tooltipText={"Выбрать проект"} icon={<LogOut />} isRotate={true} onClick={clearProject}/>
                    <div className="flex h-full w-full items-center pl-2 gap-1">
                        <AlignLeft size={16} />
                        <span className="uppercase tracking-wider text-gray-300">
                            Действия/Колбэки
                        </span>
                    </div>
                </Headerbar>

                {/* Workspace title */}
                <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-gray-400">
                    Интеграция: {projectName}
                </div>

                {/* Tree */}
                {/* <div className="overflow-auto"></div> */}
            </div>
        </div>
    );
}
