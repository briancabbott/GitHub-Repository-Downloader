






export function mapReplacer(key: string | number | Symbol, value: any) {
    if (value instanceof Map) {
        return Object.fromEntries(value.entries());
    }

    return value;
}
