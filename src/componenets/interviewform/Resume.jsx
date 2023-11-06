import { Group, Loader, LoadingOverlay, Card, Container, Stack, Text, Button } from '@mantine/core'
import React, { useCallback, useEffect, useState } from 'react'
import app from '../../firebase';
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { Dropzone } from '@mantine/dropzone'
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from '@firebase/storage'
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { useNavigate } from 'react-router-dom';
function Resume() {
    const navigate = useNavigate()
    const [userMobileNumber, setUserMobileNumber] = useState(null)
    useEffect(() => {
        getUserExpstatus()
        let newPhonenum = sessionStorage.getItem('usermobilenum')
        let updatedPhonenum = JSON.parse(newPhonenum)
        setUserMobileNumber(updatedPhonenum)
    }, [])

    const db = getDatabase(app);
    const [cvFile, setCvFile] = useState(null)
    const [cvFileError, setCvFileError] = useState('')
    const [isLoadingoverlayEffect, setIsLoadingoverlayEffect] = useState(false)
    const handleCvFileDrop = (files) => {
        setIsLoadingoverlayEffect(true)
        const [file] = files
        if (file) {
            setCvFileError('')
            setCvFile(file)
            const cvDataRef = ref(db, `interviewcandidates/${userMobileNumber}/resume`)
            const uniqueFileName = `${Date.now()}_${file.name}`
            const storage = getStorage(app)
            const cvRef = storageRef(storage, `resumes/${uniqueFileName}`)

            // Upload the file to Firebase Storage
            uploadBytes(cvRef, file)
                .then(() => {
                    // Get the download URL of the uploaded file directly from cvRef
                    setIsLoadingoverlayEffect(false)
                    return getDownloadURL(cvRef);
                })
                .then((downloadURL) => {
                    // Store the download URL in Firebase Realtime Database
                    const cvData = {
                        downloadURL,
                        fileName: file.name,
                    }

                    // Use the `set` function to set the data at the specified location
                    set(cvDataRef, cvData)
                        .then(() => {
                            setIsLoadingoverlayEffect(false)
                        })
                        .catch((error) => {
                            setIsLoadingoverlayEffect(false);
                            console.error('Error uploading CV:', error)
                            setCvFileError(error)
                        })
                })
                .catch((error) => {
                    setIsLoadingoverlayEffect(false);
                    console.error('Error uploading CV:', error)
                    setCvFileError(error)
                })
        }
    }

    const [userExpStatus, setUserExpStatus] = useState(null)
    function getUserExpstatus() {
        const starCountRef = ref(db, `interviewcandidates/${userMobileNumber}/candidatedetails`)
        onValue(starCountRef, (snapshot) => {
            const user_data = snapshot.val()
            if (user_data) {
                setUserExpStatus(user_data.profession)
            } else {
                setUserExpStatus(null)
            }
        })
    }

    // const [userResume, setUserResume] = useState(null)
    // function getUserResume() {
    //     const starCountRef = ref(db, `interviewcandidates/${userMobileNumber}/resume`)
    //     onValue(starCountRef, (snapshot) => {
    //         const user_data = snapshot.val()
    //         setUserResume(user_data.downloadURL)
    //     })
    // }

    const handleResumeNext = () => {
        setIsLoadingoverlayEffect(true)
        if (cvFile === null) {
            setIsLoadingoverlayEffect(false)
            setCvFileError('please upload the resume')
        }
        if (cvFile) {
            setIsLoadingoverlayEffect(false)
            navigate('/preview')
        }
    }
    const handleResumeBack = () => {
        if (userExpStatus === "Fresher") {
            navigate('/Educationdetails')
        } else {
            navigate('/experiencedetails')
        }
    }
    return (
        <>
            <Card withBorder >
                <Card.Section inheritPadding py={10} >
                    <Text weight={600} size={18} color='rgb(255, 0, 0)'>Resume:</Text>
                </Card.Section>
                <Card.Section inheritPadding py={20} withBorder>
                    <Dropzone
                        label="Resume"
                        onDrop={handleCvFileDrop}
                        onReject={() => {
                            notifications.show({
                                title: 'Failed to Upload CV',
                                message: 'supported format in pdf/msword and not exceed to 5mb',
                                zIndex: 9999999,
                                color: 'red',
                                icon: <IconX />,
                            })
                        }}
                        maxSize={5 * 1024 ** 2}
                        accept={{
                            'application/pdf': ['.pdf'],
                            'application/msword': ['.doc'],
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                        }}
                    >
                        {cvFile ? (
                            <Group position="center" spacing="xl" style={{ minHeight: 80 }}>
                                <Stack align="center" justify="center">
                                    <Text size="xl" inline weight="bold" color="#00A85A">
                                        {cvFile.name}
                                    </Text>
                                    <Text size="sm" color="dimmed" inline mt={7} align="center">
                                        File size: {Math.round(cvFile.size / 1024)} KB
                                    </Text>
                                </Stack>
                            </Group>
                        ) : (
                            <Group position="center" spacing="xl" style={{ minHeight: 80 }}>
                                <Stack align="center" justify="center">
                                    <Text size="xl" inline weight="bold" color="#00A85A">
                                        Drop your CV
                                    </Text>
                                    <Text size="sm" color="dimmed" inline mt={7} align="center">
                                        Attach your Resume, file should not exceed 5mb, supported format's pdf/word
                                    </Text>
                                </Stack>
                            </Group>
                        )}
                    </Dropzone>
                    {
                        cvFileError &&
                        <Text color='red' weight={600} size={15}>{cvFileError}</Text>
                    }
                </Card.Section>
                <Card.Section inheritPadding pt={10}>
                    <Group position="apart" >
                        <Button variant="default" onClick={handleResumeBack}>Back</Button>
                        <Button color='dark' onClick={handleResumeNext}>Next</Button>
                    </Group>
                </Card.Section>
                <LoadingOverlay visible={isLoadingoverlayEffect} loader={<Loader values='bars' />} />
            </Card>
            {/* <iframe
                title="Resume Preview"
                src={userResume}
                width="100%"
                height="500px"
            ></iframe> */}
        </>
    )
}

export default Resume