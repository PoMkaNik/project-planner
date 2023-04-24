import { Component } from '../Utilities/Component';

export class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip() {
    this.remove();
    this.closeNotifier(); // Call function to change hasActiveTooltip to false
  }

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    tooltipElement.textContent = this.text;
    // Positioning
    const hostElementPositionLeft = this.hostElement.offsetLeft;
    const hostElementPositionTop = this.hostElement.offsetTop;
    const hostElementPositionHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const xCord = hostElementPositionLeft + 20;
    const yCord =
      hostElementPositionTop +
      hostElementPositionHeight -
      parentElementScrolling -
      10;
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = `${xCord}px`;
    tooltipElement.style.top = `${yCord}px`;

    tooltipElement.addEventListener('click', this.closeTooltip.bind(this));
    this.element = tooltipElement;
  }
}
