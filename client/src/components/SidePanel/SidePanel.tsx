import { useState } from 'react'
import ReactDOM from 'react-dom'
import UserForm from '../Forms/UserForm'
import { addUser, signOutUser } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
import ErrorPanel from '../Error/ErrorPanel'
import '../../styles/SidePanel/sidePanelStyles.css'
interface SidePanelProps {
    isOpen: boolean
    isAdmin: boolean
    onClick: () => void
}

// panel boczny - udostępnia kilka funkcji w zależności od funkcji użytkownika
export const SidePanel : React.FC<SidePanelProps> = ({isOpen, isAdmin, onClick}) =>
{
    const [creatingUser, setCreatingUser] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState<{status: number, message: string} | null>(null)
    if(!isOpen) return null;

    
    const postUser = async (name: string, surname: string, login: string, password: string, isMaster: boolean, isAdmin : boolean) => {
        const response = await addUser(name, surname, login, password, isMaster, isAdmin)
        if (response.status ===  201) {setCreatingUser(false)}
        else {setError({status: response.status, message: response.data.message || 'Unknown'})}        
    }

    const cancelCreating = () => setCreatingUser(false)

    const handleSignOut = async () => {
            const response = await signOutUser();
            if (response.status ===  200) {navigate('/')}
            else {setError({status: response.status, message: response.data.message || 'Unknown'})}   
    }
    
    return ReactDOM.createPortal(
        <>
        <div className='sidepanel-wrapper' onClick={() => onClick()}>
        <div className='sidepanel-background' onClick={(e) => e.stopPropagation()}>
        {creatingUser ? (<UserForm onSubmit={postUser} onCancel={cancelCreating}/>) : (
        <>
        {isAdmin ? (<button type='button' onClick={() => setCreatingUser(true)} >Stwórz konto</button>) : null}
        <button type='button' onClick={handleSignOut}>Wyloguj</button>
        </>
        )}
        </div>
        </div>
        {error && <ErrorPanel status={error.status} message={error.message} onClick={() => setError(null)}/>}
        </>
        , document.body)
}
