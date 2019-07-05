import ResultIcons from "../../shared/icons/result-icons.component";
import React from "react";
import {CatalogItemDataset} from "../../../model/dto/esgf-catalog-item.dto";

export default function DatasetListItem(props: { dataset: CatalogItemDataset, index: number }) {
    let {dataset, index} = props;

    let downloadLink = dataset.url ?
        <a target={"_blank"}
           href={dataset.url}
           className={"clickable"}>
            <ResultIcons.Download className={"mx-auto"}/>
        </a> :
        "-";

    let notImplementedAlert = () => alert("Not yet implemented, we're working on it!")    //TODO remove this, beta only

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{dataset.name}</td>
            <td>{dataset.dataSize}</td>
            <td className="text-center">{downloadLink}</td>
            <td className="clickable text-center" onClick={notImplementedAlert}>View</td>
            <td className="clickable text-center" onClick={notImplementedAlert}><ResultIcons.Basket/></td>
        </tr>
    );
}
;