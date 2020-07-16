# State-of-the-art processor

This a state-of-the-art processor which validates form submission records.

## Customer statement record

A form submission record exists of:

| Field | Description |
| --- | --- |
|Reference |A numeric value|
|Name |Free text|
|Phone number |A number|
|Subscription type|Free text|
|Start Amount |The start amount in Euros|
|Discount |Either a percentage (%) or a number|
|Total Amount |The total amount in Euros|

## Data validation

- The field `Reference` should be unique
- The field `Total Amount` should be correct based on `Start Amount` and `Discount`
- After processing display a report with the result
-- If there are failed records, then display both the reference and name of each of the failed records.

## Challenge

The challenge is to handle xml and csv input files which contain records and validate them.
Also the input and validation logic should be separated as much as possible, so it is easy to use different (ui) frameworks for displaying it in the browser.

## How to install & start

Go to the correct app folder, e.g. `cd angular/app` and run `npm install` or to run go to the root directory and do `npm run start:angular`.

The apps contain a local NPM dependency `form-submission-processor` which points to the exact same folder with all the logic for processing the form submission records.

Note: Angular and React hot-reload the dependency in node_modules when making changes to the files in folder form-submission-processor.

Issue: Vue doesn't hot-reload the dependency in node_modules when making changes to the files in folder form-submission-processor. You have to mannualy do `yarn add file:../../form-submission-processor` to update the dependency.

## Implementation

tbd