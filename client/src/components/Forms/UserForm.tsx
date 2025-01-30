interface UserFormProps {
    onSubmit: (
      name: string,
      surname: string,
      login: string,
      password: string,
      isMaster: boolean,
      isAdmin: boolean
    ) => void;
    onCancel: () => void;
  }
  
  // formularz do tworzenia użytkownika
  const UserForm: React.FC<UserFormProps> = ({ onSubmit, onCancel }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("userName") as string;
      const surname = formData.get("userSurname") as string;
      const login = formData.get("userLogin") as string;
      const password = formData.get("userPassword") as string;
      const isMaster =
        (formData.get("userIsMaster") as string) === "true" ? true : false;
      const isAdmin =
        (formData.get("userIsAdmin") as string) === "true" ? true : false;
  
      onSubmit(name, surname, login, password, isMaster, isAdmin);
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="user-form user-name-wrapper">
            <label htmlFor="userName" className="user-form user-label">
              Imię;
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="user-form user-input"
              placeholder="Podaj Imię"
              required
            />
          </div>
  
          <div className="user-form user-surname-wrapper">
            <label htmlFor="userName" className="user-form user-label">
              Nazwisko:
            </label>
            <input
              type="text"
              id="userSurname"
              name="userSurname"
              className="user-form user-input"
              placeholder="Podaj nazwisko"
              required
            />
          </div>
  
          <div className="user-form user-login-wrapper">
            <label htmlFor="userName" className="user-form user-label">
              Login:
            </label>
            <input
              type="text"
              id="userLogin"
              name="userLogin"
              className="user-form user-input"
              placeholder="Podaj login"
              required
            />
          </div>
  
          <div className="user-form user-password-wrapper">
            <label htmlFor="userName" className="user-form user-label">
              Hasło:
            </label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="user-form user-input"
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Hasło musi zawierać przynajmniej 8 znaków, małą literę, wielką literę, cyfrę i znak specjalny."
              placeholder="Podaj hasło"
              required
            />
          </div>
  
          <div className="user-form user-isMaster-wrapper">
            <label htmlFor="userName" className="user-form user-label">
              Master:
            </label>
            <input
              type="checkbox"
              id="userIsMaster"
              name="userIsMaster"
              value={"true"}
              className="user-form user-input"
            />
          </div>
  
          <div className="user-form user-isAdmin-wrapper">
            <label htmlFor="userName" className="user-form user-label">
              Admin:
            </label>
            <input
              type="checkbox"
              id="userIsAdmin"
              name="userIsAdmin"
              value={"true"}
              className="user-form user-input"
            />
          </div>
  
          <button type="submit" className="user-form user-button submit">
            Stwórz sesję
          </button>
          <button
            onClick={onCancel}
            type="button"
            className="user-form user-button cancel"
          >
            Anuluj
          </button>
        </form>
      </>
    );
  };
  
  export default UserForm;
  