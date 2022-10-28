import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes";


const initialNotification = "";

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(anecdote));
  }
}

export const voteAnecdoteAsync = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.updateAnecdote(content);
    dispatch(voteAnecdote(anecdote));
  }
}

export const setNotificationWithTimer = (content, time) => {
  return async dispatch => {
    dispatch(setNotification(content));
    setTimeout(() => {dispatch(removeNotification())}, time * 1000);
  }
}


const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action){
      state.map(x => {
        if(x.id === action.payload.id){
            x.votes += 1;
        }
        return x;
        
      });
      return state;
    },
    addAnecdote(state, action){
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  }
});

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotification,
  reducers: {
    setNotification(state, action){
      console.log(action);
      return action.payload;
    },
    removeNotification(state){
      return "";
    }
  }
});

const filterSlice = createSlice({
  name: "filter",
  initialState: initialNotification,
  reducers: {
    setFilter(state, action){
      return action.payload;
    },
  }
});

// export actions
export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions;
export const { setNotification, removeNotification } = notificationSlice.actions;
export const { setFilter } = filterSlice.actions;
// export reducers
export const anecdoreReducer = anecdoteSlice.reducer;
export const notificationReducer = notificationSlice.reducer;
export const filterReducer = filterSlice.reducer;
