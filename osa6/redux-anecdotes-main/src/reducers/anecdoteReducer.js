import { createSlice } from '@reduxjs/toolkit'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject);
const initialNotification = "";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote(state, action){
      state.map(x => {
        if(x.id === action.payload){
            x.votes += 1;
        }
        return x;
      });
    },
    addAnecdote(state, action){
      return [...state, {
        content: action.payload,
        id: getId(),
        votes: 0
      }]
    }
  }
});

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotification,
  reducers: {
    setNotification(state, action){
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
export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions;
export const { setNotification, removeNotification } = notificationSlice.actions;
export const { setFilter } = filterSlice.actions;
// export reducers
export const anecdoreReducer = anecdoteSlice.reducer;
export const notificationReducer = notificationSlice.reducer;
export const filterReducer = filterSlice.reducer;
