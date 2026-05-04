import express from 'express';
import { getAllJobs, createJobs } from '../controller/jobController.js';
const router = express.Router();

router.get("/getJobs",getAllJobs);

router.post("/addJob",createJobs);

export default router;