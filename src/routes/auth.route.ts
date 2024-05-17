import express from "express";
import { AuthController } from "../features/auth/controllers/auth.controller";

const userRouter = express.Router();
const authController = new AuthController();

userRouter.post('/register', authController.register.bind(authController));
userRouter.post('/login', authController.login.bind(authController));
userRouter.get('/me', authController.me.bind(authController));

export default userRouter;
