import axios from "axios"
import API from "../../classes/API"
const storage = require('electron-json-storage')

const headersJSON = {
    headers: {
        'Content-type': 'application/json'
    }
}

export const getBridgeUsername = (IP, device, name) => {
    const endpoint = API.getUrl(IP, 'BRIDGE_CONNECTION')
    
    return {
        type: 'GET_BRIDGE_USERNAME',
        payload: {
            promise: axios.post(`${endpoint}`, JSON.stringify({devicetype: name}), {headersJSON}),
            data: {device}
        }
    }
}

export const approveBridge = (device) => {
    return {
        type: 'APPROVE_BRIDGE',
        payload: {
            device,
            id: device.id
        }
    }
}

export const loadMainFromStorage = (data) => {
    return {
        type: 'LOAD_MAIN_FROM_STORAGE',
        payload: {
            data
        }
    }
}

export const emptyBridges = () => {
    return {
        type: 'EMPTY_BRIDGES',
        payload: {
            
        }
    }
}