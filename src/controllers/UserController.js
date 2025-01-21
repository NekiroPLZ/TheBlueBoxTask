import { validateUserData } from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config/config.js";

export class userController {
  constructor(userService) {
    this.userService = userService;
  }
  createUser = async (req, res) => {
    try {
      // console.log('Received data in createUser:', req.body);
      const validateResult = validateUserData(req.body);
      const { success, data, error } = validateResult;
      if (!success) {
        return res.status(400).json(error);
      }
      const { email, password, role, first_name, last_name } = data;
      const newUser = await this.userService.createUser(
        email,
        password,
        role,
        first_name,
        last_name
      );
      res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.getUserByEmail(email);
      // console.log("Fetched user:", user);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await this.userService.validateUserPassword(
        user.password,
        password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        {  id: user.id, email: user.email, role: user.role }, 
        SECRET_JWT_KEY,
        { expiresIn: "1h" }
      );
      console.log("Token generated:", token);
      
      
      res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}
