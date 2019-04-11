import React, {Component} from "react";

export class ESGFPropertyList extends Component {
    render() {
        let title = this.props.title;
        let onSelect = this.props.properties.onSelect;

        let createOnSelect = function (item) {
            return function () {
                onSelect(item)
            };
        };

        let items = this.props.properties.items.map(item =>
            <li 
            className="list-group-item"
            onClick={createOnSelect(item)} >{item}</li>
        );

        return (
            <div className="col-sm">
                <h3 className='text-center'>{title}</h3>
                <ul className='list-group list-group-flush'>
                    {items}
                </ul>
            </div>
        )
    }
}