export function validateRecords(records) {
    return records.map((record) => {
        return {
            isUniqueReference: validateFieldReferenceIsUnique(record, records),
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
    // negate to return isUnique
    return !notUniqueFieldReferences.includes(record.reference)
}

export function validateFieldTotalAmountIsValid(record) {
    // If discount is a percentage 0.5 or lower, then calculate total amount with discount percentage
    if (!Number.isInteger(record.discount) && record.discount <= 0.5) {
        return record.startAmount * (1 - record.discount) == record.totalAmount;
    }
    // If discount is a integer, then calculate total amount by subtracting discount
    if (Number.isInteger(record.discount)) {
        return record.startAmount - record.discount == record.totalAmount;
    }
    return false;
}