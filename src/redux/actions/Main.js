import axios from "axios"
import API from "../../classes/API"

export const getBridgeUsername = (IP, device, name) => {
    const endpoint = API.getUrl(IP, 'BRIDGE_CONNECTION')
    
    return {
        type: 'GET_BRIDGE_USERNAME',
        payload: {
            promise: axios.post(`${endpoint}`, {devicetype: name}),
            data: {device}
        }
    }
}

export const getBridgeUsernameFake = (IP, device, name) => {
    const endpoint = API.getUrl(IP, 'BRIDGE_CONNECTION')
    
    return {
        type: 'GET_BRIDGE_USERNAME_FULFILLED',
        payload: {
            promise: {data: [{username: 'dwadwadwadawd'}]},
            data: {device}
        }
    }
}