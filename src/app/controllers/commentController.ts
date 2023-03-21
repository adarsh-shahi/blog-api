import { NextFunction, Request, Response } from "express";
import pool from "../config/db";
import AppError from "../utils/AppError";
import {
	QcreateComment,
	QdeleteComment,
	QgetAllCommentsOnPost,
	QupdateComment,
} from "../queries/commentQueries";

const getAllCommentsOnPost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const postId = +req.params.id;
		const response = await pool.query(QgetAllCommentsOnPost(postId));
		res.status(200).json({
			status: "success",
			message: response.rows,
		});
	} catch (err: any) {
		next(new AppError(err.message, 502));
	}
};

const createComment = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const userId = +req.params.uid;
		const postId = +req.params.id;

		const { comment }: { comment: string } = req.body;

		if (!comment) {
			return next(new AppError("Please provide a comment", 403));
		}

		const tComment = comment.trim();
		console.log(req.user);
		if (userId !== req.user.id) {
			return next(new AppError("Not authorized to comment", 402));
		}

		await pool.query(QcreateComment(tComment, postId, userId));
		res.status(201).json({
			status: "success",
			message: "Comment posted",
		});
	} catch (err: any) {
		next(new AppError(err.message, 502));
	}
};

const updateComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = +req.params.uid;
		const postId = +req.params.id;

		const { comment }: { comment: string } = req.body;

		if (!comment) return next(new AppError("please provide comment", 403));

		const updatedTComment = comment.trim();
		if (userId !== req.user.id)
			return next(new AppError("not authorized to update comment", 402));

		await pool.query(QupdateComment(updatedTComment, postId, userId));
		res.status(201).json({
			status: "success",
			message: "comment updated.",
		});
	} catch (err: any) {
		next(new AppError(err.message, 502));
	}
};

const deleteComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = +req.params.uid;
		const postId = +req.params.id;

		if (userId !== req.user.id)
			return next(new AppError("not authorized to delete a comment", 402));

		await pool.query(QdeleteComment(postId, userId));
		res.status(201).json({
			status: "success",
			message: "comment done",
		});
	} catch (err: any) {
		next(new AppError(err.message, 502));
	}
};

export { getAllCommentsOnPost, updateComment, createComment, deleteComment };
