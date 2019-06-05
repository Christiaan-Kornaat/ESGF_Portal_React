import Buttons from "../buttons/buttons.component";
import ArrowIcons from "../icons/arrow-icons.component";
import React, {ChangeEvent, Component, KeyboardEvent} from "react";

type Props = { onPageChange: (page) => void, defaultPage?: number, maxPage: number, className?: string };
type State = { currentPage: number };

export default class PageSelector extends Component<Props> {
    get currentPage(): number {
        return this.state.currentPage;
    }

    set currentPage(index: number) {
        if (index < 1 || index > this.props.maxPage) return;
        if (this.props.onPageChange) this.props.onPageChange(index);

        this.setState({currentPage: index});
    }

    state: State;
    private selectionElement: HTMLInputElement;


    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            currentPage: this.props.defaultPage || 1
        };
    }

    selectPage(pageIndex: number): void { this.currentPage = pageIndex; }

    prevPage(): void { this.currentPage--; };

    nextPage(): void { this.currentPage++; };

    render() {
        let handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            event.target.blur();
            this.currentPage = Number(event.target.value) - 1;

            return this.selectPage(this.currentPage);
        };
        let currentPage = this.currentPage;
        this.selectionElement && (this.selectionElement.value = String(currentPage));

        let handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => event.key == "Enter" && this.selectionElement.blur();

        return (
            <ul className={"pagination"}>
                <li className={"page-item"}>
                    <Buttons.IconButton onClick={() => this.prevPage()} className={"page-link"}>
                        <ArrowIcons.Left/>
                    </Buttons.IconButton>
                </li>
                <li className={"page-item"}>
                    <input type={"number"}
                           ref={(element) => this.selectionElement = element}
                           defaultValue={String(currentPage)}
                           className={"text-center form-control input-sm page-link"}
                           onKeyUp={handleEnterKey}
                           onBlur={handleInputChange}/>
                </li>
                <li className={"page-item"}>
                    <Buttons.IconButton onClick={() => this.nextPage()} className={"page-link"}>
                        <ArrowIcons.Right/>
                    </Buttons.IconButton>
                </li>
            </ul>
        );
    }
}
