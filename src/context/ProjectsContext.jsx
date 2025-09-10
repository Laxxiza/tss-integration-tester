import { createContext, useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectManager from "../services/ProjectManager";
import Project from "../services/Project";

export const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
    console.log("ProjectProvider");
    const [projects, setProjects] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const slug = searchParams.get("slug");

    const fetchGetProjects = () => {
        console.log("Получение проектов");
        fetch("/api/projects", { credentials: "include" })
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка получения проектов");
                return res.json();
            })
            .then((data) => {
                console.log("Получены проекты");
                console.log(data);
                //manager.setProjects(data.data.projects);
                //setProjects(data.data.projects);
                setProjects(
                    data.data.projects.map((project) => new Project(project))
                );
            })
            .catch(() => {
                //manager.setProjects(null);
                setProjects(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchSaveProject = (projectSave) => {
        console.log("Сохранение проектова");
        fetch("/api/save", { credentials: "include", method: "POST", body: projectSave.toJson() })
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка сохранения проекта");
                return res.json();
            })
            .then((data) => {
                console.log("Проект сохранен");
                console.log(data);
                setProjects(
                    projects.map((project) => { return project.id == projectSave.id ? projectSave : project })
                );
            })
            .catch(() => {
                //manager.setProjects(null);
                setProjects(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!projects) {
            fetchGetProjects();
            return;
        }

        if (!slug) {
            console.log("Нет слага: " + slug);
            return;
        }

        const project = projects.find((p) => p.slug === slug) || null;

        if (project) selectProject(project.slug, { skipUrl: true });
        else clearProject();

        console.log("Текущий проект: " + project);
    }, [projects, slug]);

    function selectProject(slug, options = {}) {
        const project = projects?.find((p) => p.slug === slug) || null;
        setCurrentProject(project);
        //manager.setCurrentProject(project);

        if (!options.skipUrl) {
            setSearchParams({ slug });
        }
    }

    function updateProject(project) {
        setCurrentProject(project);
    }

    function clearProject() {
        setCurrentProject(null);
        manager.setCurrentProject(null);
        setSearchParams((prev) => {
            prev.delete("slug");
            return prev;
        });
    }

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                currentProject,
                loading,
                selectProject,
                clearProject,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
}
