class API {
    static getUrl = (ip, request) => {
        const URL = {
            BASE_URL: 'http://__IP__/api/',
            requests: []
        }

        //User
        URL.requests['BRIDGE_CONNECTION'] = ''

        return (URL.BASE_URL+URL.requests[request]).replace('__IP__', ip)
    }
}

export default API
