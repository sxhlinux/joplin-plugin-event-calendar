import EventGrouping from "./EventGrouping";
import { Event } from "../../types";

export default abstract class Renderer {
  protected abstract renderGroups(
    group: Event[],
    groupDate: Date,
    groupIndex: number
  ): HTMLDivElement;

  protected container: HTMLDivElement;
  protected eventGrouping: EventGrouping;

  protected constructor(eventGrouping: EventGrouping) {
    this.container = document.createElement("div");
    this.container.className = "event-calendar";
    this.eventGrouping = eventGrouping;
  }

  protected _renderGroups(): HTMLDivElement[] {
    return this.eventGrouping.groups.map((group: Event[], index: number) => {
      const groupDate = this.eventGrouping.getDateFromGroupIndex(index);

      return this.renderGroups(group, groupDate, index);
    });
  }

  public render(): HTMLDivElement {
    const groups = this._renderGroups();

    groups.forEach((group) => {
      if (group.firstElementChild.className === 'icon primary') {
        const grp = document.createElement('div');
        grp.className = 'break';
        this.container.appendChild(grp);
      }
      this.container.appendChild(group);
    });

    return this.container;
  }
}
