/* eslint-disable */

import EventEmitter from 'events';
import View from './View';

class Transition extends EventEmitter {
    static Directions = {
        LEFT: 'left',
        RIGHT: 'right'
    };

    static Back = ({to = null, direction = Transition.Directions.RIGHT}) => {
        return new Transition({
            name: View.TransitionTypes.BACK,
            direction,
            to,
        })
    };

    constructor({name, from, to, direction = Transition.Directions.LEFT, enabled = false}) {
        super();

        this.name = name;
        this.from = from;
        this.to = to;
        this.direction = direction;
        this.enabled = enabled;
    }
}

export default Transition;
