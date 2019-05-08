/**
 * @package
 */
class EventSubscriber {
    /**
     *
     * @param {string} eventName
     * @param {EventEmitter} eventEmitter
     * @constructor
     */
    constructor(eventName, eventEmitter) {
        this.subscribe = callback => eventEmitter.subscribe(eventName, callback);
        this.unsubscribe = callback => eventEmitter.unsubscribe(eventName, callback);
    }
}

export default EventSubscriber;