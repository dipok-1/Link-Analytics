import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import linkRoutes from './routes/linkRoutes';
import LinkAnalyticRouter from './routes/linkAnalytics';
import MongoDB from './db';
import cors from 'cors'
MongoDB();
app.use(cors({
    origin:'http://localhost:5173'
}))
app.use(express.json());
app.use('/LA', linkRoutes);
app.use('/analytics',LinkAnalyticRouter)


app.listen(3000);