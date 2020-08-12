import React, { useState } from 'react';

function RecordTable(props) {
    const [filteredRecords, setFilteredRecords] = useState(props.records);

    // function RecordTableHeaders() {
    //     const [firstItem] = props.records;
    //     console.log('firstItem', firstItem)
    //     const itemHeaders = Object.keys(firstItem).map(header => {
    //         if(header !== 'record') {
    //            return <th>{header}</th>
    //         }
    //         return ''
    //     });
    //     const recordHeaders = Object.keys(firstItem.record).map(header => <th>{header}</th>)
    //     const headers = itemHeaders.concat(recordHeaders)
    //     return (
    //         <>
    //         {headers}
    //         </>
    //     )
    // }

    const recordTableItems = filteredRecords.map(item => {
        console.log(item)
        let validationMessage = '';
        if(!item.isUniqueReference && !item.isValidTotalAmount) {
            validationMessage = `Reference ${item.record.reference} is not unique and total amount of ${item.record.totalAmount} is not correct`;
        }
        if(!item.isUniqueReference && item.isValidTotalAmount) {
            validationMessage = `Reference ${item.record.reference} is not unique`;
        }
        if(item.isUniqueReference && !item.isValidTotalAmount) {
            validationMessage = `Total amount of ${item.record.totalAmount} is not correct`;
        }

        return (
            <tr>
                <td>{validationMessage}</td>
                <td>{item.record.reference}</td>
                <td>{item.record.name}</td>
                <td>{item.record.phoneNumber}</td>
                <td>{item.record.subscription}</td>
                <td>€ {item.record.startAmount}</td>
                <td>- {Number.isInteger(item.record.discount) ? '€ ' + item.record.discount : item.record.discount * 100 + '%'}</td>
                <td>€ {item.record.totalAmount}</td>
            </tr>
        )
    })

    function handleFilterRecords(e) {
        const filter = e.target.value;
        console.log('filter', filter)
        if(filter === 'all') {
            setFilteredRecords(props.records);
        }
        if(filter === 'valid') {
            setFilteredRecords(props.records.filter(item => item.isUniqueReference === true && item.isValidTotalAmount === true))
        }
        if(filter === 'invalid') {
            setFilteredRecords(props.records.filter(item => item.isUniqueReference === false || item.isValidTotalAmount === false))
        }
        console.log('filteredRecords', filteredRecords)
    }

    return (
        <>
        <p>Record list</p>
        <p>Number of records {filteredRecords.length}</p>
        <button onClick={handleFilterRecords} value="all">All records</button>
        <button onClick={handleFilterRecords} value="valid">Valid records</button>
        <button onClick={handleFilterRecords} value="invalid">Invalid records</button>
        <table>
            {/* <RecordTableHeaders /> */}
            <tr>
                <th>Validation</th>
                <th>Reference</th>
                <th>Name</th>
                <th>Phone number</th>
                <th>Subscription</th>
                <th>Amount</th>
                <th>Discount</th>
                <th>Total amount</th>
            </tr>
            {recordTableItems}
        </table>
        </>
    );
}

export default RecordTable;