import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state);
    const dispatch = useDispatch();

    // Vote dispatch
    const vote = (id) => {
        dispatch(voteAnecdote(id));
    };

    return(
        <div>
        {
            /* copy -> sort -> map to html */
            anecdotes.map(a => a).sort((a, b) => b.votes - a.votes).map(anecdote =>
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