import React, { useState } from 'react'
import BridgeConnectionProcess from './BridgeConnectionProcess'
import SelectBridge from './SelectBridge'

const GetStarted = () => {
    const [selectedDevice, setSelectedDevice] = useState(null)

    return (
        <div>
            <h1 className='get-started-title'>Philips HUE Controller</h1>
            {
                selectedDevice === null ?
                <SelectBridge selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
                :
                <BridgeConnectionProcess />
            }
        </div>
    )
}


export default GetStarted