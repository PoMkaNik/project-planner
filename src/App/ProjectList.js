import { ProjectItem } from './ProjectItem';
import { DOMHelper } from '../Utilities/DOMHelper';

export class ProjectList {
  // projects = [];

  constructor(type) {
    this.type = type;
    this.projects = [];
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(
          projectItem.id,
          this.switchProject.bind(this),
          this.type,
        ),
      );
    }
    console.log(this.projects);
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener('dragenter', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        // only prevent if it is text/plain and not links for example
        event.preventDefault();
        list.parentElement.classList.add('droppable');
      }
    });

    list.addEventListener('dragover', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        // only prevent if it is text/plain and not links for example
        event.preventDefault();
      }
    });

    list.addEventListener('dragleave', (event) => {
      if (
        event.relatedTarget.closest &&
        event.relatedTarget.closest(`#${this.type}-projects ul`) !== list
      ) {
        list.parentElement.classList.remove('droppable');
      }
    });

    list.addEventListener('drop', (event) => {
      event.preventDefault();

      const projectId = event.dataTransfer.getData('text/plain');
      if (this.projects.find((p) => p.id === projectId)) {
        return;
      }
      // emulate button Finish / Active click to move elements
      document
        .getElementById(projectId)
        .querySelector('button:last-of-type')
        .click();

      list.parentElement.classList.remove('droppable');
    });
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    // need to pass new switchProject method from new list
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // one approach
    // const projectIndex = this.projects.findIndex((p) => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    // second approach
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
