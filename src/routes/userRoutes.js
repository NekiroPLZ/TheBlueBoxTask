import { Router } from "express";
import { userController } from "../controllers/UserController.js";
import { userService } from "../services/UserService.js";
import { userModel } from "../models/UserModels.js";

export const UserRouterOpt = () => {
  const userRouter = Router();
  const userServiceInstance = new userService({ userModel });
  const userControllerInstance = new userController(userServiceInstance);
  userRouter.post("/register", userControllerInstance.createUser);
  userRouter.post("/login", userControllerInstance.loginUser);
  console.log("User routes initialized under /thebluebox");
  return userRouter;
};
