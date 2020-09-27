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

    // Check if the records reference id is included in the not unique field references
    return notUniqueFieldReferences.includes(record.reference) ? `Reference ${record.reference} is not unique` : true;

}

export function validateFieldStartAmount(record) {
    return isNegative(record.startAmount) ? `Start amount of ${record.startAmount} can not be negative` : true;
}

export function validateFieldDiscount(record) {
    if(isNegative(record.discount)) {
        return `Discount of ${record.discount} can not be negative`;
    }
    if(isPercentage(record.discount) && isPercentageLowerThen50Percent(record.discount)) {
        return `Discount of ${record.discount * 100}% is not valid, should be lower then 50%`;
    }
    return true;
}

export function validateFieldTotalAmountIsValid(record) {
    switch(isPercentage(record.discount)) {
        case true: return validateCalculatedTotalAmount(record.startAmount * (1 - record.discount), record);
        case false: return validateCalculatedTotalAmount(record.startAmount - record.discount, record);
    }
}

function validateCalculatedTotalAmount(calculatedTotalAmount, record) {
    if(isNegative(calculatedTotalAmount)) {
        return `Calculated total amount of ${calculatedTotalAmount} is not correct, can not be negative`;
    }
    if(validateFieldStartAmount(record) !== true) {
        return `Calculated total amount of ${record.totalAmount} is not correct`;
    }
    if(validateFieldDiscount(record) !== true) {
        return `Calculated total amount of ${record.totalAmount} is not correct, discount is invalid`;
    }
    if(calculatedTotalAmount !== record.totalAmount) {
        return `Calculated total amount of ${record.totalAmount} is not correct, should be ${calculatedTotalAmount}`
    }
    return true;
}

function isPercentage(number) {
    return !Number.isInteger(number);
}

function isPercentageLowerThen50Percent(number) {
    return number > 0.5 && number < 1
}

function isNegative(number) {
    return Math.sign(number) === -1;
}