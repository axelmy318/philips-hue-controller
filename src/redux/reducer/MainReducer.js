import { ipcRenderer } from "electron"

const initialState = {
    loadedFromLocalStorage: false,
    bridgesConnexions: {
        success: {},
        errors: {}
    },
    bridges: {} 
}

const MainReducer = (state = initialState, action) => {
    action = action.action ? action.action : action 
    let data, bridge

    switch(action.type) {
        case 'GET_BRIDGE_USERNAME_PENDING':
            return {...state}
        case 'GET_BRIDGE_USERNAME_FULFILLED':
            if(action.payload.promise.data) {
                if(action.payload.promise.data[0].error) {
                    delete state.bridgesConnexions.success[action.payload.data.device.id]

                    state.bridgesConnexions.errors[action.payload.data.device.id] = {
                        ...action.payload.data.device,
                        ...action.payload.promise.data[0].error
                    }
                } 
                else if (action.payload.promise.data[0].success) {
                    delete state.bridgesConnexions.errors[action.payload.data.device.id]

                    state.bridgesConnexions.success[action.payload.data.device.id] = {
                        ...action.payload.data.device,
                        ...action.payload.promise.data[0].success
                    }
                }
            }


            return {...state}
        case 'GET_BRIDGE_USERNAME_REJECTED':
            return {...state}
        case 'APPROVE_BRIDGE':
            bridge = state.bridgesConnexions.success[action.payload.id]
            delete state.bridgesConnexions.success[action.payload.id]

            state.bridges[bridge.id] = {...bridge, name: action.payload.name}
              
            ipcRenderer.invoke('SAVE_TO_STORAGE', {
                key: 'main',
                data: state.bridges
            })

            return {...state}
        case 'LOAD_MAIN_FROM_STORAGE':
            state.loadedFromLocalStorage = true
            state.bridges = action.payload.data
            return {...state}
        case 'EMPTY_BRIDGES':
            state.bridges = {}

            ipcRenderer.invoke('SAVE_TO_STORAGE', {
                key: 'main',
                data: state.bridges
            })

            return {...state}
        default:
            return {...state}
    }
}

export default MainReducer