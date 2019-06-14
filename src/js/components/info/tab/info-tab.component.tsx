import * as React from "react";
import InfoTabVM from "../../../model/view-model/InfoTabVM";
import PageColumnTab from "../../shared/pages/page-columned/page-column-tab.component";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import InfoTabVmFactory from "../../../model/factories/info-tab-vm.factory";

export namespace PageColumnTabs {
    export namespace InfoTabs {
        export function InfoTab({viewModel}: { viewModel: InfoTabVM }): JSX.Element {
            let {paragraphs, textTitle} = viewModel;

            let InfoParagraph = ({title, content}) =>
                <div className="paragraph">
                    <h5 className="header">{title}</h5>
                    <p className="text">
                        {content}
                    </p>
                </div>;


            let paragraphObjects = Object.keys(paragraphs)
                                         .map(key => <InfoParagraph key={key}
                                                                    title={key}
                                                                    content={paragraphs[key]}/>);

            let content = (
                <div className="infotab">
                    <h4 className="title">{textTitle}</h4>
                    {paragraphObjects}
                </div>
            );

            return <PageColumnTab title={viewModel.tabTitle}
                                  key={viewModel.tabTitle}>
                {[content]}
            </PageColumnTab>;
        }

        export function PropertyInfoTab({property}: { property: ESGFFilterPropertyDTO }): JSX.Element {
            let infoTabVMFactory = new InfoTabVmFactory();

            let viewModel = infoTabVMFactory.createPropertyVM(property);
            return <InfoTab viewModel={viewModel}/>;
        }
    }
}