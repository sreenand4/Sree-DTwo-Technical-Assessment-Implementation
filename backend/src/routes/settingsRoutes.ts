import { Router } from 'express';
import {
    createSetting,
    getSettings,
    getSettingByKey,
    updateSetting,
    deleteSetting
} from '../controllers/settingsController';

const router = Router();

// Create (POST /settings)
router.post('/', createSetting);

// Read All (GET /settings)
router.get('/', getSettings);

// Read One (GET /settings/:id)
router.get('/:id', getSettingByKey);

// Update (PUT /settings/:id)
router.put('/:id', updateSetting);

// Delete (DELETE /settings/:id)
router.delete('/:id', deleteSetting);

export default router;
