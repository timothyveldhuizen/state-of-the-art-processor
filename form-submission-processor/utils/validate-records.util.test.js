import { validateUniqueRecords, validateTotalAmountRecords } from './validate-records.util';

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
        reference: 1,
        discount: 0,
        name: 'John Doe',
        phoneNumber: 123456789,
        startAmount: 10,
        subscription: 'Premium 2',
        totalAmount: 10,
    },
    {
        reference: 2,
        discount: 5,
        name: 'John Doe',
        phoneNumber: 123456789,
        startAmount: 10,
        subscription: 'Premium 1',
        totalAmount: 6,
    },
    {
        reference: 3,
        discount: 0.8,
        name: 'John Doe',
        phoneNumber: 123456789,
        startAmount: 10,
        subscription: 'Premium 2',
        totalAmount: 8,
    },
    {
        reference: 4,
        discount: 0.5,
        name: 'John Doe',
        phoneNumber: 123456789,
        startAmount: 10,
        subscription: 'Premium 2',
        totalAmount: 7,
    },
];

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

const invalidTotalAmountRecords = [
    {
        reference: 2,
        discount: 5,
        name: 'John Doe',
        phoneNumber: 123456789,
        startAmount: 10,
        subscription: 'Premium 1',
        totalAmount: 6,
    },
    {
        reference: 4,
        discount: 0.5,
        name: 'John Doe',
        phoneNumber: 123456789,
        startAmount: 10,
        subscription: 'Premium 2',
        totalAmount: 7,
    },
];

describe('Validate records', () => {
    it('should return invalid records when the reference field is not unique', () => {
        expect(validateUniqueRecords(records)).toStrictEqual(notUniqueRecords);
    });

    it('should return invalid records when the total amount field is not correct', () => {
        expect(validateTotalAmountRecords(records)).toStrictEqual(invalidTotalAmountRecords);
    });
});