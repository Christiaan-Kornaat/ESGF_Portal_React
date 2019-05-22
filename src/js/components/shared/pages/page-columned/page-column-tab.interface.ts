export type PageColumnTabProps = { title: string, children?: JSX.Element[], key?: string, className?: string };

export default interface IPageColumnTab {
    title: string;

    render(): JSX.Element;
}