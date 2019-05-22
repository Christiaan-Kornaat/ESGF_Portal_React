import {firstToLower, firstToUpper, isNullOrEmpty, trimChars, trimCharsLeft, trimCharsRight } from "../../src/js/util/string.util";

test("isNullOrEmpty returns true if null", () => {
    let string = null;

    let actual = isNullOrEmpty(string);
    expect(actual).toBe(true);
});
test("isNullOrEmpty returns true if undefined", () => {
    let string = undefined;

    let actual = isNullOrEmpty(string);
    expect(actual).toBe(true);
});

test("isNullOrEmpty returns true if empty", () => {
    let string = "";

    let actual = isNullOrEmpty(string);
    expect(actual).toBe(true);
});

test("isNullOrEmpty returns false if not", () => {
    let string = "not empty";

    let actual = isNullOrEmpty(string);
    expect(actual).not.toBe(true);
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

test("trimCharsLeft trims char left", () => {
    let string = "_test-string_";

    let actual = trimCharsLeft(string, "_");
    expect(actual).toBe("test-string_");
});
test("trimCharsRight trims char right", () => {
    let string = "_test-string_";

    let actual = trimCharsRight(string, "_");
    expect(actual).toBe("_test-string");
});
test("trimChars trims char left and right", () => {
    let string = "_test-string_";

    let actual = trimChars(string, "_");
    expect(actual).toBe("test-string");
});
test("trimChars trims char left and right", () => {
    let string = "_test_string_";

    let actual = trimChars(string, "_");
    expect(actual).toBe("test_string");
});
