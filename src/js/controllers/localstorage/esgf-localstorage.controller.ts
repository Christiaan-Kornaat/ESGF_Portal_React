import IConverter from "../../data/converters/converter.interface";

export class LocalStorageController<T, TJSONObject> {
    private readonly _default: any;
    private converter: IConverter<T, TJSONObject>;
    private readonly _storageKey: string;

    constructor(converter: IConverter<T, TJSONObject>, storageKey: string, _default: any = []) {
        this.converter = converter;
        this._storageKey = storageKey;
        this._default = _default;
    }

    getLocalstorage(): Promise<T>[] {
        if (!this.isLocalstorageSet()) {
            localStorage.setItem(this._storageKey, JSON.stringify(this._default));
        }
        let Localstorage = JSON.parse(localStorage.getItem(this._storageKey));
        return Localstorage.map(item => this.converter.fromJSONObject(item));
    }

    setLocalstorage(Localstorage: T[]): void {
        let Objects = Localstorage.map(item => this.converter.toJSONObject(item));

        let LocalstorageString = JSON.stringify(Objects);
        localStorage.setItem(this._storageKey, LocalstorageString);
    }

    isLocalstorageSet(): boolean {
        return !!localStorage.getItem(this._storageKey);
    }
}