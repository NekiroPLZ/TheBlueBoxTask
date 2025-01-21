import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { userService } from "../services/userService.js";
import { userModel } from "../models/UserModels.js";

export const UserRouterOpt = () => {
  const userRouter = Router();

  // Inyección de dependencias
  const userServiceInstance = new userService({ userModel });
  const userControllerInstance = new userController( userServiceInstance);

  // Rutas
  userRouter.post("/register", userControllerInstance.createUser);
  userRouter.post("/login", userControllerInstance.loginUser);
 
//   userRouter.get("/protected", userController.mainSite); // Suponiendo que mainSite está definido en UserController
//   userRouter.post("/logout", userController.logoutUser); // Suponiendo que logoutUser está definido en UserController

  return userRouter;
};
