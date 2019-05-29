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
        return Localstorage.map(this.converter.fromJSONObject);
    }

    setLocalstorage(Localstorage: T[]) {
        let Objects = Localstorage.map(this.converter.toJSONObject);

        let LocalstorageString = JSON.stringify(Objects);
        localStorage.setItem(this._storageKey, LocalstorageString);
    }

    isLocalstorageSet(): boolean {
        return localStorage.getItem(this._storageKey) ? true : false;
    }
}