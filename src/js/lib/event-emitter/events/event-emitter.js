/**
 * @package
 * @constructor
 */
const EventEmitter = function () {
    /**
     * @type {Map<String, function[]>}
     */
    let eventCallbacks = new Map();

    /**
     * @param {string} eventName
     * @param {function} callback
     */
    this.subscribe = (eventName, callback) => {
        if (!eventCallbacks.has(eventName)) {
            eventCallbacks.set(eventName, []);
        }

        eventCallbacks.set(eventName, [...eventCallbacks.get(eventName), callback]);
    };

    /**
     * @param {string} eventName
     * @param {function} callback
     */
    this.unsubscribe = (eventName, callback) => {
        if (!eventCallbacks.has(eventName)) return;
        if (!eventCallbacks.get(eventName).includes(callback)) return;

        let callbackList = eventCallbacks.get(eventName)
                                         .filter(item => item !== callback);

        eventCallbacks.set(eventName, callbackList);
    };

    /**
     * @param {string} eventName
     * @param {...*} payload
     */
    this.emit = (eventName, ...payload) => {
        if (!eventCallbacks.has(eventName)) return;

        eventCallbacks.get(eventName)
                      .forEach(item => item.call(...payload));
    };
};

export default EventEmitter;