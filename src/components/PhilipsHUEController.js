import React, { useState} from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { loadMainFromStorage } from '../redux/actions/Main';
import { ipcRenderer } from 'electron';

import GetStarted from './GetStarted';
import Dashboard from './Dashboard';
import LoadingScreen from './LoadingScreen';

const PhilipsHUEController = () => {
    const main = useSelector(API => API.Main)
    const dispatch = useDispatch()
    const [ buttonText, setButtonText ] = useState('Check for update') 

    if(!main.loadedFromLocalStorage){
        ipcRenderer.invoke('GET_FROM_STORAGE', {key: 'main'}).then((result) => {
            dispatch(loadMainFromStorage(result))
        })
    }
    
    const checkForUpdates = () => {
        ipcRenderer.send('CHECK_FOR_UPDATES')
        //ipcRenderer.on('UPDATE_DOWNLOADED', (event, arg) => setButtonText('Ready to install'))
    }
    
    ipcRenderer.on('SET_UPDATE_STATUS', (event, arg) => console.log(arg))
    
    return (
        <>
        { !main.loadedFromLocalStorage &&
            <LoadingScreen />
        }

        {/* main.loadedFromLocalStorage && Object.keys(main.bridges).length <= 0 &&
            <GetStarted />
        */}
            <button onClick={() => checkForUpdates()}>{buttonText}</button>
        { main.loadedFromLocalStorage &&
            <Dashboard />
        }
        </>
    )
}

export default PhilipsHUEController