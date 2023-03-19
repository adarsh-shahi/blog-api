import { NextFunction, Request, Response } from "express";
import pool from "../config/db";
import { findUserById } from "../queries/userQueries";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
	const userId = +req.params.id;
	const response = await pool.query(findUserById(userId, true));
	const { username, email, bio, avatar } = response.rows[0];
	const user = {
		id: userId,
		username,
		email,
		bio,
		avatar,
		password: response.rows[0].password || null,
	};
	res.status(200).json({
		status: "success",
		user: user,
	});
};

const updateUser = () => {};

const deleteUser = () => {};

export { getUser, updateUser, deleteUser };
