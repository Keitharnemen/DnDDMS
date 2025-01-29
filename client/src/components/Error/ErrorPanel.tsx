import '../../styles/Error/styles.css'
interface ErrorPanelProps {
    status: number,
    message: string,
    onClick: () => void
}
const ErrorPanel :React.FC<ErrorPanelProps> = ({status, message, onClick}) => {
    return (
        <div className="error-message-wrapper">
            <h3>Błąd {status}</h3>
            <p>{message}</p>
            <button className='close-button' onClick={onClick}>Zamknij</button>
        </div>
    )
}

export default ErrorPanel