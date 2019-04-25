class InfoTabVM {
    constructor(tabTitle, textTitle, paragraphs) {

        this.tabTitle = tabTitle;
        this.textTitle = textTitle;
        this.paragraphs = paragraphs;
    }

    get content() {
        return {
            title: this.textTitle,
            paragraphs: this.paragraphs
        };
    }

    set content({title, paragraphs}) {
        this.textTitle = title;
        this.paragraphs = paragraphs;
    }
}

export default InfoTabVM;