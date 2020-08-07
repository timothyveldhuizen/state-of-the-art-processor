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

TODO
- Define ui components
    - Main page: App
    - Ui component for uploading file: FileUpload
    - Ui component for displaying results: RecordTable
- Define what or how to display a user friendly / informative table
    - Transform boolean value to a nice message
    - Add table headers
    - Add filtering on the table (as it displays all the validated records, so valid and invalid ones)
    - Preset the filtering to only show invalid records?