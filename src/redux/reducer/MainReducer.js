const initialState = {
    bridgesConnexions: {
        success: {

        }
    },
    bridges: []   
}

const MainReducer = (state = initialState, action) => {
    action = action.action ? action.action : action 
    let data

    switch(action.type) {
        case 'GET_BRIDGE_USERNAME_PENDING':
            return {...state}
        case 'GET_BRIDGE_USERNAME_FULFILLED':
            state.bridgesConnexions.success[action.payload.data.device.id] = {
                ...action.payload.data.device,
                ...action.payload.promise.data
            }
            return {...state}
        case 'GET_BRIDGE_USERNAME_REJECTED':
            return {...state}
        default:
            return {...state}
    }
}

export default MainReducer