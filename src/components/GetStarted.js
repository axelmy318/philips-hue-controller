import React, { useState } from 'react'
import BridgeConnectionProcess from './BridgeConnectionProcess'
import SelectBridge from './SelectBridge'

const GetStarted = () => {
    const [selectedDevice, setSelectedDevice] = useState(null)

    return (
        <div className='container centered'>
            <div>
                <h1 className='get-started-title'>Philips HUE Controller</h1>
                {
                    selectedDevice === null ?
                    <SelectBridge selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
                    :
                    <BridgeConnectionProcess selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
                }
            </div>
        </div>
    )
}


export default GetStarted