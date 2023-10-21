import React, { useState, useCallback } from "react";
import { SimpleGrid } from '@mantine/core';
import Dtmonth from "./parts/Dtmonth";
import Dtyear from "./parts/Dtyear";
import { useShallowEffect } from '@mantine/hooks';
import moment from 'moment'


function Monthyearpicklerwrapper(props) {
    let newdate3 = moment();
    let year3 = newdate3.format('YYYY');
    let month3 = newdate3.format('M');

    const [currentYear, setCurrentYear] = useState('');
    const [currentMonth, setCurrentMonth] = useState('');

    const [monthList, setMonthList] = useState([]);
    const [yearList, setYearList] = useState([]);

    let calenderMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let calenderYears = [...Array(200).keys()].map((i) => i + props.currentYear - props.oldYears);

    //months   
    function monthsCalculate(calMonths) {
        const months = [];
        calMonths.map((month, index) => {
            let newvalue = index + 1;
            let datedetails = {
                value: newvalue.toString(),
                label: month
            }
            const found = months.some(el => el.label === month);
            if (!found) months.push(datedetails);
            return false;
        })
        setMonthList(months);
    }
    const changeMonth = useCallback((value) => {
        setCurrentMonth(value);
        onChangeHandler('month', value)
    }, [currentMonth, currentYear])

    //years
    function yearsCalculate(calyears) {
        const years = [];
        calyears.map((year) => {
            let yeardetails = {
                value: year.toString(),
                label: year.toString()
            }
            const found = years.some(el => el.value === year);
            if (!found) years.push(yeardetails);
            return false;
        })
        setYearList(years);
    }
    const changeYear = useCallback((value) => {
        setCurrentYear(value);
        onChangeHandler('year', value)
    }, [currentMonth, currentYear])

    const onChangeHandler = useCallback((type, value) => {
        if (props.onDateChange) {
            let newcurrentYear;
            let newcurrentMonth;
            let newcurrentDate;
            if (type === 'year') {
                newcurrentYear = value;
                if(currentMonth === ''){
                    newcurrentMonth = 'January';
                }else{                    
                    newcurrentMonth = currentMonth;
                }
                newcurrentDate = '1';
            } else if (type === 'month') {
                newcurrentYear = currentYear;
                newcurrentMonth = value;
                newcurrentDate = '1';
            }

            if (newcurrentDate !== '' && newcurrentMonth !== '' && newcurrentYear !== '') {
                let finaldate = new Date(`${newcurrentYear}-${newcurrentMonth}-${newcurrentDate}`)
                props.onDateChange(finaldate);
            } else {
                props.onDateChange(null);
            }
        }
    }, [currentMonth, currentYear])

    useShallowEffect(() => {
        setTimeout(() => {
            if (props.value !== null) {
                let newdate = moment(new Date(props.value));
                let year = newdate.format('YYYY');
                let month = newdate.format('M');
                setCurrentYear(year.toString())
                setCurrentMonth(month.toString())
            } else {
                setCurrentYear('')
                setCurrentMonth('')
            }

            yearsCalculate(calenderYears);
            monthsCalculate(calenderMonths)
        }, 100);
    }, [props.value, calenderYears, calenderMonths])

    return (
        <SimpleGrid cols={2}>          
            <Dtmonth
                currentMonth={currentMonth}
                changeMonth={changeMonth}
                calenderMonths={monthList}
            />
            <Dtyear
                currentYear={currentYear}
                changeYear={changeYear}
                calenderYears={yearList}
            />
        </SimpleGrid>
    );
}

export default Monthyearpicklerwrapper