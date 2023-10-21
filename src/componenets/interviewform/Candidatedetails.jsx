import { Button, Card, Divider, Grid, Group, LoadingOverlay, MultiSelect, Select, Text, TextInput } from '@mantine/core'
import { IconAsterisk } from '@tabler/icons-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, set } from 'firebase/database';
import app from '../../firebase';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { userMobile } from '../redux/actions';
function Candidatedetails() {

    // const newPhonenum = useSelector((state) => state.userAuthReducer)
    const db = getDatabase(app)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoadingoverlayEffect, setIsLoadiingoverLayEffect] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const updateFirstName = (e) => {
        setFirstName(e.currentTarget.value)
        if (!/^[A-Za-z\s]+$/.test(e.currentTarget.value)) {
            setFirstNameError('it should contain only letters (no numbers or special characters)')
        } else {
            setFirstNameError('')
        }
    }
    const [lastName, setLastName] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const updateLastName = (e) => {
        setLastName(e.currentTarget.value)
        if (!/^[A-Za-z\s]+$/.test(e.currentTarget.value)) {
            setLastNameError('it should contain only letters (no numbers or special characters)')
        } else {
            setLastNameError('')
        }
    }
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const updateEmail = (e) => {
        setEmail(e.currentTarget.value)
        if (validator.isEmail(e.currentTarget.value) === false) {
            setEmailError('Enter the valid email address')
        } else {
            setEmailError('')
        }
    }
    const [phoneCode, setPhoneCode] = useState('India')
    const [phoneCodeError, setPhoneCodeError] = useState('')
    const updatePhoneCode = (value) => {
        setPhoneCode(value)
        setPhoneCodeError('')
    }
    const [phoneNumber, setPhonNumber] = useState('')
    const [phoneNumberError, setPhonNumberError] = useState('')
    const updatePhoneNumber = (e) => {
        setPhonNumber(e.currentTarget.value)
        if (!/^[0-9]+$/.test(e.currentTarget.value)) {
            setPhonNumberError('Phone number should only contain numeric characters (0-9), no spaces or special characters')
        } else if (e.currentTarget.value.length !== 10) {
            setPhonNumberError('Phone number should have exactly 10 numeric characters')
        } else {
            setPhonNumberError('')
        }
    }
    const [gender, setGender] = useState(null)
    const [genderError, setGenderError] = useState('')
    const updateGender = (value) => {
        setGender(value)
        setGenderError('')
    }
    const [marritalStatus, setMarritalStatus] = useState(null)
    const [marritalStatusError, setMarritalStatusError] = useState('')
    const updateMarritalStatus = (value) => {
        setMarritalStatus(value)
        setMarritalStatusError('')
    }
    const [qualification, setQualification] = useState(null)
    const [qualificationError, setQualificationError] = useState('')
    const updateQualification = (value) => {
        setQualification(value)
        setQualificationError('')
        setCourse('')
        setSpecialistion('')
    }
    const [course, setCourse] = useState('')
    const [courseError, setCourseError] = useState('')
    const updateCourse = (e) => {
        setCourse(e.currentTarget.value)
        if (!/^[A-Za-z\s]+$/.test(e.currentTarget.value)) {
            setCourseError('it should contain only letters (no numbers or special characters)')
        } else {
            setCourseError('')
        }
    }
    const [specialisation, setSpecialistion] = useState('')
    const [specialisationError, setSpecialistionError] = useState('')
    const updateSpecialisation = (e) => {
        setSpecialistion(e.currentTarget.value)
        if (!/^[A-Za-z\s]+$/.test(e.currentTarget.value)) {
            setSpecialistionError('it should contain only letters (no numbers or special characters)')
        } else {
            setSpecialistionError('')
        }
    }
    const [profession, setProfession] = useState(null)
    const [professionError, setProfessionError] = useState('')
    const updateProfession = (value) => {
        setProfession(value)
        setProfessionError('')
        setProfessionsubtype(null)
        setExperience('')
        setLatestDepartment('')
        setLatestDesignation('')
        setLatestIndustry('')
        setCurrentCtc(null)
        setCurrentCtcSalary('')
        setExpectedCtc(null)
        setExpectedCtcSalary('')
    }
    const [professionsubtype, setProfessionsubtype] = useState(null)
    const [professionsubtypeError, setProfessionsubtypeError] = useState('')
    const updateProfessionsubtype = (value) => {
        setProfessionsubtype(value)
        setProfessionsubtypeError('')
    }
    const [experience, setExperience] = useState('')
    const [experienceError, setExperienceError] = useState('')
    const updateExperince = (e) => {
        setExperience(e.currentTarget.value)
        if (!/^[0-50]+$/.test(e.currentTarget.value)) {
            setExperienceError('it should only contain numeric characters , no spaces or special characters')
        } else {
            setExperienceError('');
        }
    }
    const [latestDepartment, setLatestDepartment] = useState('')
    const [lastestDepartmentError, setLatestDepartmentError] = useState('')
    const updateLatestDepartment = (e) => {
        setLatestDepartment(e.currentTarget.value)
        if (!/^[A-Za-z\s]+$/.test(e.currentTarget.value)) {
            setLatestDepartmentError('it should contain only letters (no numbers or special characters)')
        } else {
            setLatestDepartmentError('')
        }
    }
    const [latestDesignation, setLatestDesignation] = useState('')
    const [latestDesignationError, setLatestDesignationError] = useState('')
    const updateLatestDesignation = (e) => {
        setLatestDesignation(e.currentTarget.value)
        if (!/^[A-Za-z\s]+$/.test(e.currentTarget.value)) {
            setLatestDesignationError('it should contain only letters (no numbers or special characters)')
        } else {
            setLatestDesignationError('')
        }
    }
    const [latestIndustry, setLatestIndustry] = useState('')
    const [latestIndustryError, setLatestIndustryError] = useState('')
    const updateLatestIndustry = (e) => {
        setLatestIndustry(e.currentTarget.value)
        if (!/^[A-Za-z\s]+$/.test(e.currentTarget.value)) {
            setLatestIndustryError('it should contain only letters (no numbers or special characters)')
        } else {
            setLatestIndustryError('')
        }
    }
    const [currentCtc, setCurrentCtc] = useState(null)
    const [currentCtcError, setCurrentCtcError] = useState('')
    const updateCurrentCtc = (value) => {
        setCurrentCtc(value)
        setCurrentCtcError('')
    }
    const [currentCtcSalary, setCurrentCtcSalary] = useState('')
    const [currentCtcSalaryError, setCurrentCtcSalaryError] = useState('')
    const updateCurrentCtcSalary = (e) => {
        setCurrentCtcSalary(e.currentTarget.value)
        if (!/^[0-50]+$/.test(e.currentTarget.value)) {
            setCurrentCtcSalaryError('it should only contain numeric characters , no spaces or special characters')
        } else {
            setCurrentCtcSalaryError('');
        }
    }
    const [expectedCtc, setExpectedCtc] = useState(null)
    const [expectedCtcError, setExpectedCtcError] = useState('')
    const updateExpectedCtc = (value) => {
        setExpectedCtc(value)
        setExpectedCtcError('')
    }
    const [expectedCtcSalary, setExpectedCtcSalary] = useState('')
    const [expectedCtcSalaryError, setExpectedCtcSalaryError] = useState('')
    const updateExpectedCtcSalary = (e) => {
        setExpectedCtcSalary(e.currentTarget.value)
        if (!/^[0-50]+$/.test(e.currentTarget.value)) {
            setExpectedCtcSalaryError('it should only contain numeric characters , no spaces or special characters')
        } else {
            setExpectedCtcSalaryError('');
        }
    }
    const [languages, setLanguages] = useState([])
    const [languagesError, setLanguagesError] = useState('')
    const updateLanguages = (value) => {
        setLanguages(value)
        setLanguagesError('')
    }
    const [candidateDetails, setCandidateDetails] = useState(null)
    function getCandidatedetails() {
        let newPhonenum = sessionStorage.getItem('usermobilenum')
        let updatedPhonenum = JSON.parse(newPhonenum)
        const starCountRef = ref(db, `interviewcandidates/${updatedPhonenum}/candidatedetails`)
        onValue(starCountRef, (snapshot) => {
            const user_data = snapshot.val()
            setCandidateDetails(user_data)
        })
    }

    const [phonecodes, setPhonecodes] = useState([])

    const getCountryCodes = () => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                const formattedCountrycodes = response.data.map(country => {
                    return {
                        value: country.name.common,
                        label: `${country?.idd?.root || ''}${country.idd.suffixes?.[0]}(${country.name.common})`,
                    }
                })
                formattedCountrycodes.sort((a, b) => a.value.localeCompare(b.value))
                setPhonecodes(formattedCountrycodes);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            })
    }

    useEffect(() => {
        getCandidatedetails()
        getCountryCodes()
    }, [])

    useEffect(() => {
        if (candidateDetails) {
            setFirstName(candidateDetails.firstName)
            setLastName(candidateDetails.lastName)
            setEmail(candidateDetails.email)
            setPhoneCode(candidateDetails.phoneCode)
            setPhonNumber(candidateDetails.phoneNumber)
            setGender(candidateDetails.gender)
            setMarritalStatus(candidateDetails.marritalStatus)
            setQualification(candidateDetails.qualification)
            setCourse(candidateDetails.course)
            setSpecialistion(candidateDetails.specialisation)
            setProfession(candidateDetails.profession)
            if (candidateDetails.professionsubtype) {
                setProfessionsubtype(candidateDetails.professionsubtype)
            } else {
                setProfessionsubtype(null)
            }
            setExperience(candidateDetails.experience)
            setLatestDepartment(candidateDetails.latestDepartment)
            setLatestDesignation(candidateDetails.latestDesignation)
            setLatestIndustry(candidateDetails.latestIndustry)
            if (candidateDetails.currentCtc) {
                setCurrentCtc(candidateDetails.currentCtc)
            } else {
                setCurrentCtc(null)
            }
            setCurrentCtcSalary(candidateDetails.currentCtcSalary)
            if (candidateDetails.expectedCtc) {
                setExpectedCtc(candidateDetails.expectedCtc)
            } else {
                setExpectedCtc(null)
            }
            setExpectedCtcSalary(candidateDetails.expectedCtcSalary)
            setLanguages(candidateDetails.languages)
        }
    }, [candidateDetails])

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (
                firstName ||
                lastName ||
                email ||
                phoneCode !== 'India' ||
                phoneNumber ||
                gender ||
                marritalStatus ||
                qualification ||
                profession ||
                professionsubtype ||
                experience ||
                latestIndustry ||
                latestDepartment ||
                latestDesignation ||
                currentCtc ||
                currentCtcSalary ||
                expectedCtc ||
                expectedCtcSalary ||
                languages
            ) {
                // Display a confirmation message to the user
                e.preventDefault()
                e.returnValue = '';
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [firstName, lastName, email, phoneCode, phoneNumber, gender, marritalStatus, qualification, profession, professionsubtype, experience, latestDepartment, latestDesignation, latestIndustry, currentCtc, currentCtcSalary, expectedCtc, expectedCtcSalary, languages])

    const createdcnd = () => {
        setIsLoadiingoverLayEffect(true)
        if (firstName === '') {
            setFirstNameError('enter the first name')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        if (lastName === '') {
            setLastNameError('enter the last name')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        if (email === '') {
            setEmailError('enter the email')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        if (phoneCode === null) {
            setPhoneCodeError('select the phone code')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        if (phoneNumber === '') {
            setPhonNumberError('enter the phone number')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        if (gender === null) {
            setGenderError('select the gender')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        if (marritalStatus === null) {
            setMarritalStatusError('select the option')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        if (qualification === null) {
            setQualificationError('select the qualification')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        if ((qualification === "Doctrate/PhD") || (qualification === 'Masters/post graduation') || (qualification === 'Graduation/Diploma')) {
            if (course === '') {
                setCourseError('select the course')
                setIsLoadiingoverLayEffect(false)
                return false
            }
            if (specialisation === '') {
                setSpecialistionError('select the specialistaion')
                setIsLoadiingoverLayEffect(false)
                return false
            }
        }
        if (profession === null) {
            setIsLoadiingoverLayEffect(false)
            setProfessionError('select the profession')
            return false
        }
        if (profession === 'Experienced') {
            if (professionsubtype === null) {
                setIsLoadiingoverLayEffect(false)
                setProfessionsubtypeError('select the option')
                return false
            }
            if (experience === '') {
                setExperienceError('select the experince')
                setIsLoadiingoverLayEffect(false)
                return false
            }
            if (latestDepartment === '') {
                setIsLoadiingoverLayEffect(false)
                setLatestDepartmentError('select the option')
                return false
            }
            if (latestDesignation === '') {
                setIsLoadiingoverLayEffect(false)
                setLatestDesignationError('select the option')
                return false
            }
            if (latestIndustry === '') {
                setIsLoadiingoverLayEffect(false)
                setLatestIndustryError('select the option')
                return false
            }
            if (currentCtc === null) {
                setCurrentCtcError('select the currency')
                setIsLoadiingoverLayEffect(false)
                return false
            }
            if (currentCtcSalary === '') {
                setCurrentCtcSalaryError('enter the current salary')
                setIsLoadiingoverLayEffect(false)
                return false
            }
            if (expectedCtc === null) {
                setExpectedCtcError('select the currency')
                setIsLoadiingoverLayEffect(false)
                return false
            }
            if (expectedCtcSalary === '') {
                setExpectedCtcSalaryError('enter the current salary')
                setIsLoadiingoverLayEffect(false)
                return false
            }
        }
        if (languages.length === 0) {
            setLanguagesError('select the languages')
            setIsLoadiingoverLayEffect(false)
            return false
        }
        sessionStorage.setItem('usermobilenum', JSON.stringify(phoneNumber))
        set(ref(db, `interviewcandidates/${phoneNumber}/candidatedetails`), {
            firstName,
            lastName,
            email,
            phoneCode,
            phoneNumber,
            gender,
            marritalStatus,
            qualification,
            course,
            specialisation,
            profession,
            professionsubtype,
            experience,
            latestDepartment,
            latestDesignation,
            latestIndustry,
            currentCtc,
            currentCtcSalary,
            expectedCtc,
            expectedCtcSalary,
            languages
        })
            .then((res) => {
                console.log('candidate details posted successfully')
                setIsLoadiingoverLayEffect(false)
                navigate('/address')
                notifications.show({
                    title: 'Success',
                    message: 'Successfully stored data!',
                    color: 'green',
                    zIndex: 9999999,
                })
                dispatch(userMobile(phoneNumber))
            })
            .catch((error) => {
                setIsLoadiingoverLayEffect(false)
                console.log('candidate details', error)
                notifications.show({
                    title: 'Failed',
                    message: 'Error!',
                    color: 'red',
                    zIndex: 9999999,
                })
            })

    }

    return (
        <>
            <Card withBorder mt={20}>
                <Card.Section inheritPadding py={10}>
                    <Text weight={600} size={20} color='rgb(255, 0, 0)'>Personal Details:</Text>
                </Card.Section>
                <Card.Section inheritPadding py={20} withBorder>
                    <Grid>
                        <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                            <TextInput
                                placeholder='enter first name'
                                label={<Text weight={600} display="inline-block">First Name</Text>}
                                withAsterisk
                                value={firstName}
                                error={firstNameError}
                                onChange={updateFirstName}
                            />
                        </Grid.Col>
                        <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                            <TextInput
                                placeholder='enter last name'
                                label={<Text weight={600} display="inline-block">Last Name</Text>}
                                withAsterisk
                                value={lastName}
                                error={lastNameError}
                                onChange={updateLastName}
                            />
                        </Grid.Col>
                        <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                            <TextInput
                                placeholder='eg: test@gmail.com'
                                label={<Text weight={600} display="inline-block">Email</Text>}
                                withAsterisk
                                value={email}
                                error={emailError}
                                onChange={updateEmail}
                            />
                        </Grid.Col>
                        <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                            <Text weight={600} size={13} mb={5}>Mobile Number <IconAsterisk size={7} color='red' /></Text>
                            <Grid>
                                <Grid.Col span={5}>
                                    <Select
                                        placeholder="+91"
                                        searchable
                                        data={phonecodes}
                                        value={phoneCode}
                                        error={phoneCodeError}
                                        onChange={updatePhoneCode}
                                    />
                                </Grid.Col>
                                <Grid.Col span={7}>
                                    <TextInput
                                        placeholder='xxxxxxxxxx'
                                        value={phoneNumber}
                                        error={phoneNumberError}
                                        onChange={updatePhoneNumber}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                        <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                            <Select
                                label={<Text weight={600} display="inline-block">Gender</Text>}
                                placeholder="select Gender"
                                withAsterisk
                                searchable
                                data={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                    { value: 'others', label: 'others' },
                                ]}
                                value={gender}
                                error={genderError}
                                onChange={updateGender}
                            />
                        </Grid.Col>
                        <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                            <Select
                                label={<Text weight={600} display="inline-block">Marrital Status</Text>}
                                placeholder="select option"
                                withAsterisk
                                searchable
                                data={[
                                    { value: 'Single', label: 'Single' },
                                    { value: 'Married', label: 'Married' },
                                    { value: 'Windowed', label: 'Windowed' },
                                    { value: 'Separated', label: 'Separated' },
                                    { value: 'Divorced', label: 'Divorced' },
                                ]}
                                value={marritalStatus}
                                error={marritalStatusError}
                                onChange={updateMarritalStatus}
                            />
                        </Grid.Col>
                        <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                            <Select
                                label={<Text weight={600} display="inline-block">Highest Qualification</Text>}
                                placeholder="select qualification"
                                withAsterisk
                                searchable
                                data={[
                                    { value: 'Doctrate/PhD', label: 'Doctrate/PhD' },
                                    { value: 'Masters/post graduation', label: 'Masters/post graduation' },
                                    { value: 'Graduation/Diploma', label: 'Graduation/Diploma' },
                                    { value: '12th', label: '12th' },
                                    { value: '10th', label: '10th' },
                                ]}
                                value={qualification}
                                error={qualificationError}
                                onChange={updateQualification}
                            />
                        </Grid.Col>
                        {
                            ((qualification === "Doctrate/PhD") || (qualification === 'Masters/post graduation') || (qualification === 'Graduation/Diploma')) &&
                            <>
                                <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">Course</Text>}
                                        placeholder="select course"
                                        withAsterisk
                                        value={course}
                                        error={courseError}
                                        onChange={updateCourse}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">Specialization</Text>}
                                        placeholder="select one"
                                        withAsterisk
                                        value={specialisation}
                                        error={specialisationError}
                                        onChange={updateSpecialisation}
                                    />
                                </Grid.Col>
                            </>
                        }
                        <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                            <Select
                                label={<Text weight={600} display="inline-block">Profeesion</Text>}
                                placeholder="select option"
                                withAsterisk
                                data={[
                                    { value: 'Fresher', label: 'Fresher' },
                                    { value: 'Experienced', label: 'Experienced' },
                                ]}
                                value={profession}
                                error={professionError}
                                onChange={updateProfession}
                            />
                        </Grid.Col>
                        {
                            profession === 'Experienced' &&
                            <>
                                <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                                    <Select
                                        label={<Text weight={600} display="inline-block">Profeesion Sub Type</Text>}
                                        placeholder="select option"
                                        withAsterisk
                                        data={[
                                            { value: 'Presently Working', label: 'Presently Working' },
                                            { value: 'Unemployed/subticle', label: 'Unemployed/subticle' },
                                        ]}
                                        value={professionsubtype}
                                        error={professionsubtypeError}
                                        onChange={updateProfessionsubtype}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">Total Years Experience</Text>}
                                        placeholder="enter your experience"
                                        withAsterisk
                                        value={experience}
                                        error={experienceError}
                                        onChange={updateExperince}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">Latest Department</Text>}
                                        placeholder="enter your department"
                                        withAsterisk
                                        value={latestDepartment}
                                        error={lastestDepartmentError}
                                        onChange={updateLatestDepartment}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">Latest Designation/role</Text>}
                                        placeholder="enter your deignation"
                                        withAsterisk
                                        value={latestDesignation}
                                        error={latestDesignationError}
                                        onChange={updateLatestDesignation}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">Latest Industry</Text>}
                                        placeholder="enter your industry"
                                        withAsterisk
                                        value={latestIndustry}
                                        error={latestIndustryError}
                                        onChange={updateLatestIndustry}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                                    <Text weight={600} size={13} mb={5}>Current CTC <IconAsterisk size={7} color='red' /></Text>
                                    <Grid>
                                        <Grid.Col span={4}>
                                            <Select
                                                placeholder="Rs."
                                                searchable
                                                data={[
                                                    { value: '₹', label: '₹' },
                                                    { value: '$', label: '$' }
                                                ]}
                                                value={currentCtc}
                                                error={currentCtcError}
                                                onChange={updateCurrentCtc}
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={8}>
                                            <TextInput
                                                placeholder='enter the CTC'
                                                value={currentCtcSalary}
                                                error={currentCtcSalaryError}
                                                onChange={updateCurrentCtcSalary}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                                    <Text weight={600} size={13} mb={5}>Expected CTC <IconAsterisk size={7} color='red' /></Text>
                                    <Grid>
                                        <Grid.Col span={4}>
                                            <Select
                                                placeholder="Rs."
                                                data={[
                                                    { value: '₹', label: '₹' },
                                                    { value: '$', label: '$' }
                                                ]}
                                                value={expectedCtc}
                                                error={expectedCtcError}
                                                onChange={updateExpectedCtc}
                                                searchable
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={8}>
                                            <TextInput
                                                placeholder='enter the CTC'
                                                value={expectedCtcSalary}
                                                error={expectedCtcSalaryError}
                                                onChange={updateExpectedCtcSalary}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </Grid.Col>
                            </>
                        }
                        <Grid.Col xs={6} sm={4} md={4} lg={4} xl={4}>
                            <MultiSelect
                                label={<Text weight={600} display="inline-block">Languages</Text>}
                                placeholder="select the languages"
                                withAsterisk
                                data={[
                                    { value: 'Telugu', label: 'Telugu' },
                                    { value: 'English', label: 'English' },
                                    { value: 'Hindi', label: 'Hindi' },
                                    { value: 'Tamil', label: 'Tamil' },
                                    { value: 'Kannada', label: 'Kannada' },
                                    { value: 'Malayalam', label: 'Malayalam' }
                                ]}
                                value={languages}
                                error={languagesError}
                                onChange={updateLanguages}
                                searchable
                            />
                        </Grid.Col>
                    </Grid>
                </Card.Section>
                <Card.Section inheritPadding pt={10}>
                    <Group position="right" >
                        <Button color="teal" onClick={createdcnd}>Next step</Button>
                    </Group>
                </Card.Section>
                <LoadingOverlay visible={isLoadingoverlayEffect} />
            </Card>
        </>
    )
}

export default Candidatedetails