import { NextFunction, Request, Response } from "express";
import pool from "../config/db";
import AppError from "../utils/AppError";
import {
	findPostById,
	makePost,
	updatePostById,
	deletePostById,
} from "../queries/postQueries";
import { findUserByUsername } from "../queries/userQueries";

const getAllPosts = () => {};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { content }: { content: string } = req.body;
		content.trim();
		if (!content) return next(new AppError("add content to make a post", 401));
		await pool.query(makePost(req.user.id, content));
		res.status(201).json({
			status: "success",
			message: "posted",
		});
	} catch (err: any) {
		console.log(err);
		next(new AppError(err.message, 500));
	}
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await pool.query(findPostById(+req.params.id));
		if (!response.rows.length) return next(new AppError("post not found", 404));
		const postData = {
			username: response.rows[0].username,
			user_id: response.rows[0].user_id,
			content: response.rows[0].content,
			post_id: response.rows[0].id,
			updated_at: response.rows[0].updated_at,
		};
		res.status(200).json(postData);
	} catch (err: any) {
		console.log(err);
		next(new AppError(err.message, 500));
	}
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.body || !req.body.content)
			return next(new AppError("please provide content to update", 403));
		const postId = +req.params.id;
		const { content }: { content: string } = req.body;
		const response = await pool.query(findPostById(postId));
		if (response.rows[0].user_id !== req.user.id)
			return next(
				new AppError("You are not authorized to edit this post", 403)
			);
		await pool.query(updatePostById(postId, content));
		res.status(201).json({
			status: "success",
			message: "post updated",
		});
	} catch (err: any) {
		console.log(err);
		next(new AppError(err.message, 500));
	}
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const postId = +req.params.id;
		const response = await pool.query(findPostById(postId));
		if (response.rows[0].user_id !== req.user.id)
			return next(
				new AppError("You are not authorized to delete this post", 403)
			);
		await pool.query(deletePostById(postId));
		res.status(201).json({
			status: "success",
			message: "post deleted",
		});
	} catch (err: any) {
		next(new AppError("internal server error", 500));
	}
};

export { getAllPosts, createPost, getPost, updatePost, deletePost };
