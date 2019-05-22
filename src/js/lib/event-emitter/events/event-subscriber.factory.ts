import EventEmitter from "./event-emitter";
import EventSubscriber from "./event-subscriber";

/**
 * @summary
 */
class EventSubscriberFactory {

    private readonly _eventEmitter;

    /**
     *
     * @param {EventEmitter}eventEmitter
     */
    constructor(eventEmitter) {
        this._eventEmitter = eventEmitter;
    }

    createEventSubscribers(events: string[]) {
        let object = {};

        events.forEach(event => object[event] = new EventSubscriber(event, this._eventEmitter));

        return object;
    }
}

export default EventSubscriberFactory;