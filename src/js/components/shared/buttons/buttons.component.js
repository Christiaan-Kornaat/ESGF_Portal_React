import PropTypes from "prop-types";
import React, {Component} from "react";
import ArrowIcons from "../icons/arrow-icons.component";

const Buttons = {};

Buttons.Options = ({onClick}) =>
    <span className="Button"
          onClick={onClick}>
        <i className="fas fa-ellipsis-h"/>
    </span>;

Buttons.Info = ({onClick}) =>
    <span className={"icon-info"}
          onClick={onClick}> <i className="fas fa-info-circle"/>
</span>;

Buttons.Edit = ({onClick}) =>
    <span className={"icon-info"}
          onClick={onClick}> <i className="fas fa-edit"/>
</span>;

Buttons.Primary = ({title, onClick}) =>
    <a key={"button-" + title}
       onClick={onClick}>
        <input className="btn btn-primary btn-sm"
               type="button"
               value={title}/>
    </a>;
Buttons.Success = ({title, onClick}) =>
    <a key={"button-" + title}
       onClick={onClick}>
        <input className="btn btn-success btn-sm"
               type="button"
               value={title}/>
    </a>;
Buttons.Danger = ({title, onClick}) =>
    <a key={"button" + title}
       onClick={onClick}>
        <input className="btn btn-danger btn-sm"
               type="button"
               value={title}/>
    </a>;

/**
 *
 * @param {string}title
 * @param {boolean}isDirectionUp
 * @param {function}onToggle
 * @param {string}className
 *
 * @return {Component}
 *
 * @constructor
 */
Buttons.Sort = class Sort extends Component {
    constructor(props) {
        super(props);

        let {title, defaultIsDirectionUp = true, onToggle, className = ""} = props;

        this.state = {
            title: title,
            className: className,
            isDirectionUp: defaultIsDirectionUp,
            onToggle: onToggle
        };

        this.toggleDirection = this.toggleDirection.bind(this);
        this.render = this.render.bind(this);
    }

    toggleDirection() {
        let {isDirectionUp: isUp, onToggle} = this.state;

        onToggle(isUp);

        this.setState({
            isDirectionUp: !isUp
        });
    }

    render() {
        let {state: {isDirectionUp, title, className}, toggleDirection} = this;

        let Arrow = isDirectionUp ? ArrowIcons.Up : ArrowIcons.Down;

        return (
            <a className={"dropdown-item " + className}
               onClick={toggleDirection}>
                {title} <Arrow/>
            </a>
        );
    }
};

Buttons.Sort.propTypes = {
    title: PropTypes.string.isRequired,
    onToggle: PropTypes.func,
    defaultIsDirectionUp: PropTypes.bool,
    className: PropTypes.string
};


Buttons.Dropdown = {};

/**
 * Primary button for dropdown-lists.
 *
 * @param {string} name
 * @param {function} onClick
 *
 * @return {React.Component}
 *
 * @constructor
 */
Buttons.Dropdown.Primary = ({name, onClick}) => (
    <a key={name}
       className="dropdown-item"
       onClick={onClick}>
        <input className="optionsTabButton"
               type="button"
               value={name}/>
    </a>
);

export default Buttons;