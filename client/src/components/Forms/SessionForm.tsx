interface SessionFormProps {
    onSubmit: (name: string) => void;
    onCancel: () => void;
  }
  
  //formularz dla tworzenia sesji
  const SessionForm: React.FC<SessionFormProps> = ({ onSubmit, onCancel }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("sessionName") as string;
      onSubmit(name);
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="session-form session-name-wrapper">
            <input
              type="text"
              id="sessionNameInput"
              name="sessionName"
              className="session-form session-input"
              placeholder="Podaj nazwę dla sesji:"
              required
            />
          </div>
          <button type="submit" className="session-form session-button submit">
            Stwórz kampanię
          </button>
          <button
            onClick={onCancel}
            type="button"
            className="session-form session-button cancel"
          >
            Anuluj
          </button>
        </form>
      </>
    );
  };
  
  export default SessionForm;
  