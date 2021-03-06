import axios from "axios"
import API from "../../classes/API"
const storage = require('electron-json-storage')

const headersJSON = {
    headers: {
        'Content-type': 'application/json'
    }
}

export const getBridgeUsername = (device, name) => {
    const endpoint = API.getUrl(device, 'BRIDGE_CONNECTION')
    
    return {
        type: 'GET_BRIDGE_USERNAME',
        payload: {
            promise: axios.post(`${endpoint}`, JSON.stringify({devicetype: name}), {headersJSON}),
            data: {device}
        }
    }
}

export const switchLightState = (device, light, newState) => {
    const endpoint = API.getUrl({...device, lightId: light.id}, 'CHANGE_LIGHT_STATE')
    console.log('device', device)
    console.log('light', light)
    return {
        type: 'CHANGE_LIGHT_STATE',
        payload: {
            promise: axios.put(`${endpoint}`, JSON.stringify(newState), {headersJSON}),
            data: {
                device,
                light,
                newState
            }
        }
    }
}

export const removeBridge = device => {
    return {
        type: 'REMOVE_BRIDGE',
        payload: {
            data: {
                device
            }
        }
    }
}

export const scanNetworkForBridges = () => {
    return {
        type: 'SCAN_NETWORK_FOR_BRIDGES',
        payload: {
            promise: axios.get(`https://discovery.meethue.com`) 
        }
    }
}

export const validateBridgeConnection = device => {
    const endpoint = API.getUrl(device, 'LOAD_BRIDGE_DATA')

    return {
        type: 'VALIDATE_BRIDGE_CONNECTION',
        payload: {
            promise: axios.get(`${endpoint}`),
            data: {
                device
            }
        }
    }
}

export const loadLightsForBridge = device => {
    const endpoint = API.getUrl(device, 'LOAD_LIGHTS_FOR_BRIDGE')

    return {
        type: 'LOAD_LIGHTS_FOR_BRIDGE',
        payload: {
            promise: axios.get(`${endpoint}`),
            data: {
                device
            }
        }
    }
}

export const approveBridge = (device, name) => {
    return {
        type: 'APPROVE_BRIDGE',
        payload: {
            device,
            id: device.id,
            name
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