import { Status } from '../../classes/Status'

const initialState = {
    checkedForUpdate: Status.None,
    updateAvailable: false,
    updateDownloadProgress: null,
    updateDownloaded: false,
    error: null,
}

const UpdateReducer = (state = initialState, action) => {
    action = action.action ? action.action : action 
    let data, bridge, id, lightId

    switch(action.type) {
        case 'CHECKING_FOR_UPDATE':
            return {
                ...state,
                checkedForUpdate: Status.Pending,
            }
        case 'UPDATE_AVAILABLE':
            return {
                ...state,
                checkedForUpdate: Status.Fulfilled,
                updateAvailable: true,
            }
        case 'UPDATE_NOT_AVAILABLE':
            return {
                ...state,
                checkedForUpdate: Status.Fulfilled,
                updateAvailable: false
            }
        case 'UPDATE_DOWNLOADING':
            return {
                ...state,
                updateDownloadProgress: action.payload.data.progress
            }
        case 'UPDATE_DOWNLOADED':
            return {
                ...state,
                updateDownloaded: true
            }
        case 'ERROR':
            return {
                ...state,
                error: action.payload.data.error
            }
        default:
            return {...state}
    }
}

export default UpdateReducer