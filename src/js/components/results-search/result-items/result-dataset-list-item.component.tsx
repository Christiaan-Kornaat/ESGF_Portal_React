import ResultIcons from "../../shared/icons/result-icons.component";
import React from "react";
import {CatalogItemDataset} from "../../../model/dto/esgf-catalog-item.dto";

export default function DatasetListItem({dataset, key}: { dataset: CatalogItemDataset, key: number }) {
    let downloadLink = dataset.url ?
        <a target={"_blank"} href={dataset.url} className={"clickable"}><ResultIcons.Download
            className={"mx-auto"}/></a> :
        "-";

    return (
        <tr key={key}>
            <th scope="row">{key + 1}</th>
            <td>{dataset.name}</td>
            <td>{dataset.dataSize}</td>
            <td className="text-center">{downloadLink}</td>
            <td className="clickable text-center">View</td>
            <td className="clickable text-center"><ResultIcons.Basket/></td>
        </tr>
    );
}
;