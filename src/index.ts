import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import linkRoutes from './routes/linkRoutes';
import MongoDB from './db';
MongoDB();
app.use(express.json());
app.use('/api', linkRoutes);



app.listen(3000);