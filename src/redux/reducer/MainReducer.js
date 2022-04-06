import { ipcRenderer } from "electron"
import { Status } from "../../classes/Status"

const initialState = {
    loadedFromLocalStorage: false,
    bridgesConnexions: {
        success: {},
        errors: {},
        pending: {
            isLoaded: Status.None, 
            content: {}
        }
    },
    bridges: {},
}

const MainReducer = (state = initialState, action) => {
    action = action.action ? action.action : action 
    let data, bridge, id

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

            state.bridges[bridge.id] = {...bridge, customName: action.payload.name, validConnection: true}
              
            ipcRenderer.invoke('SAVE_TO_STORAGE', {
                key: 'main',
                data: state.bridges
            })

            return {...state}
        case 'LOAD_MAIN_FROM_STORAGE':
            state.loadedFromLocalStorage = true
            
            state.bridges = action.payload.data
            
            Object.keys(state.bridges).map((id) => {
                state.bridges[id].validConnection = Status.None
                state.bridges[id].lightsLoaded = Status.None
                state.bridges[id].lights = {}
            })
            
            return {...state}
        case 'VALIDATE_BRIDGE_CONNECTION_PENDING':
            id = action.payload.device.id
            if(state.bridges[id])
                state.bridges[id].validConnection = Status.Pending
            
            return {...state}
        case 'VALIDATE_BRIDGE_CONNECTION_FULFILLED':
            id = action.payload.data.device.id
            if(state.bridges[id]){
                let previousState = state.bridges[id]
                state.bridges[id] = {
                    ...previousState,
                    ...action.payload.promise.data,
                    validConnection: Status.Fulfilled,
                }
            }
            
            return {...state}
        case 'VALIDATE_BRIDGE_CONNECTION_REJECTED':
            id = action.payload.data.device.id
            if(state.bridges[id])
                state.bridges[id].validConnection = Status.Rejected
            
            return {...state}
        case 'LOAD_LIGHTS_FOR_BRIDGE_PENDING':
            id = action.payload.device.id
            if(state.bridges[id])
                state.bridges[id].loadLights = Status.Pending

            return {...state}
        case 'LOAD_LIGHTS_FOR_BRIDGE_FULFILLED':
            id = action.payload.data.device.id
            if(state.bridges[id]){
                state.bridges[id].lightsLoaded = Status.Fulfilled
                state.bridges[id].lights = action.payload.promise.data
            }

            return {...state}
        case 'LOAD_LIGHTS_FOR_BRIDGE_REJECTED':
            id = action.payload.data.device.id
            if(state.bridges[id])
                state.bridges[id].loadLights = Status.Rejected

            return {...state}
        case 'SCAN_NETWORK_FOR_BRIDGES_PENDING':
            state.bridgesConnexions.pending.isLoaded = Status.Pending
            state.bridgesConnexions.pending.content = {}

            return {...state}
        case 'SCAN_NETWORK_FOR_BRIDGES_FULFILLED':
            state.bridgesConnexions.pending.isLoaded = Status.Fulfilled

             action.payload.promise.data.map((bridge) => {
                if(!state.bridges[bridge.id])
                    state.bridgesConnexions.pending.content[bridge.id] = bridge
             })

            return {...state}
        case 'SCAN_NETWORK_FOR_BRIDGES_REJECTED':
            state.bridgesConnexions.pending.isLoaded = Status.Rejected

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