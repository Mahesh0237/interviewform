import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader, Stack, Text } from '@mantine/core';
const Resume = lazy(() => import('./componenets/interviewform/Resume'))
const Candidatedetails = lazy(() => import('./componenets/interviewform/Candidatedetails'))
const Addressdetails = lazy(() => import('./componenets/interviewform/Addressdetails'))
const UserEducationdetailswrapper = lazy(() => import('./componenets/interviewform/userdetails/UserEducationdetailswrapper'))
const UserEmploymentdetailswrapper = lazy(() => import('./componenets/interviewform/userdetails/UserEmploymentdetailswrapper'))
const Steppercompleted = lazy(() => import('./componenets/interviewform/Steppercompleted'))
const Previewdetails = lazy(() => import('./componenets/interviewform/Previewdetails'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <Stack align='center' justify='center' style={{ height: "100vh" }}>
          <Loader variant="dots" color="green" />
          <Text size={14} weight={600}>Loading please wait....</Text>
        </Stack>
      }>
        <Routes>
          <Route path="/" exact element={<Candidatedetails />} />
          <Route path="/address" element={<Addressdetails />} />
          <Route path='/Educationdetails' element={<UserEducationdetailswrapper />} />
          <Route path='/experiencedetails' element={<UserEmploymentdetailswrapper />} />
          <Route path='/candidate_resume' element={<Resume />} />
          <Route path='/preview' element={<Previewdetails />} />
          <Route path="/stepper_completed" element={<Steppercompleted />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App