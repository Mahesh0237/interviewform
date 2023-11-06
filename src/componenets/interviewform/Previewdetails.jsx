import { Alert, Button, Card, Grid, Group, Loader, LoadingOverlay, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import app from '../../firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

function Previewdetails() {
  const navigate = useNavigate()
  const [loadingoverlayEffect, setLoadingoverlayEffct] = useState(false)
  const db = getDatabase(app)
  let userPhonenum = JSON.parse(sessionStorage.getItem('usermobilenum'))

  const [profileDetails, setProfileDetails] = useState(null)
  const getProfileDetails = () => {
    setLoadingoverlayEffct(true)
    const starCountRef = ref(db, `interviewcandidates/${userPhonenum}/candidatedetails`)
    onValue(starCountRef, (snapshot) => {
      setLoadingoverlayEffct(false)
      const user_data = snapshot.val()
      setProfileDetails(user_data)
    })
  }

  const [addressDetails, setAddressDetails] = useState(null)
  const getAddressDetails = () => {
    setLoadingoverlayEffct(true)
    const starCountRef = ref(db, `interviewcandidates/${userPhonenum}/addressdetails`)
    onValue(starCountRef, (snapshot) => {
      setLoadingoverlayEffct(false)
      const user_data = snapshot.val()
      setAddressDetails(user_data)
    })
  }

  const [userEducationData, setUserEducationData] = useState(null)
  const getEducationDetails = () => {
    setLoadingoverlayEffct(true)
    const starCountRef = ref(db, `interviewcandidates/${userPhonenum}/EducationData`)
    onValue(starCountRef, (snapshot) => {
      setLoadingoverlayEffct(false)
      const user_data = snapshot.val()
      if (user_data !== null) {
        const keys = Object.keys(user_data)
        // Create a new object with properties in reverse order
        const reversedObject = {}
        for (let i = keys.length - 1; i >= 0; i--) {
          reversedObject[keys[i]] = user_data[keys[i]]
        }
        setUserEducationData(reversedObject)
      } else {
        setUserEducationData(null)
      }
    })
  }

  const [userEmploymentData, setUserEmplymentData] = useState(null)
  function getUserEmploymentData() {
    setLoadingoverlayEffct(true)
    const starCountRef = ref(db, `interviewcandidates/${userPhonenum}/employmentdata`)
    onValue(starCountRef, (snapshot) => {
      setLoadingoverlayEffct(false)
      const user_data = snapshot.val()
      setUserEmplymentData(user_data)
    })
  }

  useEffect(() => {
    getProfileDetails()
    getAddressDetails()
    getEducationDetails()
    getUserEmploymentData()
  }, [])

  const formSubmit = () => {
    const confirmed = window.confirm('Are you sure you want to submit the data');

    if (confirmed) {
      sessionStorage.removeItem('usermobilenum')
      navigate('/stepper_completed')
    } else {
      // Handle the cancel action or do nothing
    }

  }
  const backSubmit = () => {
    // if (userEmploymentData === null) {
    //   navigate('/educationdetails')
    // } else {
    //   navigate('/experiencedetails')
    // }
    navigate('/candidate_resume')
  }
  return (
    <>
      <Text weight={600} mb={10} size={16}>Preview Details:</Text>
      <Card withBorder>
        <Card.Section inheritPadding py={10}>
          <Text size={16} weight={600} color='#f00'>Profile Details:</Text>
        </Card.Section>
        <Card.Section inheritPadding py={10} withBorder>
          {
            profileDetails ?
              <Card withBorder inheritPadding>
                <Grid>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>First Name: </Text>
                    <Text size={14} weight={400}>{profileDetails.firstName}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>Last Name: </Text>
                    <Text size={14} weight={400}>{profileDetails.lastName}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>Email:</Text>
                    <Text size={14} weight={400}>{profileDetails.email}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>Mobile Number:</Text>
                    <Text size={14} weight={400}>{profileDetails.phoneNumber}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>Gender:</Text>
                    <Text size={14} weight={400}>{profileDetails.gender}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>Marrital Status:</Text>
                    <Text size={14} weight={400}>{profileDetails.marritalStatus}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>Qualification:</Text>
                    <Text size={14} weight={400}>{profileDetails.qualification}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>Course:</Text>
                    <Text size={14} weight={400}>{profileDetails.course}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>Specialisation:</Text>
                    <Text size={14} weight={400}>{profileDetails.specialization}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>Profession:</Text>
                    <Text size={14} weight={400}>{profileDetails.profession}</Text>
                  </Grid.Col>
                  {
                    profileDetails.profession !== "Fresher" &&
                    <>
                      <Grid.Col xs={4} sm={4} md={4}>
                        <Text size={15} weight={600} color='#4A0058'>Experience:</Text>
                        <Text>{profileDetails.experience}</Text>
                      </Grid.Col>
                      <Grid.Col xs={4} sm={4} md={4}>
                        <Text size={15} weight={600} color='#4A0058'>Latest Department:</Text>
                        <Text size={14} weight={400}>{profileDetails.latestDepartment}</Text>
                      </Grid.Col>
                      <Grid.Col xs={4} sm={4} md={4}>
                        <Text size={15} weight={600} color='#4A0058'>Latest Designation:</Text>
                        <Text size={14} weight={400}>{profileDetails.latestDesignation}</Text>
                      </Grid.Col>
                      <Grid.Col xs={4} sm={4} md={4}>
                        <Text size={15} weight={600} color='#4A0058'>Latest Industry:</Text>
                        <Text size={14} weight={400}>{profileDetails.latestIndustry}</Text>
                      </Grid.Col>
                      <Grid.Col xs={4} sm={4} md={4}>
                        <Text size={15} weight={600} color='#4A0058'>Current CTC:</Text>
                        <Text size={14} weight={400}>{profileDetails.currentCtcSalary}</Text>
                      </Grid.Col>
                      <Grid.Col xs={4} sm={4} md={4}>
                        <Text size={15} weight={600} color='#4A0058'>Expected CTC:</Text>
                        <Text size={14} weight={400}>{profileDetails.expectedCtcSalary}</Text>
                      </Grid.Col>
                    </>
                  }
                  <Grid.Col md={3}>
                    <Text size={15} weight={600} color='#4A0058'>Languages:</Text>
                    {profileDetails.languages.map((language, index) => (
                      <Text component='span' size={14} weight={400} key={index}> {language}, </Text>
                    ))}
                  </Grid.Col>
                </Grid>
              </Card>
              :
              <Alert variant="light" color='yellow'>
                <Text size={14}>No Data</Text>
              </Alert>
          }
        </Card.Section>
        <Card.Section inheritPadding py={10}>
          <Text size={16} weight={600} color='#f00'>Address Details:</Text>
        </Card.Section>
        <Card.Section inheritPadding py={10} withBorder>
          {
            addressDetails ?
              <Card withBorder>
                <Grid>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>Country: </Text>
                    <Text size={14} weight={400}>{addressDetails.country}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>State: </Text>
                    <Text size={14} weight={400}>{addressDetails.state}</Text>
                  </Grid.Col>
                  <Grid.Col xs={4} sm={4} md={4}>
                    <Text size={15} weight={600} color='#4A0058'>City:</Text>
                    <Text size={14} weight={400}>{addressDetails.city}</Text>
                  </Grid.Col>
                </Grid>
              </Card>
              :
              <Alert variant="light" color='yellow'>
                <Text size={14}>No Data</Text>
              </Alert>
          }
        </Card.Section>
        <Card.Section inheritPadding py={10} >
          <Text size={16} weight={600} color='#f00'>Education Details:</Text>
        </Card.Section>
        <Card.Section inheritPadding py="md" withBorder>
          {
            userEducationData !== null ?
              Object.keys(userEducationData).map((id) => {
                const userData = userEducationData[id]
                return (
                  <React.Fragment key={id}>
                    <Text size={14} color='blue' weight="bold" mb={5}>{userData.qualification}:</Text>
                    <Card mb="xs" withBorder >
                      <Grid>
                        <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                          <Text size={15} weight={600} color='#4A0058'>Degree</Text>
                          <Text size={14} weight={400}>{userData.qualification}</Text>
                        </Grid.Col>
                        {
                          (userData.qualification === '12th') || (userData.qualification === '10th') ?
                            <>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>Board</Text>
                                <Text size={14} weight={400}>{userData.board}</Text>
                              </Grid.Col>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>School Medium</Text>
                                <Text size={14} weight={400}>{userData.schoolMedium}</Text>
                              </Grid.Col>
                            </>
                            :
                            <>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>University/Institute</Text>
                                <Text size={14} weight={400}>{userData.university}</Text>
                              </Grid.Col>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>Course</Text>
                                <Text size={14} weight={400}>{userData.course}</Text>
                              </Grid.Col>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>Specialization</Text>
                                <Text size={14} weight={400}>{userData.specialization}</Text>
                              </Grid.Col>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>Corse Type</Text>
                                <Text size={14} weight={400}>{userData.courseType}</Text>
                              </Grid.Col>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>Persuing</Text>
                                <Text size={14} weight={400}>{userData.isPersuing}</Text>
                              </Grid.Col>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>Course From</Text>
                                <Text size={14} weight={400}>{userData.course_from}</Text>
                              </Grid.Col>
                            </>
                        }
                        {
                          (userData.isPersuing === 'No') &&
                          <>
                            <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                              <Text size={15} weight={600} color='#4A0058'>{(userData.qualification === '12th') || (userData.qualification === '10th') ? 'Passing out Year' : 'Course To'}</Text>
                              <Text size={14} weight={400}>{userData.course_to}</Text>
                            </Grid.Col>
                            <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                              <Text size={15} weight={600} color='#4A0058'>Marks in %</Text>
                              <Text size={14} weight={400}>{userData.marks}</Text>
                            </Grid.Col>
                          </>
                        }
                      </Grid>
                    </Card>
                  </React.Fragment>
                )
              })
              :
              <Alert variant="light" color='yellow'>
                <Text size={14}>No Data</Text>
              </Alert>
          }
        </Card.Section>
        <Card.Section inheritPadding py={10} >
          <Text size={16} weight={600} color='#f00'>Employment Details:</Text>
        </Card.Section>
        <Card.Section inheritPadding py="md" withBorder>
          {
            userEmploymentData !== null ?
              Object.keys(userEmploymentData).map((id) => {
                const userData = userEmploymentData[id];
                return (
                  <React.Fragment key={id}>
                    <Text size={14} color='blue' weight="bold" mb={5}>{userData.companyName}:</Text>
                    <Card mb="xs" withBorder >
                      <Grid>
                        <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                          <Text size={15} weight={600} color='#4A0058'>Company </Text>
                          <Text size={14} weight={400}>{userData.companyName}</Text>
                        </Grid.Col>
                        <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                          <Text size={15} weight={600} color='#4A0058'>Designation </Text>
                          <Text size={14} weight={400}>{userData.designation}</Text>
                        </Grid.Col>
                        <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                          <Text size={15} weight={600} color='#4A0058'>Joining Date </Text>
                          <Text size={14} weight={400}>{userData.joining_date}</Text>
                        </Grid.Col>
                        {
                          userData.currentlyEmployed === 'No' ?
                            <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                              <Text size={15} weight={600} color='#4A0058'>Worked Till </Text>
                              <Text size={14} weight={400}>{userData.worked_till}</Text>
                            </Grid.Col>
                            :
                            <>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>Annual Salary </Text>
                                <Text size={14} weight={400}>{userData.currencyType} {userData.salaryAmount}</Text>
                              </Grid.Col>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>Skills Used</Text>
                                <Text size={14} weight={400}>{userData.skillsUsed}</Text>
                              </Grid.Col>
                              <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                <Text size={15} weight={600} color='#4A0058'>Notice Period</Text>
                                <Text size={14} weight={400}>{userData.noticePeriod}</Text>
                              </Grid.Col>
                            </>
                        }
                        <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                          <Text size={15} weight={600} color='#4A0058'>Job Profile</Text>
                          <Text size={14} weight={400}>{userData.jobProfile}</Text>
                        </Grid.Col>
                        <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                          <Text size={15} weight={600} color='#4A0058'>Total Work Experience</Text>
                          <Text size={14} weight={400} >{userData.totalWorkExp}</Text>
                        </Grid.Col>
                      </Grid>
                    </Card>
                  </React.Fragment>
                )
              })
              :
              <Alert variant="light" color='yellow' withBorder>
                <Text size={14}>No Data</Text>
              </Alert>
          }
        </Card.Section>
        <Card.Section inheritPadding pt={15} >
          <Group position="apart">
            <Button variant="default" onClick={backSubmit}>Back</Button>
            <Button color='dark' onClick={formSubmit}>Submit</Button>
          </Group>
        </Card.Section>
        <LoadingOverlay visible={loadingoverlayEffect} loader={<Loader variant='bars' />} />
      </Card>
    </>
  )
}

export default Previewdetails