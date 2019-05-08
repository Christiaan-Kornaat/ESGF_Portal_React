import EventEmitter from "./events/event-emitter";
import EventSubscriber from "./events/event-subscriber";

/**
 * @public
 * @type {{EventSubscriber, EventEmitter}}
 */
const EventModule = (function () {
    return {};
})();

export {EventSubscriber};
export {EventEmitter};

export default {
    EventSubscriber,
    EventEmitter
};