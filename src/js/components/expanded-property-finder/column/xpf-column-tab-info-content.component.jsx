import React, {Component} from "react";

class XpfColumnTabInfoContent extends Component {
    constructor(props) {
        super(props);

        let {model} = props;

        this.state = {
            content: model
        };
    }

    componentWillReceiveProps({model}) {
        this.setState({
            content: model
        });
    }

    render() {
        let {state: {content: {title, paragraphs}}} = this;

        let InfoParagraph = ({title, content}) => (
            <div>
                <h5>{title}</h5>
                <p>
                    {content}
                </p>
            </div>
        );

        let paragraphObjects = Object.keys(paragraphs)
                                     .map(key =>
                                         <InfoParagraph title={key}
                                                        content={paragraphs[key]}/>);

        return (
            <div>
                <h4>{title}</h4>
                {paragraphObjects}
            </div>
        );
    }
}

export default XpfColumnTabInfoContent;