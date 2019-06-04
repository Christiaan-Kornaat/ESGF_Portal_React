import React, {Component} from "react";
import Collapsible from "react-collapsible";
import ArrowIcons from "../../shared/icons/arrow-icons.component";
import EsgfCatalogItem, {CatalogItemDataset} from "../../../model/dto/esgf-catalog-item.dto";
import ESGFDataNodeResultDTO from "../../../model/dto/esgf-data-node-result.dto";
import ICatalogProvider from "../../../data/catalog/catalog.provider.interface";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import DatasetListItem from "./result-dataset-list-item.component";

type ResultItemProps = { labelModel: ESGFDataNodeResultDTO, resultProvider: ICatalogProvider };

enum ViewMode {
    Files = "viewmode-files",
    Aggregates = "viewmode-aggregates",
    Both = "viewmode-both",
}

enum ErrorState {
    NoError,
    ConnectionError,
    NotFoundError
}

type State = { isOpen: boolean, contentModel: EsgfCatalogItem, viewMode: ViewMode, errorState: ErrorState };

export default class ResultItem extends Component<ResultItemProps> {

    get renderDatasets() {
        let filterMethod = (ignored) => true;
        let isAggregate = (item: CatalogItemDataset) => item.name.endsWith("aggregation");

        switch (this.state.viewMode) {
            case ViewMode.Aggregates:
                filterMethod = isAggregate;
                break;
            case ViewMode.Files:
                filterMethod = (item: CatalogItemDataset) => !isAggregate(item);
        }

        return this.state.contentModel.datasets.filter(filterMethod);

    }

    private get contentComponent() {

        let {errorState, contentModel} = this.state;

        if (errorState != ErrorState.NoError) return <LoadingIcons.Error className={"text-danger"}/>;
        if (!contentModel) return <LoadingIcons.Spinner/>;

        let createTableRow = (dataset: CatalogItemDataset, index: number) =>
            <DatasetListItem dataset={dataset}
                             index={index}/>;

        return this.renderDatasets.map(createTableRow);
    }

    state: State;

    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            contentModel: null,
            viewMode: ViewMode.Both,
            errorState: ErrorState.NoError
        };

    }

    setArrowIsOpen(isOpen: boolean) {
        this.setState({isOpen: isOpen});
    }

    private async fetchContentModel() {
        try {
            let contentModel = await this.props.resultProvider.provide(this.props.labelModel);
            this.setState({contentModel: contentModel});
        } catch (e) {
            this.setState({errorState: ErrorState.ConnectionError});
        }
    }

    render() {
        let {isOpen} = this.state;
        let {labelModel} = this.props;

        let Arrow = isOpen ? ArrowIcons.Down : ArrowIcons.Up;

        let closeArrow = () => this.setArrowIsOpen(true);
        let openArrow = () => this.setArrowIsOpen(false);
        let handleOpen = () => {
            openArrow();
            return this.fetchContentModel();
        };

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

        let {esgfid} = labelModel;
        let content = this.contentComponent;

        return (
            <Collapsible lazyRender={true}
                         trigger={<div><Arrow/>{esgfid}</div>}
                         onOpening={handleOpen}
                         onClosing={closeArrow}>
                <form className={"form-inline"}>
                    <b>View mode:</b><br/> <ViewModeSelector options={new Map([
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