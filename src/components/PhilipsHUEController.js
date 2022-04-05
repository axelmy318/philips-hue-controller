import React from 'react'
import GetStarted from './GetStarted';

import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import { loadMainFromStorage } from '../redux/actions/Main';
import { ipcRenderer } from 'electron';

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
        { Object.keys(main.bridges).length <= 0 &&
            <GetStarted />
        }

        { Object.keys(main.bridges).length > 0 &&
            <Dashboard />
        }
            
        </>
    )
}

export default PhilipsHUEController