# State-of-the-art processor

This a state-of-the-art processor which validates form submission records.

## Form submission record

A form submission record exists of:

| Field | Description |
| --- | --- |
|Reference |A numeric value|
|Name |Free text|
|Phone number |A number|
|Subscription type|Free text|
|Start Amount |The start amount in Euros|
|Discount |Either a percentage (%) or a amount in Euros|
|Total Amount |The total amount in Euros|

## Data validation

- The field `Reference` should be unique
- The field `Total Amount` should be correct based on `Start Amount` and `Discount`
- After processing display a report with the result
-- If there are failed records, then display both the reference and name of each of the failed records.

## Challenge

The challenge is to handle xml and csv input files which contain records and validate them.
Also the input and validation logic should be separated as much as possible, so it is easy to use different (ui) frameworks for displaying it in the browser.

## How to use

### Install and start ui

Go to the correct app folder, e.g. `cd angular/app` and run `npm install`.
To run the apps from the root directory: `npm run start:angular` or `npm run start:react` or `npm run start:vue` (vue app will run with yarn).

The apps contain a local NPM dependency `form-submission-processor` which points to the exact same folder with all the logic for processing the form submission records, like parsing and validating.
This dependency will handle the parsing of the files (csv, xml) and transforming it into an array of record objects.
Also it can validate the record objects and return a validated list of record objects.

Note: Angular and React hot-reload the dependency in node_modules when making changes to the files in folder form-submission-processor.

Issue: Vue doesn't hot-reload the dependency in node_modules when making changes to the files in folder form-submission-processor. You have to manually do `yarn add file:../../form-submission-processor` to update the dependency when you saved your changes.

### Unit test

With Jest you can run unit tests for `form-submission-processor`, go to that folder and do `npm run test` to run all unit tests for the `form-submission-processor`. Or `npm run test "validate"` to run the `validate-records.util.test.js` file.

## Implementation

### form-submission-processor

This is a local NPM dependency and is using Papa Parse and xml2js to parse uploaded text/csv or text/xml files.

#### Parsing the file

[Papa Parse](https://www.npmjs.com/package/papaparse) was picked as it is a standalone dependency, small in unpacked size and has a easy to use parse method with a lot of config and value process / transform options. Even by default a fast mode and can handle large files.

[xml2js](https://www.npmjs.com/package/xml2js) was picked as it is very small in unpacked size, easy to use parse method with a lot of config and value process / transform options. Quite similar to Papa Parse.

Because they are quite similar in parse method it is easy to return the same model after parsing, which can be used to be validated.

For both parse methods we configured numeric values to be numeric values in the parsed object and to return a clean object as possible resembling a record form submission record.

During that parsing a custom transformation function is used that converts the csv headers or xml tagnames to camelCasing. So the returned object has keys that are camelCased and consistent no matter if you parse a csv or xml file.

The returned object after parsing csv or xml is:
```js
// A parsed form submission record from a csv or xml file
{
    reference: 1,
    discount: 5,
    name: 'John Doe',
    phoneNumber: 123456789,
    startAmount: 10,
    subscription: 'Premium 1',
    totalAmount: 5,
},
```

#### Validating the file

The validation is done on:
- The `reference` field should be unique, so if 3 records have the same id, then all these 3 records don't have a unique reference field
- The `startAmount` can not be negative
- The `discount` can not be negative or a percentage higher than 0.5
- The `totalAmount` field can not be negative initially, calculated to a negative value or initial value and calculated value are not the same.
    - If discount is a percentage (0.5 or lower) then check by using a percentage calculation.
    - If discount is a integer then check by subtracting

After validation a new array is returned with all the records details and the outcome of the validation.
The validated object is:
```js
// A validated record containing extra information about the validated fields
{
    isUniqueReference: 'Reference 1 is not unique',
    isValidStartAmount: true,
    isValidDiscount: 'Discount of -5 can not be negative',
    isValidTotalAmount: true,
    record: {
            reference: 1,
            discount: 5,
            name: 'John Doe 1',
            phoneNumber: 123456789,
            startAmount: 10,
            subscription: 'Premium 1',
            totalAmount: 5,
        },
},
```