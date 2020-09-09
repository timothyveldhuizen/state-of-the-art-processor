export function validateRecords(records) {
    return records.map((record) => {
        return {
            isUniqueReference: validateFieldReferenceIsUnique(record, records),
            isValidStartAmount: validateFieldStartAmount(record),
            isValidDiscount: validateFieldDiscount(record),
            isValidTotalAmount: validateFieldTotalAmountIsValid(record),
            record: record
        }
    });
}

export function validateFieldReferenceIsUnique(record, array) {
    const fieldReferences = array.map(record => record.reference);

    // Check all the reference id's that are not unique
    const notUniqueFieldReferences = fieldReferences.filter((ref, index, refArray) => {
        return refArray.indexOf(ref) !== index
    })

    // Check if the records reference is included in the not unique field references
    return notUniqueFieldReferences.includes(record.reference) ? `Reference ${record.reference} is not unique` : true;

}

export function validateFieldStartAmount(record) {
    return Math.sign(record.startAmount) == -1 ? `Start amount of ${record.startAmount} can not be negative` : true;
}

export function validateFieldDiscount(record) {
    if(Math.sign(record.discount) == -1) {
        return `Discount of ${record.discount} can not be negative`;
    }
    if(!Number.isInteger(record.discount) && record.discount > 0.5 && record.discount < 1) {
        return `Discount of ${record.discount * 100}% is not valid, should be lower then 50%`;
    }
    return true;
}

export function validateFieldTotalAmountIsValid(record) {
    // If discount is a percentage, then calculate total amount with discount percentage
    if(!Number.isInteger(record.discount)) {
        const calculatedTotalAmount = record.startAmount * (1 - record.discount);

        if(Math.sign(calculatedTotalAmount) == -1) {
            return `Calculated total amount of ${calculatedTotalAmount} is not correct, can not be negative`;
        }
        if(validateFieldStartAmount(record) != true) {
            return `Calculated total amount of ${record.totalAmount} is not correct`;
        }
        if(validateFieldDiscount(record) != true) {
            return `Calculated total amount of ${record.totalAmount} is not correct, discount is invalid`;
        }
        if(calculatedTotalAmount != record.totalAmount) {
            return `Calculated total amount of ${record.totalAmount} is not correct, should be ${calculatedTotalAmount}`
        }

        return true;
    }
    // If discount is a integer, then calculate total amount by subtracting discount
    if(Number.isInteger(record.discount)) {
        const calculatedTotalAmount = record.startAmount - record.discount;

        if(Math.sign(calculatedTotalAmount) == -1) {
            return `Calculated total amount of ${calculatedTotalAmount} is not correct, can not be negative`;
        }
        if(validateFieldStartAmount(record) != true ) {
            return `Calculated total amount of ${record.totalAmount} is not correct`;
        }
        if(validateFieldDiscount(record) != true) {
            return `Calculated total amount of ${record.totalAmount} is not correct, discount is invalid`;
        }
        if(calculatedTotalAmount != record.totalAmount) {
            return `Calculated total amount of ${record.totalAmount} is not correct, should be ${calculatedTotalAmount}`
        }
        return true;
    }
    return true;
}