import State from './State';

export const Events = {};

export default class ActionState extends State {
  constructor({name, action, transitions}) {
    super({name: name, transitions: transitions});
    this.action = action;
  }
}
