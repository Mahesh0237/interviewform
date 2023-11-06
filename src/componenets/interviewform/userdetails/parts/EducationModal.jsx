import { Button, Card, Chip, Container, Grid, Group, Input, LoadingOverlay, Radio, Select, Stack, Text, TextInput } from '@mantine/core'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import Monthyearpicklerwrapper from '../../shared/monthyearpickler/Monthyearpicklerwrapper';
import moment from 'moment';
import app from '../../../../firebase';
import { notifications } from '@mantine/notifications';
function generateUniqueId() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString();
}
function Educationwrapper({ refresherEducationData, closeEducationModal, mobileNum }) {
    const uniqueId = generateUniqueId();
    const db = getDatabase(app)
    const navigate = useNavigate()
    const date = new Date();
    const recievedDate = date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    const [loadingEffect, setLoadingEffect] = useState(false)
    const [qualification, setQualifiaction] = useState(null)
    const [qualificationError, setQualificationError] = useState('')
    const updateQualification = (value) => {
        setQualifiaction(value)
        setQualificationError('')
        setUniversity('')
        setCourse('')
        setSpecialization('')
        setCourseType('Full Time')
        setIspersuing('No')
        setCourseStartYear(null)
        setCourseEndingYear(null)
        setMarks('')
        setBoard('')
        setSchoolMedium('')
    }
    const [university, setUniversity] = useState('')
    const [universityError, setUniversityError] = useState('')
    const updateUniversity = (e) => {
        setUniversity(e.currentTarget.value)
        setUniversityError('')
    }
    const [course, setCourse] = useState('')
    const [courseError, setCourseError] = useState('')
    const updateCourse = (e) => {
        setCourse(e.currentTarget.value)
        setCourseError('')
    }
    const [specialization, setSpecialization] = useState('')
    const [specializationError, setSpecializationError] = useState('')
    const updateSpecialization = (e) => {
        setSpecialization(e.currentTarget.value)
        setSpecializationError('')
    }
    const [courseType, setCourseType] = useState('Full Time')
    const [courseTypeError, setCourseTypeError] = useState('')
    const updateCourseType = (value) => {
        setCourseType(value)
        setCourseTypeError('')
    }
    const [isPersuing, setIspersuing] = useState('No')
    const updateIspersuing = (value) => {
        setIspersuing(value)
    }

    const [courseStartYear, setCourseStartYear] = useState(null)
    const [courseStartYearError, setCourseStartYearError] = useState('')
    const updateCourseStartYear = (value) => {
        setCourseStartYear(value)
        setCourseStartYearError('')
    }
    const [courseEndingYear, setCourseEndingYear] = useState(null)
    const [courseEndingYearError, setCourseEndingYearError] = useState('')
    const updateCourseEndingYear = (value) => {
        setCourseEndingYear(value)
        setCourseEndingYearError('')
    }

    const [marks, setMarks] = useState('')
    const updateMarks = (e) => {
        setMarks(e.currentTarget.value)
    }
    const [board, setBoard] = useState('')
    const updateBoard = (e) => {
        setBoard(e.currentTarget.value)
    }
    const [schoolMedium, setSchoolMedium] = useState('')
    const updateSchoolMedium = (e) => {
        setSchoolMedium(e.currentTarget.value)
    }

    // useEffect(() => {
    //     const handleBeforeUnload = (e) => {
    //         if (
    //             qualification ||
    //             university ||
    //             course ||
    //             specialization ||
    //             courseType !== 'Full Time' ||
    //             isPersuing !== 'No' ||
    //             courseStartYear ||
    //             courseEndingYear ||
    //             marks ||
    //             board ||
    //             schoolMedium
    //         ) {
    //             // Display a confirmation message to the user
    //             e.preventDefault();
    //             e.returnValue = '';
    //         }
    //     }

    //     window.addEventListener('beforeunload', handleBeforeUnload)

    //     return () => {
    //         // Remove the event listener when the component unmounts
    //         window.removeEventListener('beforeunload', handleBeforeUnload)
    //     }
    // }, [qualification, university, course, specialization, courseType, isPersuing, courseStartYear, courseEndingYear, marks, board, schoolMedium])

    // useEffect(() => {
    //     const starCountRef = ref(db, `users/${userid}/EducationData`);
    //     onValue(starCountRef, (snapshot) => {
    //         const user_data = snapshot.val();
    //         if (user_data) {
    //             setQualifiaction(user_data.qualification)
    //             setUniversity(user_data.university)
    //             setCourse(user_data.course)
    //             setSpecialization(user_data.specialization)
    //             setCourseType(user_data.courseType)
    //             setIspersuing(user_data.isPersuing)
    //             setMarks(user_data.marks)
    //             setBoard(user_data.board)
    //             setSchoolMedium(user_data.schoolMedium)
    //             setCourseStartYear(user_data.course_from)
    //             setCourseEndingYear(user_data.course_to)
    //         }
    //     });
    // }, [])

    const updateForm = () => {
        setLoadingEffect(true)
        if (qualification === null) {
            setQualificationError('select the qualification')
            setLoadingEffect(false)
            return false
        }
        if ((qualification === '12th') || (qualification === '10th')) {

        } else {
            if (university === '') {
                setUniversityError('enter the university name')
                setLoadingEffect(false)
                return false
            }
            if (course === '') {
                setCourseError('enter your course')
                setLoadingEffect(false)
                return false
            }
            if (specialization === '') {
                setSpecializationError('enter your specialization')
                setLoadingEffect(false)
                return false
            }
            if (courseStartYear === null) {
                setCourseStartYearError('select the year')
                setLoadingEffect(false)
                return false
            }
        }

        if (isPersuing === 'No') {
            if (courseEndingYear === null) {
                setCourseEndingYearError('select the year')
                setLoadingEffect(false)
                return false
            }
        }

        let course_from;
        if (courseStartYear !== null) {
            course_from = moment(courseStartYear).format('YYYY-MM')
        } else {
            course_from = null;
        }

        let course_to;
        if (courseEndingYear !== null) {
            course_to = moment(courseEndingYear).format('YYYY-MM')
        } else {
            course_to = null;
        }
        let updatedqualification;
        if (qualification === 'Doctrate/PhD') {
            updatedqualification = 'Doctrate'
        } else if (qualification === 'Masters/post graduation') {
            updatedqualification = "post graduation"
        } else if (qualification === 'Graduation/Diploma') {
            updatedqualification = "Graduation"
        } else if (qualification === '12th') {
            updatedqualification = '12th'
        } else {
            updatedqualification = '10th'
        }
        // posting the data into the firebase
        set(ref(db, `interviewcandidates/${mobileNum}/EducationData/${updatedqualification}`), {
            qualification,
            university,
            course,
            courseType,
            specialization,
            course_from,
            course_to,
            isPersuing,
            marks,
            board,
            schoolMedium,
            recievedDate
        })
            .then((res) => {
                setLoadingEffect(false)
                notifications.show({
                    title: 'Success',
                    message: 'Education Details are added!',
                    color: 'green',
                    zIndex: 9999999,
                })
                refresherEducationData()
                closeEducationModal()
            })
            .catch((error) => {
                setLoadingEffect(false)
                console.log('user education data posting failed', error)
            })
    }

    return (
        <Card withBorder py="md" className='loginform'>
            <Card.Section inheritPadding withBorder py={20}>
                <Text color='rgb(255, 0, 0)' size={18} weight={600}>Education Details</Text>
            </Card.Section>
            <Card.Section inheritPadding withBorder py={20}>
                <Grid>
                    <Grid.Col xs={6} sm={4} md={4} lg={4}>
                        <Select
                            label={<Text weight={600} display="inline-block">Education</Text>}
                            searchable
                            nothingFound={<Text size={15} color='red' weight={600}>Nothing Found</Text>}
                            placeholder="select education"
                            withAsterisk
                            data={[
                                { value: 'Doctrate/PhD', label: 'Doctrate/PhD' },
                                { value: 'Masters/post graduation', label: 'Masters/post graduation' },
                                { value: 'Graduation/Diploma', label: 'Graduation/Diploma' },
                                { value: '12th', label: '12th' },
                                { value: '10th', label: '10th' }
                            ]}
                            value={qualification}
                            error={qualificationError}
                            onChange={updateQualification}
                        />
                    </Grid.Col>
                    {
                        (qualification === '12th') || (qualification === '10th') ?
                            <>
                                <Grid.Col xs={6} sm={4} md={4} lg={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">Board</Text>}
                                        placeholder="enter your board"
                                        withAsterisk
                                        value={board}
                                        onChange={updateBoard}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">School Medium</Text>}
                                        placeholder="enter your medium"
                                        withAsterisk
                                        value={schoolMedium}
                                        onChange={updateSchoolMedium}
                                    />
                                </Grid.Col>
                            </>
                            :
                            <>
                                <Grid.Col xs={6} sm={4} md={4} lg={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">University/Institute</Text>}
                                        placeholder='enter your university'
                                        withAsterisk
                                        value={university}
                                        error={universityError}
                                        onChange={updateUniversity}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">Course</Text>}
                                        withAsterisk
                                        placeholder='enter your course'
                                        value={course}
                                        error={courseError}
                                        onChange={updateCourse}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4}>
                                    <TextInput
                                        label={<Text weight={600} display="inline-block">Specialization</Text>}
                                        placeholder="enter your specialization"
                                        withAsterisk
                                        value={specialization}
                                        error={specializationError}
                                        onChange={updateSpecialization}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4}>
                                    <Radio.Group
                                        label={<Text weight={600} display="inline-block">Course Type</Text>}
                                        withAsterisk
                                        value={courseType}
                                        error={courseTypeError}
                                        onChange={updateCourseType}
                                    >
                                        <Group mt="xs">
                                            <Radio value="Full Time" label="Full Time" />
                                            <Radio value="Part Time" label="Part Time" />
                                        </Group>
                                    </Radio.Group>
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4}>
                                    <Radio.Group
                                        label={<Text weight={600} display="inline-block">Is persuing</Text>}
                                        withAsterisk
                                        value={isPersuing}
                                        onChange={updateIspersuing}
                                    >
                                        <Group mt="xs">
                                            <Radio value="Yes" label="Yes" />
                                            <Radio value="No" label="No" />
                                        </Group>
                                    </Radio.Group>
                                </Grid.Col>
                                <Grid.Col xs={6} sm={4} md={4} lg={4}>
                                    <Input.Wrapper label={<Text weight={600} display="inline-block">Course From</Text>} withAsterisk error={courseStartYearError}>
                                        <Monthyearpicklerwrapper
                                            value={courseStartYear}
                                            oldYears={100}
                                            currentYear={new Date().getFullYear()}
                                            onDateChange={updateCourseStartYear}
                                        />
                                    </Input.Wrapper>
                                </Grid.Col>
                            </>
                    }
                    {
                        (isPersuing === 'No') &&
                        <>
                            <Grid.Col xs={6} sm={4} md={4} lg={4}>
                                <Input.Wrapper
                                    label={<Text weight={600} display="inline-block">
                                        {(qualification === '12th') || (qualification === '10th') ? 'Passing out Year' : 'Course To'}</Text>}
                                    withAsterisk
                                    error={courseEndingYearError}
                                >
                                    <Monthyearpicklerwrapper
                                        value={courseEndingYear}
                                        oldYears={100}
                                        currentYear={new Date().getFullYear()}
                                        onDateChange={updateCourseEndingYear}
                                    />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col xs={6} sm={4} md={4} lg={4}>
                                <TextInput
                                    label={<Text weight={600} display="inline-block">Marks in %</Text>}
                                    placeholder="enter your marks"
                                    withAsterisk
                                    value={marks}
                                    onChange={updateMarks}
                                />
                            </Grid.Col>
                        </>
                    }
                </Grid>
            </Card.Section>
            <Card.Section inheritPadding pt={20}>
                <Group position='apart'>
                    <Button variant='default' onClick={closeEducationModal}> close</Button>
                    <Button color='dark' onClick={updateForm}> Update</Button>
                </Group>
            </Card.Section>
            <LoadingOverlay visible={loadingEffect} />
        </Card>
    )
}

export default Educationwrapper