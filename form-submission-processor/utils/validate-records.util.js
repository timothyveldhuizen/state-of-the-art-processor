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
    const notUniqueFieldReferences = fieldReferences.filter((ref, index, refArray) => {
        return refArray.indexOf(ref) !== index
    })

    // negate to return isUnique
    return !notUniqueFieldReferences.includes(record.reference)
}

export function validateFieldTotalAmountIsValid(record) {
    if (!Number.isInteger(record.discount) && record.discount <= 0.5) {
        return record.startAmount * (1 - record.discount) == record.totalAmount;
    }
    if (Number.isInteger(record.discount)) {
        return record.startAmount - record.discount == record.totalAmount;
    }
    return false;
}