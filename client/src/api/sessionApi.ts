import api from "./api";

//pobieranie sesji
export const fetchSession = async () => {
  try {
    const response = await api.get(`/campaigns/sessions`);
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else {
      return { status: 500, message: "Błąd serwera" };
    }
  }
};

//dodawanie sesji
export const addSession = async (name: string) => {
  try {
    const response = await api.post("/campaigns/sessions/create", {
      name: name,
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

//aktualizacja notatek czy planu dla sesji
export const updateSessionData = async (plan: string, notes: string) => {
  try {
    const response = await api.put("/campaigns/sessions/updateData", {
      plan,
      notes,
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

//ustawianie id sesji w sesji użytkownika
export const setSessionID = async (sessionID: number) => {
  try {
    const response = await api.post("/campaigns/sessions/changeSessionID", {
      sessionID: sessionID,
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

//pobieranie danych o sesji (notatki i plan)
export const fetchSessionDetails = async () => {
  try {
    const response = await api.get(`/campaigns/sessions/details`);
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else {
      return { status: 500, message: "Błąd serwera" };
    }
  }
};

//funkcja do zamykania sesji
export const alockSession = async () => {
  try {
    const response = await api.patch("/campaigns/sessions/locksession");
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else {
      return { status: 500, message: "Błąd serwera" };
    }
  }
};
