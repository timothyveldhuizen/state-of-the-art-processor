let listInvalidRecords = [];

export function validateRecords(records) {
    validateUniqueFieldReference(records)
    return listInvalidRecords;
}

function validateUniqueFieldReference(records) {
    // Find all the references number that are not unique
    let notUniqueFieldReferences = records.filter((element, index, array) => {
        return array.indexOf(element.reference) != index;
    });

    // console.log('notUniqueFieldReferences: ', notUniqueFieldReferences);

    // Retrieve the records that have a reference that is not unique
    let notUniqueRecords = records.filter(element => {
        return notUniqueFieldReferences.includes(element)
    });
    // console.log('notUniqueRecords', notUniqueRecords);

    createInvalidRecords(notUniqueRecords);
}

// Push it to invalid records
// Method to use adding updating invalid records that does a check on notUnique and invalidAmount
function createInvalidRecords(invalidRecords) {
    invalidRecords.forEach(element => {
        listInvalidRecords.push({
            notUnique: true,
            invalidAmount: false,
            record: element,
        })
    })

    return listInvalidRecords;
}