import { useContext } from "react";
import { ProjectsContext } from "../context/ProjectsContext";

export function useProject() {
    return useContext(ProjectsContext);
}