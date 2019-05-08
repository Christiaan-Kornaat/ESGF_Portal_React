import PropTypes from "prop-types";
import React, {Component} from "react";
import Buttons from "../../shared/buttons/buttons.component";
import Popovers from "../../shared/popovers/search-popovers";

class OptionsComponent extends Component {
    constructor(props) {
        super(props);

        let {show = false, sortButtons, optionButtons = []} = props;

        this.state = {
            show: show,
            sortButtons: sortButtons,
            optionButtons: optionButtons
        };

        this.toggleShow = this.toggleShow.bind(this);
        this.render = this.render.bind(this);
    }

    toggleShow() {
        let show = !this.state.show;

        this.setState({
            show: show
        });
    }

    render() {
        let {toggleShow, state: {show, sortButtons, optionButtons: actionButtons}} = this;

        let OptionsPopover = Popovers.SearchOptions;

        let ActionButton = Buttons.Dropdown.Primary;

        let actionButtonComponents = Object.keys(actionButtons)
                                           .map(name => <ActionButton name={name}
                                                                      onClick={actionButtons[name]}/>);

        return (
            <div className="optionsButton dropdown show"
                 role="button"
                 id="dropdownMenuLink"
                 aria-haspopup="true"
                 aria-expanded="false">
                <Buttons.Options onClick={toggleShow}/>
                <OptionsPopover sortButtons={sortButtons}
                                actionButtons={actionButtonComponents}
                                show={show}/>
            </div>
        );
    }
}

OptionsComponent.propTypes = {
    defaultShow: PropTypes.bool,
    sortButtons: PropTypes.array.isRequired,
    optionButtons: PropTypes.object
};
export default OptionsComponent;