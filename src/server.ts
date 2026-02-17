import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import handlers from "./lib/handlers";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

const app: any = express();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes will be mounted here

app.use(handlers.Error404Handler);

app.use(handlers.errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
