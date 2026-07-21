import { Router } from 'express';
import { convert } from '../controllers/convert.controller.js';

const router = Router();

router.post('/', convert);

export default router;