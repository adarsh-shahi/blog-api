import { NextFunction, Request, Response } from "express";
import pool from "../config/db";
import {
	QcheckLikePost,
	QdeleteLikeOnPost,
	QgetAllUsernamesOnPost,
	QgetLikesCountOnPost,
	QlikePost,
} from "../queries/likeQueries";
import AppError from "../utils/AppError";

/*
 *  Like Handler - removes unneccasry try catch blocks in each controllers
 */

interface IQuery {
	(postId: number, userId?: number): string;
}

enum LIKE_PURPOSE {
	ADD_LIKE,
	CHECK_LIKE,
	GET_USERNAMES,
	GET_COUNT,
	DELETE_LIKE,
}

const likeHandler = async (
	postId: number,
	getQuery: IQuery,
	res: Response,
	next: NextFunction,
	action: LIKE_PURPOSE,
	userId?: number
) => {
	try {
		const response = await pool.query(getQuery(postId, userId));
		console.log(response);
		let message: string | boolean | string[];
		switch (action) {
			case LIKE_PURPOSE.ADD_LIKE:
				message = "liked";
				break;
			case LIKE_PURPOSE.CHECK_LIKE:
				message = response.rows[0].count === "1";
				break;
			case LIKE_PURPOSE.GET_COUNT:
				message = response.rows[0].count;
				break;
			case LIKE_PURPOSE.GET_USERNAMES:
				message = response.rows.map((obj) => obj.username);
				break;
			case LIKE_PURPOSE.DELETE_LIKE:
				message = "like deleted";
				break;
			default:
				throw new Error("unhandled like action");
		}
		res.status(200).json({
			status: "success",
			message,
		});
	} catch (err: any) {
		next(new AppError(err.message, 502));
	}
};

const getAllLikesOnPost = async (
	req: Request,
	res: Response,
	next: NextFunction
) =>
	likeHandler(
		+req.params.id,
		QgetLikesCountOnPost,
		res,
		next,
		LIKE_PURPOSE.GET_COUNT
	);

const getAllUsernamesOnPost = async (
	req: Request,
	res: Response,
	next: NextFunction
) =>
	likeHandler(
		+req.params.id,
		QgetAllUsernamesOnPost,
		res,
		next,
		LIKE_PURPOSE.GET_USERNAMES
	);

const likePost = async (req: Request, res: Response, next: NextFunction) => {
	if (req.user.id !== +req.params.uid)
		return next(new AppError("you are not authorized to like this post", 403));

	likeHandler(
		+req.params.id,
		QlikePost,
		res,
		next,
		LIKE_PURPOSE.ADD_LIKE,
		+req.params.uid
	);
};

const deleteLikeOnPost = (req: Request, res: Response, next: NextFunction) => {
	if (req.user.id !== +req.params.uid)
		return next(
			new AppError("you are not authorized to unlike this post", 403)
		);

	likeHandler(
		+req.params.id,
		QdeleteLikeOnPost,
		res,
		next,
		LIKE_PURPOSE.DELETE_LIKE,
		+req.params.uid
	);
};

const checkLikePost = async (req: Request, res: Response, next: NextFunction) =>
	likeHandler(
		+req.params.id,
		QcheckLikePost,
		res,
		next,
		LIKE_PURPOSE.CHECK_LIKE,
		+req.params.uid
	);
export {
	getAllLikesOnPost,
	getAllUsernamesOnPost,
	checkLikePost,
	likePost,
	deleteLikeOnPost,
};
