import express from "express";
import * as authController from "../controllers/auth";
import { deleteUser, getUser, updateUser } from "../controllers/userController";
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
	.route("/users/:id")
	.get(authController.protect, getUser)
	.patch(authController.protect, updateUser)
	.delete(authController.protect, deleteUser);

export default router;
