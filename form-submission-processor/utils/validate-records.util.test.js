import { validateFieldReferenceIsUnique, validateFieldTotalAmountIsValid, validateRecords, validateFieldStartAmount, validateFieldDiscount } from './validate-records.util';

describe('Validate field reference of the record', () => {
    it('should return true when the reference is unique', () => {
        const record1 = {
            reference: 1,
            discount: 5,
            name: 'John Doe 1',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 5,
        }

        const record2 = {
            reference: 2,
            discount: 4,
            name: 'John Doe 2',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 6,
        }

        const records = [record1, record2]

        expect(validateFieldReferenceIsUnique(record1, records)).toBe(true);
        expect(validateFieldReferenceIsUnique(record2, records)).toBe(true);
    });

    it('should return invalid message when the reference is not unique', () => {
        const record1 = {
            reference: 1,
            discount: 5,
            name: 'John Doe 1',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 5,
        }

        const record2 = {
            reference: 1,
            discount: 4,
            name: 'John Doe 2',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 6,
        }

        const records = [record1, record2]

        expect(validateFieldReferenceIsUnique(record1, records)).toBe('Reference 1 is not unique');
        expect(validateFieldReferenceIsUnique(record2, records)).toBe('Reference 1 is not unique');
    });    
});

describe('Validate field total amount of the record', () => {
    it('should return invalid message when the total amount field is invalid', () => {
        const record = {
            reference: 2,
            discount: 5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 6,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe('Calculated total amount of 6 is not correct, should be 5');
    });

    it('should return true when the total amount field is valid', () => {
        const record = {
            reference: 2,
            discount: 0,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 10,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe(true);
    });

    
    it('should return invalid message when the start amount field is a negative number', () => {
        const record = {
            reference: 2,
            discount: 5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: -10,
            subscription: 'Premium 1',
            totalAmount: 5,
        }
        expect(validateFieldStartAmount(record)).toBe('Start amount of -10 can not be negative');
        expect(validateFieldTotalAmountIsValid(record)).toBe('Calculated total amount of -15 is not correct, can not be negative');
    });

    it('should return invalid message when the calculated total amount field is a negative number', () => {
        const record = {
            reference: 2,
            discount: 8,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 5,
            subscription: 'Premium 1',
            totalAmount: 5,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe('Calculated total amount of -3 is not correct, can not be negative');
    });
    
    it('should return invalid message when the total amount field is a negative number', () => {
        const record = {
            reference: 2,
            discount: 5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: -5,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe('Calculated total amount of -5 is not correct, should be 5');
    });
    // fix this test
    it('should return invalid message when the discount field is a negative number', () => {
        const record = {
            reference: 2,
            discount: -5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 5,
        }
        expect(validateFieldDiscount(record)).toBe('Discount of -5 can not be negative');
        expect(validateFieldTotalAmountIsValid(record)).toBe('Calculated total amount of 5 is not correct');
    });

    it('should return invalid message when the discount field is a percentage less than 0.5 and total amount field is invalid', () => {
        const record = {
            reference: 2,
            discount: 0.5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 4,
        }
        expect(validateFieldDiscount(record)).toBe(true);
        expect(validateFieldTotalAmountIsValid(record)).toBe('Calculated total amount of 4 is not correct, should be 5');
    });

    it('should return true when the discount field is a percentage off 0.5 and total amount field is valid', () => {
        const record = {
            reference: 2,
            discount: 0.5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 9,
            subscription: 'Premium 1',
            totalAmount: 4.5,
        }
        expect(validateFieldDiscount(record)).toBe(true);
        expect(validateFieldTotalAmountIsValid(record)).toBe(true);
    });
    // fix this test
    it('should return invalid message when the discount field is a percentage more than 0.5', () => {
        const record = {
            reference: 2,
            discount: 0.51,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 4,
        }
        expect(validateFieldDiscount(record)).toBe('Discount of 51% is not valid, should be lower then 50%');
        expect(validateFieldTotalAmountIsValid(record)).toBe('Calculated total amount of 4 is not correct');
    });
});

describe('Return a list of records', () => {
    it('should return a list of records that are validated', () => {
        const record1 = {
            reference: 1,
            discount: 5,
            name: 'John Doe 1',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 5,
        }

        const record2 = {
            reference: 1,
            discount: 0,
            name: 'John Doe 2',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 6,
        }

        const record3 = {
            reference: 3,
            discount: 4,
            name: 'John Doe 3',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 6,
        }

        const records = [record1, record2, record3]

        const validatedRecords = [
            {
                isUniqueReference: 'Reference 1 is not unique',
                isValidDiscount: true,
                isValidStartAmount: true,
                isValidTotalAmount: true,
                record: record1,
            },
            {
                isUniqueReference: 'Reference 1 is not unique',
                isValidDiscount: true,
                isValidStartAmount: true,
                isValidTotalAmount: 'Calculated total amount of 6 is not correct, should be 10',
                record: record2,
            },
            {
                isUniqueReference: true,
                isValidDiscount: true,
                isValidStartAmount: true,
                isValidTotalAmount: true,
                record: record3,
            },
        ]

        expect(validateRecords(records)).toStrictEqual(validatedRecords)
    });
});