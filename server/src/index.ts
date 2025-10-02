import express from 'express';
import cors from 'cors';
import tripRoutes from './routes/tripRoute';
import userRoutes from './routes/userRoute';

const app = express();
const PORT = 5000;

//TODO allowedOrigins for production
app.use(cors());
app.use(express.json());
app.use('/api', tripRoutes);
app.use('/api', userRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});