import api from "./api";

// pobieranie kampanii, w sesji użytkownika powinna być obecna informacja, dla jakiego DM je pobieramy
export const fetchCampaigns = async () => {
  try {
    const response = await api.get(`/campaigns`);
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else {
      return { status: 500, message: "Błąd serwera" };
    }
  }
};

//dodawanie kampaniii
export const addCampaign = async (
  name: string,
  system: string,
  playersNum: number
) => {
  try {
    const response = await api.post("/campaigns", {
      name: name,
      system: system,
      playersNum: playersNum,
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else {
      return { status: 500, message: "Błąd serwera" };
    }
  }
};

//funkcja, która ma ustawiać Id kampanii w sesji
export const setCampaignId = async (campaignID: number) => {
  try {
    const response = await api.post("/campaigns/changeCampaignID", {
      campaignID: campaignID,
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else {
      return { status: 500, message: "Błąd serwera" };
    }
  }
};

//funkcja tylko do poboru nazwy
export const getCampaignName = async () => {
  try {
    const response = await api.get("/campaigns/name");
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else {
      return { status: 500, message: "Błąd serwera" };
    }
  }
};
