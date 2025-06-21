interface EventContextInterface {
    idCounter: number;
    eventObjects: EventComponent[];
    dispatchEvent: (eventKey: string, data?: Object) => any;
}

export class EventComponent {
    id: string;
    eventListeners: Array<[string, { (data: Object): any }]>;

    constructor() {
        this.id = `EventComponent${EventContext.idCounter++}`;
        EventContext.eventObjects.push(this);
        this.eventListeners = [];
    }

    getInnerId(id: string) {
        const inner_id = this.id+'id'
        return inner_id;
    }

    on(eventKey: string, call: { (data: any): any }) {
        this.eventListeners.push([eventKey, call]);
    }

    dispatchEvent(eventKey: string, data: Object = {}) {
        for (const eventObject of EventContext.eventObjects) {
            for (const eventListener of eventObject.eventListeners) {
                if (eventKey == eventListener[0]) {
                    eventListener[1](data);
                }
            }
        }
    }
}

export const EventContext: EventContextInterface = {
    idCounter: 0,
    eventObjects: [],
    dispatchEvent(eventKey, data: Object = {}) {
        for (const eventObj of this.eventObjects) {
            for (const eventListener of eventObj.eventListeners) {
                if (eventKey == eventListener[0]) {
                    eventListener[1](data);
                }
            }
        }
        return 0;
    },
};
