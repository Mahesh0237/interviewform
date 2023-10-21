import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global.css'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals';
import { MantineProvider } from '@mantine/core'
import store from './componenets/redux/Store'
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <Provider store={store}>
          <Notifications zIndex={999999999999999} position="top-right" />
          <App />
        </Provider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
)
