import { Select } from '@mantine/core';
import React from 'react';

function Dtmonth({ currentMonth, changeMonth, calenderMonths }) {
    return (
        <Select
            data={calenderMonths}
            value={currentMonth}
            onChange={changeMonth}
            searchable
            placeholder='Month'
        />
    )
}

export default Dtmonth