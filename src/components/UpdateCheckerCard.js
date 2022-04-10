import React, { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { useDispatch, useSelector } from 'react-redux'
import { Status } from '../classes/Status'
import { setUpdateSatus } from '../redux/actions/Update'

const UpdateCheckerCard = () => {
    const UpdateStatus = {
        NONE: 0,
        CHECKING_FOR_UPDATE: 1,
        UPDATE_DOWNLOADED: 2,
        DOWNLOADING_UPDATE: 3,
        READY_TO_INSTALL: 4,
        TRYING_TO_DOWNLOAD_APP: 5,
        NO_UPDATES: 6
    }
    const [ status, setStatus ] = useState(UpdateStatus.NONE)
    const [ version, setVersion ] = useState(null)

    const update = useSelector(RED => RED.Update)
    const dispatch = useDispatch()
    
    const checkForUpdates = () => {
        ipcRenderer.send('CHECK_FOR_UPDATES')
    }

    const restartApp = () => {
        ipcRenderer.send('RESTART_AND_INSTALL_UPDATE')
    }

    if(version === null) {
        ipcRenderer.invoke('GET_APP_VERSION', {}).then((response) => setVersion(response))
    }

    const resetStatus = () => {
        dispatch(setUpdateSatus('RESET_UPDATE_STATUS', {}))
    }

    const getUpdateStatusText = () => {
        if(update.checkedForUpdate === Status.None){
            return UpdateStatus.NONE
        }

        if(update.checkedForUpdate === Status.Pending){
            return UpdateStatus.CHECKING_FOR_UPDATE
        }

        if(update.checkedForUpdate === Status.Fulfilled) {
            if(update.updateAvailable) {
                if(update.updateDownloaded){
                    return UpdateStatus.READY_TO_INSTALL
                }
                else if(update.updateDownloadProgress === null){
                    return UpdateStatus.TRYING_TO_DOWNLOAD_APP
                }
                else {
                    return UpdateStatus.DOWNLOADING_UPDATE
                }
            }
            else if(!update.updateAvailable) {
                return UpdateStatus.NO_UPDATES
            }
        }

        return UpdateStatus.NONE
    }

    useEffect(() => {
        setStatus(getUpdateStatusText())
    }, [update])

    return (
        <div className="card border-secondary mb-3" style={{maxWidth: "18rem"}}>
            { status === UpdateStatus.NONE && <>
                <div className="card-header">Updates</div>
                <div className="card-body text-secondary">
                    <h5 className="card-title">Current version: {version}</h5>
                    <button className='btn btn-outline-warning' onClick={checkForUpdates}>Check for update</button>
                </div>
            </>}

            { status === UpdateStatus.CHECKING_FOR_UPDATE && <>
                <div className="card-header">Updates</div>
                <div className="card-body text-secondary">
                    <h5 className="card-title">Checking for update</h5>
                </div>
            </>}

            { status === UpdateStatus.NO_UPDATES && <>
                <div className="card-header">Updates</div>
                <div className="card-body text-secondary">
                    <h5 className="card-title">The app is up to date</h5>
                    <button className='btn btn-outline-secondary' onClick={resetStatus}>Ok</button>
                </div>
            </>}

            { status === UpdateStatus.TRYING_TO_DOWNLOAD_APP && <>
                <div className="card-header">Updates</div>
                <div className="card-body text-secondary">
                    <h5 className="card-title">Contacting server...</h5>
                </div>
            </>}

            { status === UpdateStatus.DOWNLOADING_UPDATE && <>
                <div className="card-header">Updates</div>
                    <div className="card-body text-secondary">
                    <h5 className="card-title">Downloading... {Math.floor(update.updateDownloadProgress.percent)}%</h5>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{width: `${Math.floor(update.updateDownloadProgress.percent)}%`}} aria-valuenow={Math.floor(update.updateDownloadProgress.percent)} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    </div>
            </>}

            { status === UpdateStatus.READY_TO_INSTALL && <>
                <div className="card-header">Updates</div>
                <div className="card-body text-secondary">
                    <h5 className="card-title">Ready to install</h5>
                    <button className='btn btn-outline-primary' onClick={restartApp}>Restart</button>
                </div>
            </>}
        </div>
    )
}

export default UpdateCheckerCard