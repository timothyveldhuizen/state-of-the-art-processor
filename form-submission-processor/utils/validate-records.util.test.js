import { validateRecords } from './validate-records.util';

const records = [
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

describe('Validate records', () => {
    it('should return records', () => {
        expect(validateRecords(records)).toBe(records);
    });
});