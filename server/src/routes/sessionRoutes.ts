import express from 'express';
import { addSession, changeSessionID, getSessions, getSessionsDetails, lockSession, updateSessionData } from '../controllers/sessionController';
const router = express.Router();

router.get('/', getSessions)
router.get('/details', getSessionsDetails)
router.post('/create', addSession)
router.post('/changeSessionID', changeSessionID)
router.put('/updateData', updateSessionData)
router.patch('/lockSession', lockSession)

export default router;