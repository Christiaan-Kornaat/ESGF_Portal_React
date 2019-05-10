import test from "jest";
import {firstToLower, firstToUpper, isNullOrEmpty} from "../../src/js/util/string.util";

test("isNullOrEmpty returns true if null", () => {
    let string = null;

    let actual = isNullOrEmpty(string);
    expect(actual).toBeTrue();
});
test("isNullOrEmpty returns true if undefined", () => {
    let string = undefined;

    let actual = isNullOrEmpty(string);
    expect(actual).toBeTrue();
});

test("isNullOrEmpty returns true if empty", () => {
    let string = "";

    let actual = isNullOrEmpty(string);
    expect(actual).toBeTrue();
});

test("isNullOrEmpty returns false if not", () => {
    let string = "not empty";

    let actual = isNullOrEmpty(string);
    expect(actual).not.toBeTrue();
});

test("firstToUpper returns string with first letter to upper", () => {
    let string = "test-string";

    let actual = firstToUpper(string);
    expect(actual).toBe("Test-string");
});

test("firstToUpper returns string with first letter to lower", () => {
    let string = "Test-string";

    let actual = firstToLower(string);
    expect(actual).toBe("test-string");
});

test("firstToUpper returns string with first letter to lower", () => {
    let string = "Test-string";

    let actual = firstToLower(string);
    expect(actual).toBe("test-string");
});

export function trimCharsRight(string, ...charsToTrim) {
    let regex = new RegExp("^" + charsToTrim.join("|"), "g");
    return string.replace(regex, "");
}

export function trimCharsLeft(string, ...charsToTrim) {
    let regex = new RegExp(charsToTrim.join("|") + "$", "g");
    return string.replace(regex, "");
}

export function trimChars(string, ...charsToTrim) {
    trimCharsRight(trimCharsLeft(string, charsToTrim), charsToTrim);
}
