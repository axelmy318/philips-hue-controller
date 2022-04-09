import { combineReducers } from 'redux'
import MainReducer from './MainReducer'
import UpdateReducer from './UpdateReducer'

const reducers = combineReducers({
    Main: MainReducer,
    Update: UpdateReducer,
})

export default reducers