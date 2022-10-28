import { configureStore, combineReducers  } from '@reduxjs/toolkit'
import {anecdoreReducer, notificationReducer, filterReducer, setAnecdotes} from './reducers/anecdoteReducer';

const reducer = combineReducers({
    anecdotes: anecdoreReducer,
    notification: notificationReducer,
    filter: filterReducer
  })

const store = configureStore({
    reducer: reducer
});

export default store;