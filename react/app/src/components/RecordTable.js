import React, { useState } from 'react';
import './RecordTable.css';
import ErrorPopover from './ErrorPopover';

function RecordTable(props) {
    const [filteredRecords, setFilteredRecords] = useState(props.records);
    const [activeFilter, setActiveFilter] = useState('all');

    const recordTableItems = filteredRecords.map(item => {
        const isUnique = item.isUniqueReference === true ? '' : <ErrorPopover message={item.isUniqueReference} />;
        const isValidDiscount = item.isValidDiscount === true ? '' : <ErrorPopover message={item.isValidDiscount} />;
        const isValidStartAmount = item.isValidStartAmount === true ? '' : <ErrorPopover message={item.isValidStartAmount} />;
        const isValidTotalAmount = item.isValidTotalAmount === true ? '' : <ErrorPopover message={item.isValidTotalAmount} />;

        return (
            <tr>
                <td>{item.record.reference} {isUnique} </td>
                <td>{item.record.name} </td>
                <td>{item.record.phoneNumber}</td>
                <td>{item.record.subscription}</td>
                <td>€ {item.record.startAmount} {isValidStartAmount} </td>
                <td>{Number.isInteger(item.record.discount) ? '€ ' + item.record.discount : item.record.discount * 100 + '%'} {isValidDiscount}</td>
                <td>€ {item.record.totalAmount} {isValidTotalAmount} </td>
            </tr>
        )
    })

    function handleFilterRecords(e) {
        const filter = e.target.value;

        if (filter === 'all') {
            setActiveFilter('all');
            setFilteredRecords(props.records);
        }
        if (filter === 'valid') {
            setActiveFilter('valid');
            setFilteredRecords(props.records.filter(item => item.isUniqueReference === true && item.isValidTotalAmount === true))
        }
        if (filter === 'invalid') {
            setActiveFilter('invalid');
            setFilteredRecords(props.records.filter(item => item.isUniqueReference !== true || item.isValidTotalAmount !== true))
        }
    }

    return (
        <>
            <h1>Record list</h1>

            <table className="record-table">
                <thead>
                    <tr>
                        <th colSpan="8">
                            <div className="table-filter">
                                <button onClick={handleFilterRecords} className={activeFilter === 'all' ? 'active-filter': ''} value="all">All records</button>
                                <button onClick={handleFilterRecords} className={activeFilter === 'valid' ? 'active-filter': ''} value="valid">Valid records</button>
                                <button onClick={handleFilterRecords} className={activeFilter === 'invalid' ? 'active-filter': ''} value="invalid">Invalid records</button>
                            </div>
                            <p>Number of records {filteredRecords.length}</p>
                        </th>
                    </tr>
                    <tr>
                        <th>Reference</th>
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Subscription</th>
                        <th>Amount</th>
                        <th>Discount</th>
                        <th>Total amount</th>
                    </tr>
                </thead>
                <tbody>
                    {recordTableItems}
                </tbody>
            </table>
        </>
    );
}

export default RecordTable;