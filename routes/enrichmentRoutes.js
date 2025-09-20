import express from 'express';
import { enrichFile } from '../controllers/enrichmentController.js';

const router = express.Router();

router.get('/enrich/file/:hash', enrichFile);

export default router;
