import React, {Component} from "react";
import {EventEmitter, EventSubscriber, EventSubscriberFactory} from "../../../../lib/event-emitter/events";

type PageColumnTabEvents = { selected: EventSubscriber, deselected: EventSubscriber };

export type PageColumnTabProps = { title: string, content?: JSX.Element };

class PageColumnTab<TEvents extends PageColumnTabEvents = PageColumnTabEvents> extends Component<PageColumnTabProps> {
    set title(value: string) { this._title = value; }

    get title(): string { return this._title; }

    get content(): JSX.Element { return this._content; }

    get events(): TEvents { return this._events; }

    private _title: string;
    private readonly _content: JSX.Element;

    private readonly _eventEmitter: EventEmitter;
    private readonly _events: TEvents;

    constructor(props: PageColumnTabProps) {
        super(props);

        let {title, content} = props;

        this._title = title;
        this._content = content;

        this._eventEmitter = new EventEmitter();
        let subscriberFactory = new EventSubscriberFactory(this._eventEmitter);

        // @ts-ignore
        this._events = subscriberFactory.createEventSubscribers(["selected", "deselected"]);
    }

    emitSelected() { this._eventEmitter.emit("selected"); }

    emitDeselected() { this._eventEmitter.emit("deselected"); }

    render() {
        return this.content;
    }
}

export default PageColumnTab;