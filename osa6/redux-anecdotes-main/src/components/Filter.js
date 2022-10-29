import { connect } from "react-redux";
import { setFilter } from "../reducers/anecdoteReducer";


const Filter = (props) => {
  // New way with hooks
  //const dispatch = useDispatch();

  const handleChange = (event) => {
    // new way with hooks
    //dispatch(setFilter(event.target.value));
    props.setFilter(event.target.value);
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default ConnectedFilter