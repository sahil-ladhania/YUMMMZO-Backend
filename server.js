import express from 'express';
const app = express();
import { handleErrorGlobally } from './Middlewares/Error-Middleware/errorMiddleware.js';
import userAuthRoutes from '../YUMMMZO-BACKEND/Routes/user-auth/userAuthRoutes.js';
import ownerAuthRoutes from '../YUMMMZO-BACKEND/Routes/restaurant-owner-auth/ownerAuthRoutes.js';

// Defining PORT
const port = 81;

app.use(express.json());

// Handling Routes
app.use(userAuthRoutes);
app.use(ownerAuthRoutes);
app.use(handleErrorGlobally);

// Listening On PORT
app.listen(port, () => {
    console.log(`YUMMMZO Listening on port ${port}`)
})