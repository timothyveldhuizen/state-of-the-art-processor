import React from 'react';

function RecordTable(props) {

    const recordTableItems = props.records.map(item => {
        console.log(item)
        return (
            <tr>
                <td>{item.isUniqueReference.toString()}</td>
                <td>{item.isValidTotalAmount.toString()}</td>
                <td>{item.record.reference}</td>
                <td>{item.record.name}</td>
                <td>{item.record.phoneNumber}</td>
                <td>{item.record.subscription}</td>
                <td>{item.record.startAmount}</td>
                <td>{item.record.discount}</td>
                <td>{item.record.totalAmount}</td>
            </tr>
        )
    })

    return (
        <>
        <p>Record list</p>
        <p>Number of records {props.records.length}</p>
        <table>
            {recordTableItems}
        </table>
        </>
    );
}

export default RecordTable;