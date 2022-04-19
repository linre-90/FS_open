const Notification = ({ message, isError }) => {
    const styleBase = {
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    };

    const styleError = {
        color: "red",
    };
    const styleSuccess = {
        color: "green",
    };

    if (message === null) {
        return null;
    }

    return (
        <>
            {isError ? (
                <div style={{ ...styleBase, ...styleError }}>{message}</div>
            ) : (
                <div style={{ ...styleBase, ...styleSuccess }}>{message}</div>
            )}
        </>
    );
};

export default Notification;
