export function validateRecords(records) {
    return createInvalidRecords(validateUniqueRecords(records), validateTotalAmountRecords(records));
}

export function validateUniqueRecords(records) {
    // Find all the references number that are not unique
    let notUniqueFieldReferences = records
    .map(element => element.reference)
    .filter((reference, index, array) => {
        return array.indexOf(reference) != index;
    });

    console.log('notUniqueFieldReferences: ', notUniqueFieldReferences);

    // Retrieve the records that have a reference that is not unique
    let notUniqueRecords = records.filter(element => {
        return notUniqueFieldReferences.includes(element.reference)
    });
    console.log('notUniqueRecords', notUniqueRecords);

    return notUniqueRecords;
    // return createInvalidRecords(notUniqueRecords);
}

export function validateTotalAmountRecords(records) {
    // Find all the records that have a invalid total amount
    let invalidTotalAmountRecords = records.filter((element, index, array) => {
        if(!Number.isInteger(element.discount) && element.discount <= 0.5) {
            return element.startAmount * (1 - element.discount) != element.totalAmount;
        }
        if(Number.isInteger(element.discount)) {
            return element.startAmount - element.discount != element.totalAmount
        }
    });

    console.log('invalidTotalAmountRecords: ', invalidTotalAmountRecords);

    return invalidTotalAmountRecords;
    // return createInvalidRecords(invalidTotalAmountRecords);
}

// Push it to invalid records
// Method to use adding updating invalid records that does a check on notUnique and invalidAmount
export function createInvalidRecords(notUniqueRecords, invalidTotalAmountRecords) {
    let invalidRecordsList = [];

    

    // invalidRecords.forEach(element => {
    //     listInvalidRecords.push({
    //         notUnique: true,
    //         invalidAmount: false,
    //         record: element,
    //     })
    // })

    // return listInvalidRecords;
}