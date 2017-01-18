import State from './State';

export const Events = {};

export default class ViewState extends State {
  constructor({name, view, transitions}) {
    super({name: name, transitions: transitions});
    this.view = view;
  }
}
