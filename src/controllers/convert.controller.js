import { convertJsonToCsv } from '../services/csv.service.js';

export function convert(req, res) {
    try {
        const csv = convertJsonToCsv(req.body);

        res.setHeader(
            'Content-Type',
            'text/csv; charset=utf-8'
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename="converted.csv"'
        );

        res.send(csv);
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
}