import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveBridge, getBridgeUsername } from '../redux/actions/Main'

const BridgeConnectionProcess = ({ selectedDevice, setSelectedDevice }) => {
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
        setSelectedDevice(null)
    }

    const handleApproveBridge = () => {
        dispatch(approveBridge(selectedDevice, name))
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
                    <p className='text-big'>Once you click on start, you will have {timeRemaining} seconds to press to link button on your HUE bridge.</p>
                    <br />
                    <div className='row'>
                        <div className='col md-4'></div>
                        <div className='col md-4'><input value={name} onChange={(e) => setName(e.target.value)} className="form-control form-control-lg" type="text" placeholder="Name your HUE bridge" /></div>
                        <div className='col md-4'></div>
                    </div>
                    <button className='btn btn-lg btn-secondary mt-4' onClick={goBackToSelectionMenu}>Cancel</button>&nbsp;
                    <button className='btn btn-success btn-lg mt-4' disabled={!(name !== "")} onClick={() => setStarted(true)}>Start</button>
                    </>
                }
                { started && timeRemaining >= 0 && APIData === null && hasToPressButton &&
                    <>
                    <p className='text-big'>You now have {Math.max(0, timeRemaining)} seconds to go click the link button on your HUE bridge !</p>
                    <div className='row mt-4'>
                        <div className='col md-4'></div>
                        <div className='col md-4'>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: `${timeRemaining / MAX_TIME * 100}%`}} aria-valuenow={timeRemaining / MAX_TIME * 100} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className='col md-4'></div>
                    </div>
                    <button className='btn btn-lg btn-secondary mt-4' onClick={goBackToSelectionMenu}>Cancel</button>
                    </>
                }
                { started && timeRemaining >= 0 && APIData === null && !hasToPressButton &&
                    <>
                    <p className='text-big'>Trying to connect to your HUE bridge...</p>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <br />
                    <button className='btn btn-lg btn-secondary mt-4' onClick={goBackToSelectionMenu}>Cancel</button>
                    </>
                }
                { started && timeRemaining <= 0 && APIData === null &&
                    <>
                    <p className='text-big'>The link button was not pressed in time.</p>
                    <button className='btn btn-lg btn-danger mt-4' onClick={goBackToSelectionMenu}>Go back</button>
                    </>
                }
                { started && APIData !== null &&
                    <>
                    <p className='text-big'>The HUE bridge successfully connected.</p>
                    <button className='btn btn-primary mt-4' onClick={handleApproveBridge}>Next</button>
                    </>
                }
            </div>
        </div>
    )
}

export default BridgeConnectionProcess