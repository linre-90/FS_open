import { connect } from 'react-redux'
import { createAnecdote, setNotificationWithTimer } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch();

  /*
  // Dispatch new anecdote with hook
  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const newContent = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";
    dispatch(createAnecdote(newContent));
    dispatch(setNotificationWithTimer("You created '" + newContent + "'", 5));
  }*/
  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const newContent = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";
    props.createAnecdote(newContent);
    props.setNotificationWithTimer("You created '" + newContent + "'", 5);
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
  createAnecdote,
  setNotificationWithTimer
}

const connectAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
export default connectAnecdoteForm;