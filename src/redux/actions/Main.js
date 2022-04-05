import axios from "axios"
import API from "../../classes/API"

export const getBridgeUsername = (IP, device, name) => {
    const endpoint = API.getUrl(IP, 'BRIDGE_CONNECTION')
    
    return {
        type: 'GET_BRIDGE_USERNAME',
        data: {
            promise: axios.post(`${endpoint}`, {devicetype: name}),
            device
        }
    }
}