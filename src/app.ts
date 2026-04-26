import cors from 'cors';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import rateLimit from 'express-rate-limit';
import * as timeout from 'express-timeout-handler';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router_v1 from './routes/v1';
import router_v2 from './routes/v2';
import { Morgan } from './shared/morgen';
import config from './config';

const app = express();

// timeout handler
app.use(
  timeout.handler({
    timeout: 10000, // 10 seconds
    onTimeout: (req: Request, res: Response) => {
      res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        message: 'Service timeout. The server took too long to respond.',
      });
    },
  }),
);

// rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // max 100 requests
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});

// Apply the rate limiter to all API routes
app.use('/api/', limiter);

//morgan
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

//body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//file retrieve
app.use(express.static('uploads'));

//router
app.use('/api/v1', router_v1);
app.use('/api/v2', router_v2);

//live response
app.get('/', (req: Request, res: Response) => {
  const date = new Date(Date.now());
  res.send(
    `<h1 style="text-align:center; color:#173616; font-family:Verdana;">Beep-beep! The ${config.server_name} server is alive and kicking.</h1>
    <p style="text-align:center; color:#173616; font-family:Verdana;">${date}</p>
    `
  );
});

//global error handle
app.use(globalErrorHandler);

//handle not found route;
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API DOESN'T EXIST",
      },
    ],
  });
});

export default app;
