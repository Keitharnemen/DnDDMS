import mongoose from "mongoose";
import { campaignModel } from "./src/dbschemas/campaigns"; // Załaduj model kampanii

const MONGO_URI = "mongodb://mongo:27017/mydatabase"; // Ustawienie URI bazy danych

// Funkcja seedująca dane
const seedData = async () => {
  try {
    // Połącz się z MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Połączono z MongoDB");

    // Przykładowe dane do dodania
    const campaigns = [
      {
        id: 1,
        name: "Kampania A",
        system: "System A",
        campaignNum: 1001,
        masterId: 123,
        usersId: [1, 2, 3],
      },
      {
        id: 2,
        name: "Kampania B",
        system: "System B",
        campaignNum: 1002,
        masterId: 123,
        usersId: [4, 5],
      },
      {
        id: 3,
        name: "Kampania C",
        system: "System C",
        campaignNum: 1003,
        masterId: 123,
        usersId: [6, 7],
      },
    ];

    // Dodaj dane do kolekcji campaigns
    await campaignModel.insertMany(campaigns);
    console.log("Dane zostały dodane do bazy!");

    // Zakończ połączenie z bazą
    mongoose.connection.close();
  } catch (error) {
    console.error("Błąd podczas seedowania danych:", error);
    mongoose.connection.close();
  }
};

// Uruchomienie funkcji
seedData();
