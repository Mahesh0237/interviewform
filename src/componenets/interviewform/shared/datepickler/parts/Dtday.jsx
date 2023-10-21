import { Select } from '@mantine/core';
import React from 'react';

function Dtday({ currentDate, changeDate, calenderdays }) {
    return (
        <Select
            data={calenderdays}
            value={currentDate}
            onChange={changeDate}
            searchable
            placeholder='Day'
        />
    )
}

export default Dtday