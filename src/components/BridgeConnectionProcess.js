import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveBridge, getBridgeUsername, scanNetworkForBridges } from '../redux/actions/Main'

const BridgeConnectionProcess = ({ loadDeviceList, selectedDevice, setSelectedDevice }) => {
    const MAX_TIME = 45
    const [ name, setName ] = useState("")
    const [ started, setStarted ] = useState(false)
    const [ hasToPressButton, setHasToPressButton ] = useState(false)
    const [ timeRemaining, setTimeRemaining ] = useState(MAX_TIME)
    const [ APIData, setAPIData ] = useState(null)
    const dispatch = useDispatch()
    const bridges = useSelector(API => API.Main)

    const checkIfBridgeConnectionIsValid = () => {
        dispatch(getBridgeUsername(selectedDevice, name))
    }

    const goBackToSelectionMenu = () => {
        setSelectedDevice()
    }

    const handleApproveBridge = () => {
        dispatch(approveBridge(selectedDevice, name))
        loadDeviceList()
        dispatch(scanNetworkForBridges())
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(started && APIData === null && hasToPressButton) {
                setTimeRemaining(timeRemaining-1)
            }
            
            if(APIData === null)
                checkIfBridgeConnectionIsValid()
        }, 1000);

        if(timeRemaining <= 0){
            setTimeRemaining(-1)
            clearInterval(interval)
        }

        return () => clearInterval(interval)
      }, [timeRemaining, started, APIData]);


    useEffect(() => {
        if(bridges.bridgesConnexions.errors[selectedDevice.id] !== undefined) {
            //If button link has to be pressed
            if(bridges.bridgesConnexions.errors[selectedDevice.id].type === 101) {
                setHasToPressButton(true)
            }
        }

        if(APIData === null && bridges.bridgesConnexions.success[selectedDevice.id] !== undefined)
            setAPIData(bridges.bridgesConnexions.success[selectedDevice.id])
    })

    return (
        <div className='bridge-connection-process'>
            <div>
                { !started && 
                    <>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="form-control form-control-sm" type="text" placeholder="Name your HUE bridge" />
                
                        <button className='btn btn-sm btn-secondary mt-2' onClick={goBackToSelectionMenu}>Cancel</button>&nbsp;
                        <button className='btn btn-sm btn-success mt-2' disabled={!(name !== "")} onClick={() => setStarted(true)}>Start</button>
                  
                    </>
                }
                { started && timeRemaining >= 0 && APIData === null && hasToPressButton &&
                    <>
                    <p className='m-0 p-0'>{Math.max(0, timeRemaining)}s to press the link button</p>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{width: `${timeRemaining / MAX_TIME * 100}%`}} aria-valuenow={timeRemaining / MAX_TIME * 100} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button className='btn btn-sm btn-secondary mt-4' onClick={goBackToSelectionMenu}>Cancel</button>
                    </>
                }
                { started && timeRemaining >= 0 && APIData === null && !hasToPressButton &&
                    <>
                    <p className='m-0 p-0'>Trying to connect to your HUE bridge...</p>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <button className='btn btn-sm btn-secondary mt-4' onClick={goBackToSelectionMenu}>Cancel</button>
                    </>
                }
                { started && timeRemaining <= 0 && APIData === null &&
                    <>
                    <p className='m-0 p-0'>The link button was not pressed in time.</p>
                    <button className='btn btn-sm btn-secondary mt-4' onClick={goBackToSelectionMenu}>Cancel</button>&nbsp;
                    <button className='btn btn-sm btn-primary mt-4' onClick={() => setTimeRemaining(MAX_TIME)}>Retry</button>
                    </>
                }
                { started && APIData !== null &&
                    <>
                    <p className='m-0 p-0'>The HUE bridge successfully connected.</p>
                    <button className='btn btn-sm btn-primary mt-4' onClick={handleApproveBridge}>Add to my list</button>
                    </>
                }
            </div>
        </div>
    )
}

export default BridgeConnectionProcess