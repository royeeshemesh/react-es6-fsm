import EventEmitter from 'events';

export default class Transition extends EventEmitter {
    constructor({name, from, to}) {
        super();

        this.name = name;
        this.from = from;
        this.to = to;
    }
}
