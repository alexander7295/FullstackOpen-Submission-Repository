const Notification = ({ notification }) => {
    const { notificationStatus, notificationMessage } = notification

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

  if (notificationMessage === null) {
    return null
  }

  return (
    <div style={notificationStatus === 'success' ? successStyle : errorStyle}>
      {notificationMessage}
    </div>
  )
}

export default Notification