import { combineReducers } from 'redux'
import GraphReducer from './reducer_graph'


const rootReducer = combineReducers({
    graphReducer: GraphReducer
})

export default rootReducer
