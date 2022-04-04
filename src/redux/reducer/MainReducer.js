const initialState = {
    bridges: []   
}

const MainReducer = (state = initialState, action) => {
    action = action.action ? action.action : action 
    let data

    switch(action.type) {
        default:
            return {...state}
    }
}

export default MainReducer