/**
 * @package
 * @constructor
 */
class EventEmitter {

    private _eventCallbacks: Map<string, Function[]>;

    constructor() {
        this._eventCallbacks = new Map();
    }


    /**
     * @param {string} eventName
     * @param {function} callback
     */
    subscribe(eventName, callback) {
        if (!this._eventCallbacks.has(eventName)) {
            this._eventCallbacks.set(eventName, []);
        }

        this._eventCallbacks.set(eventName, [...this._eventCallbacks.get(eventName), callback]);
    };

    /**
     * @param {string} eventName
     * @param {function} callback
     */
    unsubscribe(eventName, callback) {
        if (!this._eventCallbacks.has(eventName)) return;
        if (!this._eventCallbacks.get(eventName).includes(callback)) return;

        let callbackList = this._eventCallbacks.get(eventName)
                               .filter(item => item !== callback);

        this._eventCallbacks.set(eventName, callbackList);
    };

    /**
     * @param {string} eventName
     * @param {...*} payload
     */
    emit(eventName, ...payload) {
        if (!this._eventCallbacks.has(eventName)) return;

        this._eventCallbacks.get(eventName)
            .forEach(item => item(...payload));
    };
}

export default EventEmitter;