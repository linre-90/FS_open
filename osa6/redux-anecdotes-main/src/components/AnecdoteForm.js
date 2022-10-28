import { useDispatch } from 'react-redux'
import { createAnecdote, setNotificationWithTimer } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    // Dispatch new anecdote
    const addNewAnecdote = async (event) => {
        event.preventDefault();
        const newContent = event.target.newAnecdote.value;
        event.target.newAnecdote.value = "";
        dispatch(createAnecdote(newContent));
        dispatch(setNotificationWithTimer("You created '" + newContent + "'", 5));
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