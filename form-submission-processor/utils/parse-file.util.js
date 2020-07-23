import Papa from 'papaparse';
import { parseString } from 'xml2js';
import { parseNumbers } from 'xml2js/lib/processors';

export function parseFile(input, fileType) {
    if(fileType == 'csv') {
        /* 
        * header: true, makes the result a key-value pair e.g. header: value
        * dynamicTyping: true, makes strings containing boolean or numeric value to result in a boolean or number object
        * skipEmptyLines: true, will skip empty lines in the csv
        * transformHeader: function, provide a function that alters the header
        */
        return Papa.parse(input, {header: true, dynamicTyping: true, skipEmptyLines: true, transformHeader: convertToCamelCasing}).data;
    }
    if(fileType == 'xml') {
        /*
        * explicitRoot: false, will not include the root xml element in the outputted result
        * explicitArray: false, will not return Array values for single values in the xml element
        * mergeAttrs: true, makes the attribute of a xml tagname to be a normal property key-value in the result
        * tagNameProcessors: function, provide a function that alters the xml tagnames
        * valueProcessors: function, provide a function that alters the values containing boolean or numeric value to result in a boolean or number object
        * attrValueProcessors: function, provide a function that alters the values containing boolean or numeric value to result in a boolean or number object
        */
        let parsedResult;
        parseString(input, {explicitRoot: false, explicitArray: false, mergeAttrs: true, tagNameProcessors: [convertToCamelCasing], valueProcessors: [parseNumbers], attrValueProcessors: [parseNumbers]}, (err, result) => {
            parsedResult = result.record
        });
        return parsedResult;
    }
}

export function convertToCamelCasing(name) {
    return concatWords(
        name.replace(/\b\w/g, (match, offset) => {
            return offset == 0 ? match.toLowerCase() : match.toUpperCase();
        })
    );
}

function concatWords(word) {
    return word.replace(/\W/g, '');
}