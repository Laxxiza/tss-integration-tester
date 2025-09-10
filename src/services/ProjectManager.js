export default class ProjectManager {
  constructor() {
    this.projects = [];
    this.currentProject = null;
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  setCurrentProject(project) {
    this.currentProject = project;
  }

  getCurrentProject() {
    return this.currentProject;
  }

  clearProject() {
    this.currentProject = null;
  }

  findProjectBySlug(slug) {
    return this.projects?.find(p => p.slug === slug) || null;
  }
}
