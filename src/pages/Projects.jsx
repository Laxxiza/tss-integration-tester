import { useContext, useEffect } from "react";
import { useProject } from "../hooks/useProject";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AlignLeft, LogOut } from "lucide-react";
import GlobalLoading from "../components/GlobalLoading/GlobalLoading";
import Sidebar from "../components/Sidebar/Sidebar";
import Headerbar from "../components/Sidebar/Headerbar";
import SidebarButton from "../components/Sidebar/SidebarButton";
import Content from "../components/Content/Content";
import ProjectCard from "../components/ProjectCard/ProjectCard";

export default function Projects() {
    console.log("Project render");
    //const navigation = useNavigate();
    //const location = useLocation();
    const { loading, projects, currentProject, selectProject, clearProject } =
        useProject();
    //const [searchParams, setSearchParams] = useSearchParams();
    console.log(currentProject);

    function saveProject() {}

    return (
        <>
            {currentProject ? (
                <Content>
                    {/* Sidebar */}
                    <Sidebar
                        projectName={currentProject.name}
                        clearProject={clearProject}
                    />
                    <div className="flex flex-col w-full">
                        <div className="sticky top-10 flex">
                            <Headerbar>
                                <div className="bg-green-800 h-full content-center hover:bg-green-900">
                                    <button
                                        className="p-2 cursor-pointer"
                                        onClick={saveProject}
                                    >
                                        Сохранить
                                    </button>
                                </div>
                                <div className="bg-orange-800 h-full content-center hover:bg-orange-900">
                                    <button
                                        className="p-2 cursor-pointer"
                                        onClick={() => {currentProject.desc = "123123"}}
                                    >
                                        Изменить
                                    </button>
                                </div>
                            </Headerbar>
                        </div>
                        <div className="flex p-8">
                            <div className="flex flex-col gap-2">
                                {/* <div className="size-64 bg-sky-500"></div>
                                <div className="size-64 bg-sky-500"></div>
                                <div className="size-64 bg-sky-500"></div>
                                <div className="size-64 bg-sky-500"></div>
                                <div className="size-64 bg-sky-500"></div> */}
                                <h1>Задачи</h1>
                                <p>Проект: {currentProject.slug}</p>
                                <pre>
                                    {JSON.stringify(currentProject, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Content>
            ) : loading ? (
                <GlobalLoading message="Загрузка проектов" />
            ) : (
                <Content>
                    <div className="flex flex-col w-full p-4">
                        <div className="flex flex-wrap gap-2">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.slug}
                                    project={project}
                                    onClick={(slug) => selectProject(slug)}
                                />
                            ))}
                        </div>
                    </div>
                </Content>
            )}
        </>
    );
}
