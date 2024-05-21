import {Base62Converter} from "../../src/infrastructure/Base62Converter";

describe('Base 62 Converter Test', () => {

    let base62Converter: Base62Converter;

    beforeEach(() => {
        base62Converter = new Base62Converter();
    })

    test("should return 0 as hash", () => {
        const result = base62Converter.convertFrom(0)

        expect(result).toBe("0");
    })

    test("should start counting in new base", () => {
        const result = base62Converter.convertFrom(62)

        expect(result).toBe("10");
    })

    test("should start counting in new base and carry values", () => {
        const result = base62Converter.convertFrom(11157)

        expect(result).toBe("2TX");
    })
})
