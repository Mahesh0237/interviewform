import { Alert, Button, Card, Container, Grid, Group, Loader, LoadingOverlay, Modal, Text, Tooltip } from '@mantine/core'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import EmploymentModal from './parts/EmploymentModal'
import { useViewportSize } from '@mantine/hooks';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import EditemploymentModal from './parts/editparts/EditemploymentModal';
import { openConfirmModal } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import app from '../../../firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function UserEmploymentdetailswrapper() {
    // const mobileNum = useSelector((state) => state.userAuthReducer)
    const dispatch = useDispatch()
    const [isLoadingEffect, setIsLoadingEffect] = useState(false)
    const db = getDatabase(app)
    const navigate = useNavigate()
    const { width } = useViewportSize();
    const [employment, setEmployment] = useState(false)
    const openEmploymentModal = () => {
        setEmployment(true)
    }
    const closeEmploymentModal = () => {
        setEmployment(false)
    }

    const [editEmployment, setEditEmployment] = useState(false)
    const [editId, setEditId] = useState(null)
    const openEditEmploymantModal = useCallback((value) => {
        setEditEmployment(true)
        setEditId(value)
    }, [])

    const closeEditEmploymentModal = () => {
        setEditEmployment(false)
    }

    let modalSize;
    if (width >= 1441) {
        modalSize = "55%"
    } else if (width >= 768) {
        modalSize = "75%"
    } else if (width >= 426) {
        modalSize = "70%"
    } else if (width <= 425) {
        modalSize = "100%"
    }

    const [mobileNum, setMobileNum] = useState(JSON.parse(sessionStorage.getItem('usermobilenum')))

    const [userEmploymentData, setUserEmplymentData] = useState({})

    function getUserEmploymentData() {
        setIsLoadingEffect(true)
        const starCountRef = ref(db, `interviewcandidates/${mobileNum}/employmentdata`)
        onValue(starCountRef, (snapshot) => {
            setIsLoadingEffect(false)
            const user_data = snapshot.val()
            setUserEmplymentData(user_data)
        })
    }

    const refresherEmploymentData = useCallback(() => {
        getUserEmploymentData()
    }, [])

    useEffect(() => {
        getUserEmploymentData()
    }, [])

    const deleteUserEmploymentData = useCallback((value) => {
        openConfirmModal({
            title: (
                <Text weight={600} size={16}>Please confirm your action!</Text>
            ),
            children: (
                <Text size="sm">Are you sure you want to delete your details? This action is destructive and you will have
                    to contact support to restore your data. </Text>
            ),
            labels: { confirm: 'Delete', cancel: "No don't delete it" },
            onConfirm: () => {
                const dataRef = ref(db, `interviewcandidates/${mobileNum}/employmentdata/${value}`)
                remove(dataRef)
                    .then((res) => {
                        refresherEmploymentData()
                        notifications.show({
                            title: 'notification',
                            message: 'employment details deleted successfully! 🤥',
                            color: 'green',
                            position: 'bottom-right',
                            zIndex: 9999999,
                        })
                    })
                    .catch((error) => {
                        console.error(`Error deleting data: ${error}`)
                    })
            },
            confirmProps: {
                color: ''
            },
            onCancel: () => console.log('Cancel'),
            centered: true,
            withCloseButton: false,
            closeOnClickOutside: false,
            closeOnEscape: false,
            zIndex: 999999999999999
        });


    }, [])

    const handleNext = () => {
        if (userEmploymentData !== null) {
            // dispatch(userMobile(null))
            navigate('/preview')
        } else {
            alert('please upload the experience details')
        }
    }

    return (
        <Container py={50}>
            <Card withBorder >
                <Card.Section inheritPadding withBorder py="md">
                    <Group position='apart'>
                        <Text color='rgb(255, 0, 0)' size={18} mb={3} weight={600}>Employment Details</Text>
                        <Button color="dark" size="xs" onClick={openEmploymentModal}>Add     New</Button>
                    </Group>
                </Card.Section>
                <Card.Section inheritPadding withBorder py="md">
                    {
                        userEmploymentData !== null ?
                            Object.keys(userEmploymentData).map((id) => {
                                const userData = userEmploymentData[id];
                                return (
                                    <React.Fragment key={id}>
                                        <Text size={14} color='blue' weight="bold" mb={5}>{userData.companyName}:</Text>
                                        <Card mb="xs" withBorder >
                                            <Grid>
                                                <Grid.Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Group position="right">
                                                        <Tooltip
                                                            label="edit"
                                                            withArrow
                                                            arrowPosition="center"
                                                            onClick={() => { openEditEmploymantModal(id) }}
                                                        >
                                                            <Button
                                                                variant='light'
                                                                size='xs'
                                                                radius="50%"
                                                                pl={7} pr={7}
                                                            >
                                                                <IconEdit size={15} />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip
                                                            label="delete"
                                                            withArrow
                                                            position="top-end"
                                                            onClick={() => { deleteUserEmploymentData(id) }}
                                                        >
                                                            <Button
                                                                variant='light'
                                                                size='xs'
                                                                radius="50%"
                                                                color='red'
                                                                pl={7} pr={7}

                                                            >
                                                                <IconTrash size={15} />
                                                            </Button>
                                                        </Tooltip>
                                                    </Group>
                                                </Grid.Col>
                                                <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                                    <Text size={15} weight={600} color='#4A0058'>Company </Text>
                                                    <Text>{userData.companyName}</Text>
                                                </Grid.Col>
                                                <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                                    <Text size={15} weight={600} color='#4A0058'>Designation </Text>
                                                    <Text>{userData.designation}</Text>
                                                </Grid.Col>
                                                <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                                    <Text size={15} weight={600} color='#4A0058'>Joining Date </Text>
                                                    <Text>{userData.joining_date}</Text>
                                                </Grid.Col>
                                                {
                                                    userData.currentlyEmployed === 'No' ?
                                                        <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                                            <Text size={15} weight={600} color='#4A0058'>Worked Till </Text>
                                                            <Text>{userData.worked_till}</Text>
                                                        </Grid.Col>
                                                        :
                                                        <>
                                                            <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                                                <Text size={15} weight={600} color='#4A0058'>Annual Salary </Text>
                                                                <Text>{userData.currencyType} {userData.salaryAmount}</Text>
                                                            </Grid.Col>
                                                            <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                                                <Text size={15} weight={600} color='#4A0058'>Skills Used</Text>
                                                                <Text>{userData.skillsUsed}</Text>
                                                            </Grid.Col>
                                                            <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                                                <Text size={15} weight={600} color='#4A0058'>Notice Period</Text>
                                                                <Text>{userData.noticePeriod}</Text>
                                                            </Grid.Col>
                                                        </>
                                                }
                                                <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                                    <Text size={15} weight={600} color='#4A0058'>Job Profile</Text>
                                                    <Text>{userData.jobProfile}</Text>
                                                </Grid.Col>
                                                <Grid.Col xs={6} sm={4} md={3} lg={3} xl={3}>
                                                    <Text size={15} weight={600} color='#4A0058'>Total Work Experience</Text>
                                                    <Text>{userData.totalWorkExp}</Text>
                                                </Grid.Col>
                                            </Grid>
                                        </Card>
                                    </React.Fragment>
                                )
                            })
                            :
                            <Alert color="orange">
                                <Group>
                                    No Employment details
                                    <Button size="xs" onClick={openEmploymentModal} variant="light">Update Employment details</Button>
                                </Group>
                            </Alert>
                    }
                    <LoadingOverlay visible={isLoadingEffect} loader={<Loader variant="bars" color="green" />} />
                </Card.Section>
                <Card.Section inheritPadding withBorder py="md">
                    <Group position='apart'>
                        <Button variant='default' component='a' href='/Educationdetails'>Back</Button>
                        <Button color='dark' onClick={handleNext}>Next</Button>
                    </Group>
                </Card.Section>
            </Card>
            <Modal
                opened={employment}
                onClose={closeEmploymentModal}
                withCloseButton={false}
                zIndex={999999999}
                size={modalSize}
                closeOnClickOutside={false}
                closeOnEscape={false}
            >
                {
                    employment === true &&
                    <EmploymentModal
                        refresherEmploymentData={refresherEmploymentData}
                        closeEmploymentModal={closeEmploymentModal}
                        mobileNum={mobileNum}
                    />
                }
            </Modal>
            {/* edit Modal */}
            <Modal
                opened={editEmployment}
                onClose={closeEditEmploymentModal}
                withCloseButton={false}
                zIndex={999999999}
                size={modalSize}
                closeOnClickOutside={false}
                closeOnEscape={false}
            >
                {
                    editEmployment === true &&
                    <EditemploymentModal
                        editId={editId}
                        refresherEmploymentData={refresherEmploymentData}
                        closeEditEmploymentModal={closeEditEmploymentModal}
                        mobileNum={mobileNum}
                    />
                }
            </Modal>
        </Container>
    )
}

export default UserEmploymentdetailswrapper