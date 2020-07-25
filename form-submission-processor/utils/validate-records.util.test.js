import { validateRecords } from './validate-records.util';

const notUniqueRecords = [
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
        reference: 1,
        discount: 0,
        name: 'John Doe',
        phoneNumber: 123456789,
        startAmount: 10,
        subscription: 'Premium 2',
        totalAmount: 10,
    },
];

const invalidRecords = [
    {
        invalidAmount: false,
        notUnique: true,
        record: {
            reference: 1,
            discount: 5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 5,
        }
    },
    {
        invalidAmount: false,
        notUnique: true,
        record: {
            reference: 1,
            discount: 0,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 2',
            totalAmount: 10,
        }
    },
];

describe('Validate records', () => {
    it('should return invalid records when the reference field is not unique', () => {
        expect(validateRecords(notUniqueRecords)).toStrictEqual(invalidRecords);
    });
});