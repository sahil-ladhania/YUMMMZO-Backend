import express from 'express';
import { handleErrorGlobally } from './Middlewares/Error-Middleware/errorMiddleware.js';
import userAuthRoutes from '../YUMMMZO-BACKEND/Routes/user-auth/userAuthRoutes.js';
import ownerAuthRoutes from '../YUMMMZO-BACKEND/Routes/restaurant-owner-auth/ownerAuthRoutes.js';
const app = express();
const port = 81;

app.use(express.json());

app.use(userAuthRoutes);
app.use(ownerAuthRoutes);
app.use(handleErrorGlobally);

app.listen(port, () => {
    console.log(`YUMMMZO Listening on port ${port}`)
})