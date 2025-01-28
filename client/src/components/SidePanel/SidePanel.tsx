import { useState } from 'react'
import ReactDOM from 'react-dom'
import UserForm from '../Forms/UserForm'
import { addUser, signOutUser } from '../../api/userApi'
interface SidePanelProps {
    isOpen: boolean
    isAdmin: boolean
    onClose: () => void
}

export const SidePanel : React.FC<SidePanelProps> = ({isOpen, isAdmin}) =>
{
    const [creatingUser, setCreatingUser] = useState(false)
    if(!isOpen) return null;

    const postUser = async (name: string, surname: string, login: string, password: string, isMaster: boolean, isAdmin : boolean) => {
        await addUser(name, surname, login, password, isMaster, isAdmin)
        setCreatingUser(false)
    }

    const cancelCreating = () => setCreatingUser(false)
    
    return ReactDOM.createPortal(
        <>
        <div className='sidepanel-background'>
        {creatingUser ? (<UserForm onSubmit={postUser} onCancel={cancelCreating}/>) : (
        <>
        {isAdmin ? (<button type='button' onClick={() => setCreatingUser(true)} >Stwórz konto</button>) : null}
        <button type='button' onClick={signOutUser}>Wyloguj</button>
        </>
        )}
        </div>
        </>
        , document.body)
}
