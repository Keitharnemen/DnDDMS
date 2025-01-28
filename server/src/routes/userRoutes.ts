import express from 'express';
import { addUser, getUser, loginUser, signOutUser } from '../controllers/userController';
const router = express.Router();

router.get('/getUser', getUser)
router.post('/login', loginUser)
router.post('/create', addUser)
router.post('/logout', signOutUser)

export default router;