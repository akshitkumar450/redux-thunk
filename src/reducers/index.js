import { combineReducers } from 'redux'
import Postreducers from './Postreducers'
import UserReducer from './UserReducer'

export default combineReducers({
    posts: Postreducers,
    users: UserReducer
})