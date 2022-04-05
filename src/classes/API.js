class API {
    static getUrl = (ip, request) => {
        const URL = {
            BASE_URL: 'https://__IP__/api/',
            requests: []
        }

        //User
        URL.requests['BRIDGE_CONNECTION'] = ''

        console.log((URL.BASE_URL+URL.requests[request]).replace('__IP__', ip))

        return (URL.BASE_URL+URL.requests[request]).replace('__IP__', ip)
    }
}

export default API
