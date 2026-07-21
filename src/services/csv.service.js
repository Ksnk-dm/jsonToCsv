import { Parser } from '@json2csv/plainjs';
import { flatten } from 'flat';

import { normalizeInput } from '../utils/normalizeInput.js';

export function convertJsonToCsv(input) {

    const data = normalizeInput(input);

    const flattened = data.map(item =>
        flatten(item, {
            delimiter: '.',
            safe: false
        })
    );

    const parser = new Parser();

    return parser.parse(flattened);
}