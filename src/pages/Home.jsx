import React, { useEffect, useMemo, useState } from "react";
import {
    Folder,
    FileText,
    ChevronRight,
    ChevronDown,
    Search,
    Files,
    GitBranch,
    Play,
    Bug,
    Puzzle, // replacement for invalid "Extensions"
    Settings,
    Bell,
    TerminalSquare,
    AlignLeft,
    Microscope ,
} from "lucide-react";
import Layout from "../layouts/Layout";

// VS Code color palette
const colors = {
    activityBar: "#333333",
    sideBar: "#252526",
    sideBarHeader: "#2d2d2d",
    editorBg: "#1e1e1e",
    editorPane: "#1e1e1e",
    tabBg: "#2d2d2d",
    tabActive: "#1e1e1e",
    border: "#3c3c3c",
    statusBar: "#007acc",
    //text: "#cccccc",
    textMuted: "#9b9b9b",
    treeHover: "#2a2d2e",
    treeActive: "#37373d",
};

export default function Login() {
    return (
        <div
            className="w-full h-screen"
            style={{
                fontFamily: "Inter, ui-sans-serif, system-ui",
            }}
        >
            {/* Top bar placeholder (optional) */}
            <div
                className="w-full h-10 flex items-center px-3 border-bottom"
            >
                <span className="text-sm text-gray-300">
                    Jinja | Входящие интеграции
                </span>
            </div>

            <div className="flex h-[calc(100vh-40px)]">
                {/* Activity Bar */}
                <div
                    className="flex flex-col items-center justify-between w-[48px] min-w-[48px]"
                    style={{
                        background: colors.activityBar,
                        borderRight: `1px solid ${colors.border}`,
                    }}
                >
                    <div className="flex flex-col items-center w-full cursor-pointer">
                        <div className="hover:bg-sky-700">
                            <Files className="h-full w-full p-3" />
                        </div>
                        <div className="hover:bg-sky-700">
                            <Microscope  className="h-full w-full p-3" />
                        </div>
                        <div className="hover:bg-sky-700">
                            <GitBranch className="h-full w-full p-3" />
                        </div>
                        <div className="hover:bg-sky-700">
                            <Play className="h-full w-full p-3" />
                        </div>
                        <div className="hover:bg-sky-700">
                            <Bug className="h-full w-full p-3" />
                        </div>
                        <div className="hover:bg-sky-700">
                            <Puzzle className="h-full w-full p-3" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <Settings size={20} />
                        <Bell size={20} />
                    </div>
                </div>

                {/* Side Bar */}
                <div
                    className="flex flex-col w-[280px] min-w-[280px]"
                    style={{
                        background: colors.sideBar,
                        borderRight: `1px solid ${colors.border}`,
                    }}
                >
                    <div
                        className="flex items-center justify-between h-9 px-3 text-xs"
                        style={{
                            background: colors.sideBarHeader,
                            borderBottom: `1px solid ${colors.border}`,
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <AlignLeft size={14} />
                            <span className="uppercase tracking-wider text-gray-300">
                                Действия/Колбэки
                            </span>
                        </div>
                    </div>

                    {/* Workspace title */}
                    <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-gray-400">
                        Samsara
                    </div>

                    {/* Tree */}
                    <div className="overflow-auto"></div>
                </div>

                {/* Editor Area */}
                <div
                    className="flex-1 flex flex-col"
                    style={{ background: colors.editorPane }}
                >
                    {/* Tabs */}
                    <div
                        className="flex items-center h-9 overflow-x-auto"
                        style={{
                            background: colors.tabBg,
                            borderBottom: `1px solid ${colors.border}`,
                        }}
                    ></div>

                    {/* Fake Monaco (code preview) */}
                    <div
                        className="flex-1 overflow-auto p-6 text-sm leading-6"
                        style={{
                            fontFamily:
                                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        }}
                    >
                        <pre className="whitespace-pre-wrap">
                            {"// Выберите элемент слева"}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}