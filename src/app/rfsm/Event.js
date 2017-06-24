/* eslint-disable */

export default class Event {
  constructor({state, next, error, model, direction}) {
    this.state = state;
    this.next = next;
    this.error = error;
    this.model = model;
    this.direction = direction;
  }
}
