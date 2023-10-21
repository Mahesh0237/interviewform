import React, { useState, useCallback } from "react";
import { SimpleGrid } from '@mantine/core';
import Dtday from './parts/Dtday';
import Dtmonth from "./parts/Dtmonth";
import Dtyear from "./parts/Dtyear";
import { useShallowEffect } from '@mantine/hooks';
import moment from 'moment'

export const getDaysInMonth = (month, year) => {
    let newyear = parseInt(year);
    let newmonth = parseInt(month);
    let dayscount = new Date(newyear, newmonth, 0).getDate();
    if (dayscount === 28) {
        const calenderDays = [...Array(28).keys()].map((i) => i + 1);
        return calenderDays;
    } else if (dayscount === 29) {
        const calenderDays = [...Array(29).keys()].map((i) => i + 1);
        return calenderDays;
    } else if (dayscount === 30) {
        const calenderDays = [...Array(30).keys()].map((i) => i + 1);
        return calenderDays;
    } else {
        const calenderDays = [...Array(31).keys()].map((i) => i + 1);
        return calenderDays;
    }
};
function Datepicklerwrapper(props) {
    let newdate3 = moment();
    let year3 = newdate3.format('YYYY');
    let month3 = newdate3.format('M');
    let getdaysinmonth = getDaysInMonth(month3, year3)

    const [currentYear, setCurrentYear] = useState('');
    const [currentMonth, setCurrentMonth] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [calenderDates, setCalenderDates] = useState(getdaysinmonth);

    const [daysList, setDaysList] = useState([]);
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

    //days calculate    
    function daysCalculate(dates) {
        const days = [];
        dates.map((date) => {
            let datedetails = {
                value: date.toString(),
                label: date.toString()
            }
            const found = days.some(el => el.value === date);
            if (!found) days.push(datedetails);
            return false;
        })
        setDaysList(days);
    }

    const changeDate = useCallback((value) => {
        setCurrentDate(value);
        onChangeHandler('day', value)
    }, [currentMonth, currentDate, currentYear])


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
        let countmonthdays;
        if (currentYear === '') {
            countmonthdays = getDaysInMonth(value, new Date().getFullYear());
        } else {
            countmonthdays = getDaysInMonth(value, currentYear);
        }
        setCalenderDates(countmonthdays);
        daysCalculate(countmonthdays)
        setCurrentMonth(value);
        let lastdayofmonth = countmonthdays.at(-1)
        if (lastdayofmonth !== currentDate) {
            setCurrentDate('1')
            onChangeHandler2('month', value, '1')
        } else {
            onChangeHandler('month', value)
        }
    }, [currentMonth, currentDate, currentYear])

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
        let currentdate = moment();
        let month = currentdate.format('M');
        let countmonthdays;
        if (currentMonth === '') {
            countmonthdays = getDaysInMonth(month, value);
        } else {
            countmonthdays = getDaysInMonth(currentMonth, value);
        }
        setCalenderDates(countmonthdays);
        daysCalculate(countmonthdays)
        setCurrentYear(value);
        onChangeHandler('year', value)

        let lastdayofmonth = countmonthdays.at(-1)
        if (lastdayofmonth !== currentDate) {
            setCurrentDate('1')
            onChangeHandler2('year', value, '1')
        } else {
            onChangeHandler('month', value)
        }
    }, [currentMonth, currentDate, currentYear])

    const onChangeHandler = useCallback((type, value) => {
        if (props.onDateChange) {
            let newcurrentYear;
            let newcurrentMonth;
            let newcurrentDate;
            if (type === 'year') {
                newcurrentYear = value;
                newcurrentMonth = currentMonth;
                newcurrentDate = currentDate;
            } else if (type === 'month') {
                newcurrentYear = currentYear;
                newcurrentMonth = value;
                newcurrentDate = currentDate;
            } else if (type === 'day') {
                newcurrentYear = currentYear;
                newcurrentMonth = currentMonth;
                newcurrentDate = value;
            }
            if (newcurrentDate !== '' && newcurrentMonth !== '' && newcurrentYear !== '') {
                let finaldate = new Date(`${newcurrentYear}-${newcurrentMonth}-${newcurrentDate}`)
                props.onDateChange(finaldate);
            } else {
                props.onDateChange(null);
            }
        }
    }, [currentMonth, currentDate, currentYear])

    const onChangeHandler2 = useCallback((type, value, day) => {
        if (props.onDateChange) {
            let newcurrentYear;
            let newcurrentMonth;
            let newcurrentDate;
            if (type === 'year') {
                newcurrentYear = value;
                newcurrentMonth = currentMonth;
                newcurrentDate = day;
            } else if (type === 'month') {
                newcurrentYear = currentYear;
                newcurrentMonth = value;
                newcurrentDate = day;
            } else if (type === 'day') {
                newcurrentYear = currentYear;
                newcurrentMonth = currentMonth;
                newcurrentDate = value;
            }
            if (newcurrentDate !== '' && newcurrentMonth !== '' && newcurrentYear !== '') {
                let finaldate = new Date(`${newcurrentYear}-${newcurrentMonth}-${newcurrentDate}`)
                props.onDateChange(finaldate);
            } else {
                props.onDateChange(null);
            }
        }
    }, [currentMonth, currentDate, currentYear])

    useShallowEffect(() => {
        setTimeout(() => {
            if (props.value !== null) {
                let newdate = moment(new Date(props.value));
                let year = newdate.format('YYYY');
                let month = newdate.format('M');
                let day = newdate.format('D');
                setCurrentYear(year.toString())
                setCurrentMonth(month.toString())
                setCurrentDate(day.toString())
                daysCalculate(calenderDates);
            } else {
                let newdate2 = moment();
                let year2 = newdate2.format('YYYY');
                let month2 = newdate2.format('M');
                let getdaysinmonth = getDaysInMonth(month2, year2)
                setCalenderDates(getdaysinmonth)
                setCurrentYear('')
                setCurrentMonth('')
                setCurrentDate('')
                daysCalculate(getdaysinmonth);
            }

            yearsCalculate(calenderYears);
            monthsCalculate(calenderMonths)
        }, 100);
    }, [props.value, calenderYears, calenderMonths])

    return (
        <SimpleGrid cols={3}>
            <Dtday
                currentDate={currentDate}
                changeDate={changeDate}
                calenderdays={daysList}
            />
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

export default Datepicklerwrapper