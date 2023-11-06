import React, { useEffect, useState } from 'react'
import { Button, Card, Grid, Group, LoadingOverlay, Select, Text } from '@mantine/core'
import { City, Country, State } from 'country-state-city'
import { notifications } from '@mantine/notifications'
import { getDatabase, onValue, ref, set } from 'firebase/database'
import app from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Addressdetails() {
    // const newPhonenum = useSelector((state) => state.userAuthReducer)
    const db = getDatabase(app)
    const navigate = useNavigate()
    const [isLoadingoverlayEffect, setIsLoadiingoverLayEffect] = useState(false)

    const [allCountries, setAllCountries] = useState([])
    const [allstates, setAllStates] = useState([])
    const [allcities, setAllcities] = useState([])


    const getAllCountries1 = () => {
        const countriesData = Country.getAllCountries();
        const formattedCountries1 = countriesData.map(country => ({
            value: country.name,
            label: `${country.name} (${country.isoCode})`,
            isoCode: country.isoCode,
        }))
        setAllCountries(formattedCountries1);
    }

    const getAllStates1 = (value) => {
        const statesData = State.getAllStates();
        const filteredStates = statesData.filter((state) => state.countryCode === value);
        const formattedStates1 = filteredStates.map(state => ({
            value: state.name,
            label: state.name,
            isoCode: state.isoCode,
        }))
        setAllStates(formattedStates1);
    }

    const getAllCities = (countryisocode, stateisocode) => {
        const citiesData = City.getCitiesOfState(countryisocode, stateisocode)
        const formattedCities = citiesData.map(city => ({
            value: city.name,
            label: city.name,
        }))
        setAllcities(formattedCities);
    }

    const [country, setCountry] = useState(null)
    const [state, setState] = useState(null)
    const [city, setCity] = useState(null)
    const [countryError, setCoutryError] = useState('')
    const [countryIsoCode, setCountryIsoCode] = useState(null)
    const updateCountry = (value) => {
        setCountry(value)
        setCoutryError('')
        const selectedOption = allCountries.find((option) => option.value === value);
        setCountryIsoCode(selectedOption.isoCode)
        getAllStates1(selectedOption.isoCode)
        setState(null)
        setCity(null)
    }

    const [stateError, setStateError] = useState('')
    const updateState = (value) => {
        setState(value)
        setStateError('')
        const selectedOption = allstates.find((option) => option.value === value)
        getAllCities(countryIsoCode, selectedOption.isoCode)
        setCity(null)
    }

    const [cityError, setCityError] = useState('')
    const updateCity = (value) => {
        setCity(value)
        setCityError('')
    }


    const [addressDetails, setaddressDetails] = useState(null)
    function getAddressdetails() {
        let newPhonenum = sessionStorage.getItem('usermobilenum')
        let updatedPhonenum = JSON.parse(newPhonenum)
        const starCountRef = ref(db, `interviewcandidates/${updatedPhonenum}/addressdetails`)
        onValue(starCountRef, (snapshot) => {
            const user_data = snapshot.val()
            setaddressDetails(user_data)
        })
    }

    useEffect(() => {
        getAllCountries1()
        getAddressdetails()
    }, [])

    useEffect(() => {
        if (addressDetails) {
            setCountry(addressDetails.country)
            if (addressDetails.country) {
                const selectedOption = allCountries.find((option) => option.value === addressDetails.country);
                console.log('selectedOption', selectedOption)
                // setCountryIsoCode(selectedOption.isoCode)
                // getAllStates1(selectedOption.isoCode)
            }
            setState(addressDetails.state)
            if (addressDetails.state) {
                const selectedOption = allstates.find((option) => option.value === addressDetails.state)
                // getAllCities(countryIsoCode, selectedOption.isoCode)
            }
            setCity(addressDetails.city)
        }
    }, [addressDetails])
    let newPhonenum
    const createaddress = () => {
        setIsLoadiingoverLayEffect(true)
        if (country === null) {
            setCoutryError('select the country')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        if (state === null) {
            setStateError('select the state')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        if (city === null) {
            setCityError('select the city')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        newPhonenum = JSON.parse(sessionStorage.getItem('usermobilenum'))
        set(ref(db, `interviewcandidates/${newPhonenum}/addressdetails`), {
            country,
            state,
            city
        })
            .then((res) => {
                setIsLoadiingoverLayEffect(false)
                notifications.show({
                    title: 'Success',
                    message: 'Address Details Updated!',
                    color: 'green',
                    zIndex: 9999999,
                })
                navigate('/educationdetails')
            })
            .catch((error) => {
                setIsLoadiingoverLayEffect(false)
                console.log('address details', error)
                notifications.show({
                    title: 'Failed',
                    message: 'Error!',
                    color: 'red',
                    zIndex: 9999999,
                })
            })
    }

    return (
        <section className='addressdetails'>
            <Card withBorder >
                <Card.Section inheritPadding py={10} >
                    <Text weight={600} size={20} color='rgb(255, 0, 0)'>Address Details:</Text>
                </Card.Section>
                <Card.Section inheritPadding py={20} withBorder>
                    <Grid>
                        <Grid.Col md={6}>
                            <Select
                                label={<Text weight={600} display="inline-block">Country</Text>}
                                placeholder="select country"
                                withinPortal
                                data={allCountries}
                                searchable
                                withAsterisk
                                value={country}
                                error={countryError}
                                onChange={updateCountry}
                                nothingFound={<Text color='red' weight={600} size={14}>Nothing Found</Text>}
                            />
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <Select
                                label={<Text weight={600} display="inline-block">State</Text>}
                                placeholder="select state"
                                withAsterisk
                                searchable
                                nothingFound={<Text color='red' weight={600}>Nothing Found</Text>}
                                data={allstates}
                                value={state}
                                error={stateError}
                                onChange={updateState}
                            />
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <Select
                                label={<Text weight={600} display="inline-block">City</Text>}
                                placeholder="select city"
                                withAsterisk
                                searchable
                                nothingFound={<Text color='red' weight={600}>Nothing Found</Text>}
                                data={allcities}
                                value={city}
                                error={cityError}
                                onChange={updateCity}
                            />
                        </Grid.Col>
                    </Grid>
                </Card.Section>
                <Card.Section inheritPadding pt={10}>
                    <Group position="apart">
                        <Button variant="default" component='a' href='/' >Back</Button>
                        <Button color='dark' onClick={createaddress}>Next</Button>
                    </Group>
                </Card.Section>
                <LoadingOverlay visible={isLoadingoverlayEffect} />
            </Card>
        </section>
    )
}

export default Addressdetails