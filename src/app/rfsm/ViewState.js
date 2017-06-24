/* eslint-disable */

import State from './State';

export const Events = {};

export default class ViewState extends State {
  constructor({name, view, transitions, persist = true}) {
    super({name: name, transitions: transitions});
    this.view = view;
    this.persist = persist;
  }
}
