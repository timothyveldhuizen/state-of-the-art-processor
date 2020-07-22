import parse from 'csv-parse/lib/sync';
import { parseString } from 'xml2js';

export function parseFile(input, fileType) {
    if(fileType == 'csv') {
        return parse(input, {
            columns: true, // make a function that camelCases it
            skip_empty_lines: true
          });
    }
    if(fileType == 'xml') {
        let parsedResult;
        parseString(input, {explicitRoot: false} , (err, result) => {
            parsedResult = result
        });
        return parsedResult;
    }
}

// make a function that returns a standard record object no matter what filetype

class Record {
    reference;
    name;
    phoneNumber;
    subscription;
    startAmount;
    discount;
    totalAmount;
}