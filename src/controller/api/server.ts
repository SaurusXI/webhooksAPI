/* eslint-disable import/extensions */
import express from 'express';
import dotenv from 'dotenv';

import AuthService from '../pkg/auth/service';
import registerHandlers from './handlers/register';
import authMiddleware from './middleware/auth';

dotenv.config();
const app = express();

// Initialize controller services
const authsvc = new AuthService();

// Load middleware
const authJWT = authMiddleware(authsvc);
app.use(express.json());
app.use(authJWT.initialize());

// Register routes
registerHandlers(app, authsvc);

// Serve
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
