import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
//import rootReducer from './rootReducer'
import todoListReducer from './todoList/todoListReducer'

const store = createStore(todoListReducer)

export default store