import React, { useState } from 'react'
import BridgeConnectionProcess from './BridgeConnectionProcess'
import SelectBridge from './SelectBridge'

const ConnectBridge = () => {
    const [selectedDevice, setSelectedDevice] = useState({})

    const addSelectedDevice = (device) => {
        const tmpSelectedDevice = selectedDevice
        tmpSelectedDevice[device.id] = device
        setSelectedDevice({...tmpSelectedDevice})
    }

    const removeSelectedDevice = (device) => {
        const tmpSelectedDevice = selectedDevice
        console.log(device)
        delete tmpSelectedDevice[device]        
        setSelectedDevice({...tmpSelectedDevice})
    }

    return (
        <div>
            <SelectBridge addSelectedDevice={addSelectedDevice} removeSelectedDevice={removeSelectedDevice} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
        </div>
    )
}


export default ConnectBridge