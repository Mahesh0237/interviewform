import { Select } from '@mantine/core';
import React from 'react';

function Dtyear({ currentYear, changeYear, calenderYears }) {
    return (
        <Select
            data={calenderYears}
            value={currentYear}
            onChange={changeYear}
            searchable
            placeholder='Year'
        />
    )
}

export default Dtyear