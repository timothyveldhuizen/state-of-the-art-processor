import { parseFile, FileType } from './parse-file.util';
import { convertToCamelCasing } from './parse-file.util';

const parsedResult = [
    {
        reference: 1,
        discount: 5,
        name: 'John Doe',
        phoneNumber: 123456789,
        startAmount: 10,
        subscription: 'Premium 1',
        totalAmount: 5,
    },
    {
        reference: 2,
        discount: 0,
        name: 'John Doe',
        phoneNumber: 123456789,
        startAmount: 10,
        subscription: 'Premium 2',
        totalAmount: 10,
    },
];

describe('Parsing the input files', () => {
    it('should convert string to camelcasing', () => {
        const input = 'Start-Amount and total Amount  Is   Valid';
        const expected = 'startAmountAndTotalAmountIsValid';
        expect(convertToCamelCasing(input)).toEqual(expected)
    });

    it('should parse csv input to array of record objects', () => {
        const csvInput = `
Reference,Name,Phone Number,Subscription,Start Amount,Discount,Total Amount
1,John Doe,123456789,Premium 1,10,5,5
2,John Doe,123456789,Premium 2,10,0,10`;
        
        expect(parseFile(csvInput, FileType.CSV)).toStrictEqual(parsedResult);
    });

    it('should parse xml input to array of record objects', () => {
        const xmlInput = `
            <records>
                <record reference="1">
                    <name>John Doe</name>
                    <phone-number>123456789</phone-number>
                    <subscription>Premium 1</subscription>
                    <start-amount>10</start-amount>
                    <discount>5</discount>
                    <total-amount>5</total-amount>
                </record>
                <record reference="2">
                    <name>John Doe</name>
                    <phone-number>123456789</phone-number>
                    <subscription>Premium 2</subscription>
                    <start-amount>10</start-amount>
                    <discount>0</discount>
                    <total-amount>10</total-amount>
                </record>
            </records>`;

        expect(parseFile(xmlInput, FileType.XML)).toStrictEqual(parsedResult);
    });
});
