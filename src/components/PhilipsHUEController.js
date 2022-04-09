import React, { useState} from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { loadMainFromStorage } from '../redux/actions/Main';
import { ipcRenderer } from 'electron';

import Dashboard from './Dashboard';
import LoadingScreen from './LoadingScreen';
import UpdateChecker from './UpdateChecker';

const PhilipsHUEController = () => {
    const main = useSelector(API => API.Main)
    const dispatch = useDispatch()
    const [ buttonText, setButtonText ] = useState('Check for update') 

    if(!main.loadedFromLocalStorage){
        ipcRenderer.invoke('GET_FROM_STORAGE', {key: 'main'}).then((result) => {
            dispatch(loadMainFromStorage(result))
        })
    }
    
    return (
        <>
        { !main.loadedFromLocalStorage &&
            <LoadingScreen />
        }

        {/* main.loadedFromLocalStorage && Object.keys(main.bridges).length <= 0 &&
            <GetStarted />
        */}
        { main.loadedFromLocalStorage && <>
            <Dashboard />
            <UpdateChecker />
        </>}
        </>
    )
}

export default PhilipsHUEController