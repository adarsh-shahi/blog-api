import { Request, Response, NextFunction } from "express";
import pool from "../config/db";
import { addUser } from "../queries/userQueries";
import AppError from "../utils/AppError";
import validator from "validator";
import brypt from "bcryptjs";

const login = (req: Request, res: Response, next: NextFunction) => {};

// interface IvalidateUserParam {
// 	value: string | number;
// 	required?: boolean;
// 	maxLength?: number;
// 	minLength?: number;
// 	max?: number;
// 	min?: number;
// }

// const validateUser = (data: IvalidateUserParam): boolean => {
// 	return true;
// };

export interface ISignupRequestBody {
	username: string;
	email: string;
	password: string;
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: ISignupRequestBody = req.body;

		// Cleansing data
		user.username = user.username.trim();
		user.email = user.email.trim();
		user.password = user.password.trim();

		//Adding Constraints to data
		if (user.username.length < 3 || user.username.includes(" ")) {
			return next(
				new AppError(
					"username should be atleast 3 charachters and it shouldnt include spaces",
					301
				)
			);
		}

		if (!validator.isEmail(user.email)) {
			return res.status(404).json({
				status: "fail",
				message: "Please provide valid email",
			});
		}

		if (user.password.length < 5 || user.password.includes(" ")) {
			return next(
				new AppError(
					"password must be atleast 5 chars (no spcaes should be included)",
					301
				)
			);
		}

		user.password = await brypt.hash(user.password, 8);
		await pool.query(addUser(user));

		res.status(201).json({
			status: "success",
			message: {
				username: user.username,
				email: user.email,
			},
		});
	} catch (err: any) {
		next(new AppError(err.message, 401));
	}
};

export { login, signup };
