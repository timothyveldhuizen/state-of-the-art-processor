import { validateFieldReferenceIsUnique, validateFieldTotalAmountIsValid, validateRecords } from './validate-records.util';

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

    it('should return false when the reference is not unique', () => {
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

        expect(validateFieldReferenceIsUnique(record1, records)).toBe(false);
        expect(validateFieldReferenceIsUnique(record2, records)).toBe(false);
    });    
});

describe('Validate field total amount of the record', () => {
    it('should return false when the total amount field is invalid', () => {
        const record = {
            reference: 2,
            discount: 5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 6,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe(false);
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

    
    it('should return false when the start amount field is a negative number', () => {
        const record = {
            reference: 2,
            discount: 5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: -10,
            subscription: 'Premium 1',
            totalAmount: 5,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe(false);
    });
    
    it('should return false when the total amount field is a negative number', () => {
        const record = {
            reference: 2,
            discount: 5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: -5,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe(false);
    });
    
    it('should return false when the discount field is a negative number', () => {
        const record = {
            reference: 2,
            discount: -5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 5,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe(false);
    });

    it('should return false when the discount field is a percentage less than 0.5 and total amount field is invalid', () => {
        const record = {
            reference: 2,
            discount: 0.5,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 4,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe(false);
    });

    it('should return true when the discount field is a percentage less than 0.5 and total amount field is valid', () => {
        const record = {
            reference: 2,
            discount: 0.15,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 8.5,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe(true);
    });

    it('should return false when the discount field is a percentage more than 0.5', () => {
        const record = {
            reference: 2,
            discount: 0.51,
            name: 'John Doe',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 4,
        }
        expect(validateFieldTotalAmountIsValid(record)).toBe(false);
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
                isUniqueReference: false,
                isValidTotalAmount: true,
                record: record1,
            },
            {
                isUniqueReference: false,
                isValidTotalAmount: false,
                record: record2,
            },
            {
                isUniqueReference: true,
                isValidTotalAmount: true,
                record: record3,
            },
        ]

        expect(validateRecords(records)).toStrictEqual(validatedRecords)
    });
});