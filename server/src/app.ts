import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import campaignRoutes from './routes/campaignRoutes'
import sessionRoutes from './routes/sessionRoutes'
import session from 'express-session'
import cors from 'cors'
import userRoutes from './routes/userRoutes';

declare module "express-session" {
  interface SessionData {
    DMID: number;
    campaignID : number;
    sessionID : number
  }
}

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/mydatabase';

const app = express()
app.use(cors());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use(session({
  secret: 'mysecretkey', // Zmienna do szyfrowania
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  if (!req.session.DMID) {
    req.session.DMID = 123;  // Ustawiamy stałą wartość DMID na 123
  }
  next();  // Kontynuujemy przetwarzanie zapytania
});

app.use(express.json());

app.use('/users', userRoutes)
app.use('/campaigns', campaignRoutes);
app.use('/campaigns/sessions', sessionRoutes);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));