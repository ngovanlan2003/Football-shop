import { combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import adminReducers from "./adminReducers";
import userReducers from "./userReducers";
import productReducers from './productReducers'
import orderReducers from './orderReducers'

const rootReducers = combineReducers({
    admin: adminReducers,
    users: userReducers,
    product: productReducers,
    order: orderReducers
})

export const store = createStore(rootReducers, applyMiddleware(thunk))

