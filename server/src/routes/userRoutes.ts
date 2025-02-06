import express from 'express';
import { addUser, getUser, googleLogin, loginUser, signOutUser } from '../controllers/userController';


const router = express.Router();

router.get('/getUser', getUser)
router.post('/login', loginUser)
router.post('/create', addUser)
router.post('/logout', signOutUser)
router.post('/googleLogin', googleLogin)

export default router;