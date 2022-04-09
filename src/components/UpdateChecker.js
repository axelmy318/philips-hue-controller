import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateSatus } from '../redux/actions/Update'
import { ipcRenderer } from 'electron'

const UpdateChecker = () => {
    const dispatch = useDispatch()
    const update = useSelector(API => API.Update)

    ipcRenderer.on('SET_UPDATE_STATUS', (event, arg) => console.log(arg))

    ipcRenderer.on('SET_UPDATE_STATUS', (event, arg) => console.log(arg))
    ipcRenderer.on('SET_UPDATE_STATUS', (event, arg) => dispatch(setUpdateSatus(arg.status, arg)))

    return (
        <></>
    )
}

export default UpdateChecker