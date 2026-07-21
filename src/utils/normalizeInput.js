export function normalizeInput(input) {

    let data = Array.isArray(input.items)
        ? input.items
        : input;

    if (!Array.isArray(data)) {
        data = [data];
    }

    if (data.length === 0) {
        throw new Error('JSON array is empty.');
    }

    return data;
}