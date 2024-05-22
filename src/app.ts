import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// app routes
app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default app;
