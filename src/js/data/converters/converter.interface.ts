export default interface IConverter<TObject, TJSONObject> {
    toJSONObject(fromObject: TObject): TJSONObject;
    fromJSONObject(jsonObject: TJSONObject): Promise<TObject>
}