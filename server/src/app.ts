import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import campaignRoutes from "./routes/campaignRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import session from "express-session";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { seedData } from "./utils/seed";
import { getNextId } from "./utils/idGenerator";

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/mydatabase";

declare module "express-session" {
  interface SessionData {
    DMID: number;
    campaignID: number;
    sessionID: number;
  }
}

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Zmienna zależna od Twojej aplikacji frontendowej
    credentials: true, // Umożliwia przesyłanie ciasteczek
  })
);
app.use(
  session({
    secret: "mysecretkey", // Klucz używany do podpisywania ciasteczek sesyjnych
    resave: false, // Nie zapisuj sesji, jeśli nie była zmieniana
    saveUninitialized: false, // Nie zapisuj pustych sesji
    cookie: {
      secure: false, // Wartość `false` w przypadku pracy na HTTP (ustaw na `true` w przypadku HTTPS)
      httpOnly: true, // Ochrona przed dostępem z poziomu JavaScript w przeglądarce
      maxAge: 3600000, // Czas życia ciasteczka (1 godzina)
    },
  })
);
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(async () => {
    console.log("MongoDB connected successfully!");

    await seedData();
    await getNextId("users");

    app.use("/users", userRoutes);
    app.use("/campaigns", campaignRoutes);
    app.use("/campaigns/sessions", sessionRoutes);

    const port = 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.log("MongoDB connection error:", err));
