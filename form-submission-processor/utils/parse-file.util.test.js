import { parseFile } from './parse-file.util';

const csvInput = `
Reference,Name,Phone Number,Subscription,Start Amount,Discount,Total Amount
1,John Doe,0123456789,Premium 1,10,5,5
2,John Doe,0123456789,Premium 2,10,0,10
`;

const parsedResultCsv = [
    {
    "Discount": "5",
    "Name": "John Doe",
    "Phone Number": "0123456789",
    "Reference": "1",
    "Start Amount": "10",
    "Subscription": "Premium 1",
    "Total Amount": "5",
    },
    {
    "Discount": "0",
    "Name": "John Doe",
    "Phone Number": "0123456789",
    "Reference": "2",
    "Start Amount": "10",
    "Subscription": "Premium 2",
    "Total Amount": "10",
    },
];

const xmlInput = `
<records>
    <record reference="1">
        <name>John Doe</name>
        <phoneNumber>0123456789</phoneNumber>
        <subscription>Premium 1</subscription>
        <startAmount>10</startAmount>
        <discount>5</discount>
        <totalAmount>5</totalAmount>
    </record>
    <record reference="2">
        <name>John Doe</name>
        <phoneNumber>0123456789</phoneNumber>
        <subscription>Premium 2</subscription>
        <startAmount>10</startAmount>
        <discount>0</discount>
        <totalAmount>10</totalAmount>
    </record>
</records>
`;

const parsedResultXml = {
    record: [
        {
            $: {
                reference: '1',
            },
            discount: ['5'],
            name: ['John Doe'],
            phoneNumber: ['0123456789'],
            startAmount: ['10'],
            subscription: ['Premium 1'],
            totalAmount: ['5'],
        },
        {
            $: {
                reference: '2',
            },
            discount: ['0'],
            name: ['John Doe'],
            phoneNumber: ['0123456789'],
            startAmount: ['10'],
            subscription: ['Premium 2'],
            totalAmount: ['10'],
        },
    ]
};


test('Should parse csv input', () => {
    expect(parseFile(csvInput, 'csv')).toStrictEqual(parsedResultCsv);
});

test('Should parse xml input', () => {
    expect(parseFile(xmlInput, 'xml')).toStrictEqual(parsedResultXml);
});