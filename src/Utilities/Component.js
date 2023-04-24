export class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  remove() {
    if (this.element) {
      this.element.remove();

      /*
       * Old browser support
       * this.element.parentElement.removeChild(this.element);
       */
    }
  }

  show() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element,
    );
  }
}
