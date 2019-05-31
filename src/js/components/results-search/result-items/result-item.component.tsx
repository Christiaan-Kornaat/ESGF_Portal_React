import React, {Component} from "react";
import Collapsible from "react-collapsible";
import ArrowIcons from "../../shared/icons/arrow-icons.component";
import ResultIcons from "../../shared/icons/result-icons.component";
import EsgfCatalogItem, {CatalogItemDataset} from "../../../model/dto/esgf-catalog-item.dto";
import ESGFDataNodeResultDTO from "../../../model/dto/esgf-data-node-result.dto";
import ICatalogProvider from "../../../data/catalog/catalog.provider.interface";
import LoadingIcons from "../../shared/icons/loading-icons.component";

type ResultItemProps = { labelModel: ESGFDataNodeResultDTO, resultProvider: ICatalogProvider };

enum ViewMode {
    Files = "viewmode-files",
    Aggregates = "viewmode-aggregates",
    Both = "viewmode-both",
}

export default class ResultItem extends Component<ResultItemProps> {
    state: { isOpen: boolean, labelModel: ESGFDataNodeResultDTO, contentModel: EsgfCatalogItem, viewMode: ViewMode };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            labelModel: props.labelModel,
            contentModel: null,
            viewMode: ViewMode.Both
        };

    }

    setArrowIsOpen(isOpen: boolean) {
        this.setState({isOpen: isOpen});
    }

    componentWillReceiveProps({labelModel}): void {
        this.setState({labelModel: labelModel});
    }

    render() {
        let {state: {isOpen, labelModel}} = this;

        //TODO move to somewhere else??
        let createTableRow = (dataset: CatalogItemDataset, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{dataset.name}</td>
                    <td>{dataset.dataSize}</td>
                    <td className="clickable text-center"><a href={""}><ResultIcons.Download className={"mx-auto"}/></a></td>
                    <td className="clickable text-center">View</td>
                    <td className="clickable text-center"><ResultIcons.Basket/></td>
                </tr>
            );
        };

        let Arrow = isOpen ? ArrowIcons.Down : ArrowIcons.Up;

        let closeArrow = () => this.setArrowIsOpen(true);
        let openArrow = () => this.setArrowIsOpen(false);

        let handleOpen = async () => {
            openArrow();
            let contentModel = await this.props.resultProvider.provide(this.props.labelModel);
            this.setState({contentModel: contentModel});
        };

        let filterMethod = (ignored) => true;
        let isAggregate = (item: CatalogItemDataset) => item.name.endsWith("aggregation");

        switch (this.state.viewMode) {
            case ViewMode.Aggregates:
                filterMethod = isAggregate;
                break;
            case ViewMode.Files:
                filterMethod = (item: CatalogItemDataset) => !isAggregate(item);
        }

        let {esgfid} = labelModel;
        let content = this.state.contentModel ?
            this.state.contentModel.datasets.filter(filterMethod).map(createTableRow) :
            <LoadingIcons.Spinner/>;

        let ViewModeSelector = ({options, selected, className = ""}: { options: Map<ViewMode, string>, selected: ViewMode, className }) => {
            let onChange = ({target: {value: viewMode}}) => this.setState({viewMode: viewMode});

            let optionArray = Array.from(options.entries());
            let createOption = ([viewMode, label]) => <option value={viewMode}>{label}</option>;

            return <select className={"form-control-sm " + className}
                           name={"input-select-viewmode"}
                           value={selected}
                           onChange={onChange}>
                {optionArray.map(createOption)}
            </select>;
        };

        return (
            <Collapsible lazyRender={true}
                         trigger={<div><Arrow/>{esgfid}</div>}
                         onOpening={handleOpen}
                         onClosing={closeArrow}>
                <form className={"form-inline"}>
                    <b>View mode:</b> <ViewModeSelector options={new Map([
                    [ViewMode.Both, "Both"],
                    [ViewMode.Files, "Files"],
                    [ViewMode.Aggregates, "Aggregates"]
                ])} selected={this.state.viewMode} className={"mb-2 mr-sm-2"}/>
                </form>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Dataset</th>
                        <th scope="col">Size</th>
                        <th scope="col">Download</th>
                        <th scope="col">View</th>
                        <th scope="col">Basket</th>
                    </tr>
                    </thead>
                    <tbody>
                    {content}
                    </tbody>
                </table>
            </Collapsible>
        );
    }
}