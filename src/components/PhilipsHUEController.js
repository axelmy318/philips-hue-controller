import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { loadMainFromStorage } from '../redux/actions/Main';
import { ipcRenderer } from 'electron';

import GetStarted from './GetStarted';
import Dashboard from './Dashboard';
import LoadingScreen from './LoadingScreen';

const PhilipsHUEController = () => {
    const main = useSelector(API => API.Main)
    const dispatch = useDispatch()

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

        { main.loadedFromLocalStorage &&
            <Dashboard />
        }
        </>
    )
}

export default PhilipsHUEController