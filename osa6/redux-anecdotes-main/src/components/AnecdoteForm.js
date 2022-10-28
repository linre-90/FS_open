import { useDispatch } from 'react-redux'
import {addAnecdote} from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    // Dispatch new anecdote
    const addNewAnecdote = (event) => {
        event.preventDefault();
        const newContent = event.target.newAnecdote.value;
        event.target.newAnecdote.value = "";
        dispatch(addAnecdote(newContent));
        dispatch(setNotification("You created '" + newContent + "'"));
    }
return (
    <>
    <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div><input name='newAnecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>


)


}

export default AnecdoteForm;