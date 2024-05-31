const MessagePopup = (props) => {

    const style ='position: absolute;top: 50; left: 50%;transform: translate(-50%, -50%);'
    return (
        <div style={style}>
            <h1>{props.statusCode}</h1>
            <br></br>
            <h2>{props.message}</h2>
        </div>
    )
}
export default MessagePopup;