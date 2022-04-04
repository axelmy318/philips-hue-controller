import { combineReducers } from 'redux'
import MainReducer from './MainReducer'

const reducers = combineReducers({
    Main: MainReducer,
})

export default reducers