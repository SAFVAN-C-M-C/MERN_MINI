import {createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import userReducer from './Reducer/userReducer'
import adminReducer from './Reducer/adminReduceer'


const rootReducer = combineReducers({
    user: userReducer,
    users: adminReducer,
})
const store = createStore(rootReducer,{},applyMiddleware(thunk))

export default store;
