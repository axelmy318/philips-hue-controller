import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateSatus } from '../redux/actions/Update'
import { ipcRenderer } from 'electron'

const UpdateChecker = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        const listener = (event, arg) => {
            console.log('From MAIN: ', arg)
            dispatch(setUpdateSatus(arg.status, arg))
        }

        ipcRenderer.on('SET_UPDATE_STATUS', (event, arg) => listener(event, arg))

        return (() => {
            ipcRenderer.removeListener('SET_UPDATE_STATUS', listener);
        })
    })

    return (
        <></>
    )
}

export default UpdateChecker