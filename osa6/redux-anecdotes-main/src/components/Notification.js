import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from "../reducers/anecdoteReducer";


const Notification = () => {
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  useEffect(() => {
    if(notification.length > 0){
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000)
    }
  }, [notification, dispatch]);

  return (
    <>
    { notification.length > 0 && 
      <div style={style}>
        {notification}
      </div>
    }
  </>
  )
}

export default Notification