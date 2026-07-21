import express from 'express';
import { Parser } from '@json2csv/plainjs';
import { flatten } from 'flat';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

app.post('/convert', (req, res) => {
    try {
        const inputData = req.body;

        let myData = Array.isArray(inputData.items)
            ? inputData.items
            : inputData;

        if (!Array.isArray(myData)) {
            myData = [myData];
        }

        if (myData.length === 0) {
            return res.status(400).send('JSON array is empty.');
        }

        // Разворачиваем все вложенные объекты
        const flattened = myData.map(item =>
            flatten(item, {
                delimiter: '.',
                safe: false
            })
        );

        const parser = new Parser();

        const csv = parser.parse(flattened);

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader(
            'Content-Disposition',
            'attachment; filename="converted.csv"'
        );

        res.send(csv);

    } catch (err) {
        console.error(err);
        res.status(500).send('Помилка конвертації.');
    }
});

app.listen(PORT, () => {
    console.log(`Server started http://localhost:${PORT}`);
});