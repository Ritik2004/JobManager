import express from 'express';
import { getAllJobs, createJobs, updateJob, deleteJob } from '../controller/jobController.js';
const router = express.Router();

router.get("/getJobs",getAllJobs);

router.post("/addJob",createJobs);

router.put("/updateJob/:id", updateJob);

router.delete("/deleteJob/:id", deleteJob);

export default router;