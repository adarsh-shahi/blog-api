import { Request, Response, NextFunction } from "express";
import pool from "../config/db";
import {
	addUser,
	findUserByEmail,
	findUserByUsername,
} from "../queries/userQueries";
import AppError from "../utils/AppError";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { QueryResult } from "pg";

const signToken = (id: number, email: string, username: string) => {
	return jwt.sign({ id, email, username }, process.env.JWT_SECRET_KEY!, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

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

export interface IUserRequestBody {
	username?: string;
	email?: string;
	password?: string;
}

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUserRequestBody = req.body;
		console.log(user);
		if ((!user.username && !user.email) || !user.password) {
			console.log(`came here`);
			return next(new AppError("please provide email and password", 401));
		}
		console.log(user.username, user.password);
		const key = user.username ? "username" : "email";
		const value = user.username?.trim() || user.email?.trim(); // user can provide username or email to login

		let userLoginCred: IUserRequestBody;

		let response: QueryResult;

		if (key === "username") {
			userLoginCred = { username: value, password: user.password };
			response = await pool.query(findUserByUsername(userLoginCred, true));
		} else {
			userLoginCred = { email: value, password: user.password };
			response = await pool.query(findUserByEmail(userLoginCred, true));
		}

		if (response.rows.length === 0)
			return next(new AppError("user not found", 402));

		if (!(await bcrypt.compare(user.password, response.rows[0].password)))
			return next(new AppError("password wrong", 403));

		res.status(200).json({
			status: "success",
			message: {
				username: userLoginCred?.username,
				email: response.rows[0].email,
				token: signToken(
					response.rows[0].id,
					response.rows[0].email,
					response.rows[0].username
				),
			},
		});
	} catch (err: any) {
		console.log(err);
		next(new AppError(err.message!, 404));
	}
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUserRequestBody = req.body;

		if (!user.email || !user.password || !user.username)
			return next(new AppError("please provide emaila and password", 401));

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

		console.log(signToken(45, "adrs","sdugf"));
		user.password = await bcrypt.hash(user.password, 8);
		await pool.query(addUser(user));
		const response = await pool.query(findUserByUsername(user));
		res.status(201).json({
			status: "success",
			message: {
				username: user.username,
				email: user.email,
				token: signToken(response.rows[0].id, user.email, user.username),
			},
		});
	} catch (err: any) {
		next(new AppError(err.message, 401));
	}
};

interface JwtPayload {}

export interface IUserData {
	username: string;
	email: string;
	id: number;
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let token;
		if (req.headers?.authorization?.startsWith("Bearer"))
			token = req.headers.authorization.split(" ")[1];
		if (!token) return next(new AppError("you are not logged in", 401));
		const decodedPayloadData = jwt.verify(
			token,
			process.env.JWT_SECRET_KEY as Secret
		) as IUserData;

		console.log(decodedPayloadData);

		// we got the token and the payload but still lets check if this user is
		// still present in DB or not
		const response = await pool.query(findUserByUsername(decodedPayloadData));
		if (response.rows.length === 0) next(new AppError("token expired", 403));

		req.user = {
			username: decodedPayloadData.username,
			email: decodedPayloadData.email,
			id: decodedPayloadData.id,
		};

		next();
	} catch (err) {
		next(new AppError("internal server error", 502));
	}
};

export { login, signup, protect };
