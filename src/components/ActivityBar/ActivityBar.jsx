import {
    Folders,
    ListTree,
    Settings,
    Bell,
    Microscope,
    SquaresIntersect,
    Home,
    LayoutTemplate,
    LogOut
} from "lucide-react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ActivityButton from "./ActivityButton";
import Tooltip from "../Tooltip/Tooltip";
import { useProject } from "../../hooks/useProject";

export default function ActivityBar() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const currentLocation = location.pathname.slice(1);

    const { currentProject } = useProject();

    const navigate = useNavigate();

    console.log(`ActivityBar render. Location: ${currentLocation}. Current project: ${currentProject?.slug}`);

    function handleClick(active, route) {
        if (currentLocation === active) return;
        navigate(route);
    }

    return (
        <div className="flex flex-col items-center justify-between w-[48px] min-w-[48px] activityBar border-right">
            <div className="flex-col items-center cursor-pointer">
                <Tooltip message="Проекты" icon={<Folders size={20}/>}>
                    <ActivityButton
                        isActive={currentLocation === "projects"}
                        onClick={() => {
                            handleClick("projects", `/projects${currentProject ? "?slug="+currentProject.slug:""}`);
                        }}
                    >
                        <Folders />
                    </ActivityButton>
                </Tooltip>
                <Tooltip message="Тестирование Интеграций" icon={<Microscope size={20}/>}>
                    <ActivityButton
                        isActive={currentLocation === "testing"}
                        onClick={() => {
                            handleClick("testing", "/testing");
                        }}
                    >
                        <Microscope />
                    </ActivityButton>
                </Tooltip>
                <Tooltip message="Тестирование Jinja" icon={<SquaresIntersect size={20}/>}>
                    <ActivityButton
                        isActive={currentLocation === "jinja"}
                        onClick={() => {
                            handleClick("jinja", "/jinja");
                        }}
                    >
                        <SquaresIntersect />
                    </ActivityButton>
                </Tooltip>
                <Tooltip message="Тестирование JsonPath" icon={<ListTree size={20}/>}>
                    <ActivityButton
                        isActive={currentLocation === "jsonpath"}
                        onClick={() => {
                            handleClick("jsonpath", "/jsonpath");
                        }}
                    >
                        <ListTree />
                    </ActivityButton>
                </Tooltip>
                <Tooltip message="Тестирование Jinja" icon={<Home size={20}/>}>
                    <ActivityButton
                        isActive={currentLocation === "home"}
                        onClick={() => {
                            handleClick("home", "/home");
                        }}
                    >
                        <Home />
                    </ActivityButton>
                </Tooltip>
                <Tooltip message="Тестирование Jinja" icon={<LayoutTemplate size={20}/>}>
                    <ActivityButton
                        isActive={currentLocation === "temp"}
                        onClick={() => {
                            handleClick("temp", "/temp");
                        }}
                    >
                        <LayoutTemplate />
                    </ActivityButton>
                </Tooltip>
                {/* <ActivityButton
                    isActive={currentLocation === "play"}
                    onClick={() => {
                        //setActive("play");
                    }}
                >
                    <Play />
                </ActivityButton>
                <ActivityButton
                    isActive={currentLocation === "bug"}
                    onClick={() => {
                        //setActive("bug");
                    }}
                >
                    <Bug />
                </ActivityButton>
                <ActivityButton
                    isActive={currentLocation === "puzzle"}
                    onClick={() => {
                        //setActive("puzzle");
                    }}
                >
                    <Puzzle />
                </ActivityButton> */}
            </div>
            <div className="flex-col items-center cursor-pointer">
                <ActivityButton
                    isActive={currentLocation === "settings"}
                    onClick={() => {
                        //setActive("settings");
                    }}
                >
                    <Settings />
                </ActivityButton>
                <ActivityButton
                    isActive={currentLocation === "bell"}
                    onClick={() => {
                        //setActive("bell");
                    }}
                >
                    <Bell />
                </ActivityButton>
                <Tooltip message="Выйти из Аккаунта" icon={<LogOut size={20}/>}>
                    <ActivityButton
                        isActive={currentLocation === "logout"}
                        onClick={() => {
                            handleClick("logout", "/logout");
                        }}
                    >
                        <LogOut />
                    </ActivityButton>
                </Tooltip>
            </div>
        </div>
    );
}
