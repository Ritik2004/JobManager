import dotenv from 'dotenv';
import express from 'express'
import jobroute from './routes/jobroute.js';
import aiRoute from './routes/aiRoutes.js';
import cors from 'cors';
import connectDB from './connection.js'

dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
connectDB();
app.use("/api/jobs",jobroute);
app.use("/api/ai",aiRoute);

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})