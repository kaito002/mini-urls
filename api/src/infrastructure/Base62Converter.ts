const BASE_62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

export class Base62Converter {

    convertFrom(num: number): string {
        return this.conversion(num, "")
    }

    private conversion(num: number, carry: string): string {
        if (num === 0 && carry !== "") return carry
        const remainder = num % 62
        const result = Math.floor(num / 62)
        return this.conversion(result, BASE_62.charAt(remainder) + carry)
    }
}
