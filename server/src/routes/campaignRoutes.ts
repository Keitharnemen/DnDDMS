import express from 'express';
import { getCampaigns, addCampaigns, changeCampaignID, getCampaignName, addCharacter, getCharacters, updateCharacter, getClasses, getRaces } from '../controllers/campaignController';
const router = express.Router();

router.get('/', getCampaigns)
router.get('/name', getCampaignName)
router.post('/', addCampaigns)
router.post('/changeCampaignID', changeCampaignID)
router.get('/characters', getCharacters)
router.put('/character', updateCharacter)
router.post('/characters', addCharacter)
router.get('/races', getRaces)
router.get('/classes', getClasses)

export default router;