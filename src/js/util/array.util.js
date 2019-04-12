/**
 *
 * @param {number}start
 * @param {number}end
 * @return {Array<number>}
 */
export function range(start, end) {
    let length = end - start;

    if (length <= 0) throw new Error("end cannot be smaller than or equal to start");

    //create range from start - end
    return Array.from(new Array(length), (value, index) => index + start);
}

export function remove_from_array(array, item) {
    if (!array.includes(item)) return false;

    let index = array.indexOf(item);
    array.splice(index, 1);

    return true;
}