import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return (
    <>
    { props.notification.length > 0 && 
      <div style={style}>
        {props.notification}
      </div>
    }
  </>
  )
}

// Old way 
const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

// old way 
const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification