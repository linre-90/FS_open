import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes);
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    // Vote dispatch
    const vote = (id) => {
        dispatch(voteAnecdote(id));
        dispatch(setNotification("You voted '" + anecdotes.filter(x => x.id === id)[0].content+ "'") );
    };

    const filteredAnecdotes = anecdotes.map(a => a)
      .sort((a, b) => b.votes - a.votes)
      .filter(x => x.content.toLowerCase().includes(filter.toLowerCase()));

    return(
        <div>
        {
            filteredAnecdotes.map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
              </div>
            )
        }
        </div>
    )
}


export default AnecdoteList; 