import React, { useState } from 'react';
import { parseFile, validateRecords } from 'form-submission-processor';
import RecordTable from './RecordTable';

function FileUpload() {
    const [validatedRecords, setValidatedRecords] = useState([]);

    function handleFileUploadChange(e) {
        const file = e.target.files[0];
        console.log(e.target.files[0])
        // file.stream().getReader().read().then(readerObject => console.log('readerObject',readerObject));
        // file.arrayBuffer().then(buffer => console.log('buffer',buffer));
        file.text().then(text => {
            console.log('text', text)
            const parsedFile = parseFile(text, file.type)
            console.log('parsedFile', parsedFile)
            setValidatedRecords(validateRecords(parsedFile))
            console.log('validatedRecords', validatedRecords)

        });
    }

    return (
        <div>
            <label for="file-upload">Choose a file to process:</label>
            <input type="file"
                id="file-upload"
                name="file-upload"
                accept="text/csv, text/xml"
                onChange={handleFileUploadChange}
                />
            <RecordTable records={validatedRecords} />
        </div>
    );
}

export default FileUpload;