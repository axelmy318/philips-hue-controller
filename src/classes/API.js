class API {
    static getUrl = (device, request) => {
        const URL = {
            BASE_URL: 'http://__IP__/api/',
            requests: []
        }

        //User
        URL.requests['BRIDGE_CONNECTION'] = ''
        URL.requests['VALIDATE_BRIDGE_CONNECTION'] = '0/config'
        URL.requests['LOAD_BRIDGE_DATA'] = '__USERNAME__'
        URL.requests['LOAD_LIGHTS_FOR_BRIDGE'] = '__USERNAME__/lights'
        URL.requests['CHANGE_LIGHT_STATE'] = '__USERNAME__/lights/__LIGHT_ID__/state'

        return (URL.BASE_URL+URL.requests[request])
                    .replace('__IP__', device.internalipaddress)
                    .replace('__USERNAME__', device.username ? device.username : '__USERNAME__')
                    .replace('__LIGHT_ID__', device.lightId ? device.lightId : '__LIGHT_ID__')
    }
}

export default API
