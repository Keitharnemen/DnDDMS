interface CampaignFormProps {
    onSubmit: (name: string, system: string, playersNum: number) => void;
    onCancel: () => void;
  }
  
  // formularz dla kampanii
  const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, onCancel }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("campaignNameInput") as string;
      const system = formData.get("campainSystemInput") as string;
      const playersNum = Number(formData.get("campaignPlayernumInput") as string);
      onSubmit(name, system, playersNum);
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="campaign-form campaign-name-wrapper">
            <input
              type="text"
              name="campaignNameInput"
              id="campaignNameInput"
              className="campaign-form campaign-input"
              placeholder="Podaj nazwę dla kampanii:"
              required
            />
          </div>
  
          <select
            name="campainSystemInput"
            id="campainSystemInput"
            className="campaign-form campaign-input"
            required
          >
            <option value="" disabled>
              Wybierz system
            </option>
            <option value="DnD">Dungeons & Dragons</option>
            <option value="W40k">Warhammer</option>
            <option value="Lovecraft">Zew Cthulhu</option>
          </select>
  
          <div className="campaign-form campaign-playernum-wrapper">
            <input
              type="number"
              name="campaignPlayernumInput"
              id="campaignPlayernumInput"
              className="campaign-form campaign-input"
              min={0}
              placeholder="Podaj liczbę graczy:"
              required
            />
          </div>
          <button type="submit" className="campaign-form campaign-button submit">
            Stwórz kampanię
          </button>
          <button
            onClick={onCancel}
            type="button"
            className="campaign-form campaign-button cancel"
          >
            Anuluj
          </button>
        </form>
      </>
    );
  };
  
  export default CampaignForm;
  